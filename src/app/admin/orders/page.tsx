"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, Clock, Search, RefreshCw } from "lucide-react"

interface PixOrder {
    id: string
    orderId: string
    productId: string
    productName: string
    originalPrice: number
    discountAmount: number
    finalPrice: number
    customerEmail: string
    customerName: string | null
    couponCode: string | null
    commissionAmount: number
    status: string
    createdAt: string
    confirmedAt: string | null
    seller: {
        id: string
        name: string
        couponCode: string
    } | null
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<PixOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string>("all")
    const [search, setSearch] = useState("")

    const fetchOrders = useCallback(async () => {
        setLoading(true)
        try {
            const statusParam = filter !== "all" ? `?status=${filter}` : ""
            const res = await fetch(`/api/admin/orders${statusParam}`)
            const data = await res.json()
            setOrders(data.orders || [])
        } catch (error) {
            console.error("Erro ao carregar pedidos:", error)
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const handleConfirm = async (orderId: string) => {
        try {
            const res = await fetch("/api/admin/orders/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            })
            if (res.ok) {
                fetchOrders()
            }
        } catch (error) {
            console.error("Erro ao confirmar:", error)
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pendente":
                return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>
            case "confirmado":
                return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmado</Badge>
            case "cancelado":
                return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelado</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const filteredOrders = orders.filter(order => {
        if (!search) return true
        const searchLower = search.toLowerCase()
        return (
            order.orderId.toLowerCase().includes(searchLower) ||
            order.customerEmail.toLowerCase().includes(searchLower) ||
            order.productName.toLowerCase().includes(searchLower) ||
            (order.couponCode?.toLowerCase().includes(searchLower))
        )
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pedidos PIX</h1>
                    <p className="text-slate-600 dark:text-slate-400">Confirme pagamentos quando o PIX cair na conta</p>
                </div>
                <Button onClick={fetchOrders} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Buscar por pedido, email, produto..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "pendente", "confirmado", "cancelado"].map((status) => (
                                <Button
                                    key={status}
                                    variant={filter === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter(status)}
                                >
                                    {status === "all" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Pedidos</CardTitle>
                    <CardDescription>{filteredOrders.length} pedido(s) encontrado(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <p>Nenhum pedido encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-slate-500">
                                        <th className="pb-3 font-medium">Data</th>
                                        <th className="pb-3 font-medium">Produto</th>
                                        <th className="pb-3 font-medium">Cliente</th>
                                        <th className="pb-3 font-medium">Cupom</th>
                                        <th className="pb-3 font-medium">Valor</th>
                                        <th className="pb-3 font-medium">Comissão</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="text-sm">
                                            <td className="py-4">
                                                <div className="text-slate-900 dark:text-white">{formatDate(order.createdAt)}</div>
                                                <div className="text-xs text-slate-500 font-mono">{order.orderId.slice(0, 20)}...</div>
                                            </td>
                                            <td className="py-4">
                                                <div className="font-medium">{order.productName}</div>
                                            </td>
                                            <td className="py-4">
                                                <div className="text-slate-900 dark:text-white">{order.customerName || "-"}</div>
                                                <div className="text-xs text-slate-500">{order.customerEmail}</div>
                                            </td>
                                            <td className="py-4">
                                                {order.couponCode ? (
                                                    <Badge variant="secondary">{order.couponCode}</Badge>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                <div className="font-bold text-green-600">{formatCurrency(order.finalPrice)}</div>
                                                {order.discountAmount > 0 && (
                                                    <div className="text-xs text-slate-500 line-through">{formatCurrency(order.originalPrice)}</div>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                {order.commissionAmount > 0 ? (
                                                    <span className="text-blue-600">{formatCurrency(order.commissionAmount)}</span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="py-4">
                                                {order.status === "pendente" && (
                                                    <Button size="sm" onClick={() => handleConfirm(order.orderId)}>
                                                        Confirmar PIX
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
