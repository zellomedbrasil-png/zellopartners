"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingBag, Wallet, Users, CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Stats {
    sales: {
        total: number
        totalValue: number
        totalCommissions: number
        today: number
        todayValue: number
    }
    pixOrders: {
        pending: number
        pendingValue: number
    }
    withdrawals: {
        pending: number
        pendingValue: number
        approved: number
        approvedValue: number
        paid: number
        paidValue: number
    }
    sellers: {
        total: number
        active: number
    }
}

interface PendingOrder {
    id: string
    orderId: string
    productName: string
    finalPrice: number
    customerEmail: string
    couponCode: string | null
    createdAt: string
}

interface PendingWithdrawal {
    id: string
    amount: number
    status: string
    requestedAt: string
    seller: {
        name: string
        pixKey: string
    }
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
    const [pendingWithdrawals, setPendingWithdrawals] = useState<PendingWithdrawal[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        try {
            const [statsRes, ordersRes, withdrawalsRes] = await Promise.all([
                fetch("/api/admin/stats"),
                fetch("/api/admin/orders?status=pendente&limit=5"),
                fetch("/api/admin/withdrawals?status=pendente&limit=5"),
            ])

            const statsData = await statsRes.json()
            const ordersData = await ordersRes.json()
            const withdrawalsData = await withdrawalsRes.json()

            setStats(statsData)
            setPendingOrders(ordersData.orders || [])
            setPendingWithdrawals(withdrawalsData.withdrawals || [])
        } catch (error) {
            console.error("Erro ao carregar dados:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleConfirmOrder = async (orderId: string) => {
        try {
            const res = await fetch("/api/admin/orders/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            })
            if (res.ok) {
                fetchData()
            }
        } catch (error) {
            console.error("Erro ao confirmar pedido:", error)
        }
    }

    const handleApproveWithdrawal = async (withdrawalId: string) => {
        try {
            const res = await fetch("/api/admin/withdrawals/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ withdrawalId }),
            })
            if (res.ok) {
                fetchData()
            }
        } catch (error) {
            console.error("Erro ao aprovar saque:", error)
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
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Visão geral do sistema</p>
            </div>

            {/* Alert Cards */}
            {(stats?.pixOrders.pending || stats?.withdrawals.pending || stats?.withdrawals.approved) ? (
                <div className="grid gap-4 md:grid-cols-3">
                    {stats?.pixOrders.pending > 0 && (
                        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                                    <div>
                                        <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                                            {stats.pixOrders.pending} PIX pendente{stats.pixOrders.pending > 1 ? "s" : ""}
                                        </p>
                                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                            {formatCurrency(stats.pixOrders.pendingValue)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {stats?.withdrawals.pending > 0 && (
                        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-8 h-8 text-orange-600" />
                                    <div>
                                        <p className="font-semibold text-orange-800 dark:text-orange-200">
                                            {stats.withdrawals.pending} saque{stats.withdrawals.pending > 1 ? "s" : ""} pendente{stats.withdrawals.pending > 1 ? "s" : ""}
                                        </p>
                                        <p className="text-sm text-orange-700 dark:text-orange-300">
                                            {formatCurrency(stats.withdrawals.pendingValue)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {stats?.withdrawals.approved > 0 && (
                        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-blue-800 dark:text-blue-200">
                                            {stats.withdrawals.approved} aguardando pagamento
                                        </p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            {formatCurrency(stats.withdrawals.approvedValue)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            ) : null}

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats?.sales.todayValue || 0)}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.sales.today || 0} venda{stats?.sales.today !== 1 ? "s" : ""}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Vendas</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats?.sales.totalValue || 0)}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.sales.total || 0} venda{stats?.sales.total !== 1 ? "s" : ""} total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Comissões Pagas</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats?.withdrawals.paidValue || 0)}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.withdrawals.paid || 0} saque{stats?.withdrawals.paid !== 1 ? "s" : ""}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Parceiros</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.sellers.total || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.sellers.active || 0} ativo{stats?.sellers.active !== 1 ? "s" : ""}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending PIX Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Pedidos PIX Pendentes
                            </CardTitle>
                            <CardDescription>Confirme quando o PIX cair na conta</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/orders">Ver todos</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {pendingOrders.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                                <p>Nenhum PIX pendente!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{order.productName}</p>
                                            <p className="text-sm text-slate-500 truncate">{order.customerEmail}</p>
                                            {order.couponCode && (
                                                <Badge variant="secondary" className="mt-1 text-xs">
                                                    {order.couponCode}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="font-bold text-green-600">{formatCurrency(order.finalPrice)}</p>
                                            <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="ml-3"
                                            onClick={() => handleConfirmOrder(order.orderId)}
                                        >
                                            Confirmar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Withdrawals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="w-5 h-5" />
                                Saques Pendentes
                            </CardTitle>
                            <CardDescription>Aprove e pague via PIX</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/withdrawals">Ver todos</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {pendingWithdrawals.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                                <p>Nenhum saque pendente!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingWithdrawals.map((withdrawal) => (
                                    <div
                                        key={withdrawal.id}
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">{withdrawal.seller.name}</p>
                                            <p className="text-sm text-slate-500 truncate">
                                                PIX: {withdrawal.seller.pixKey}
                                            </p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="font-bold text-orange-600">{formatCurrency(withdrawal.amount)}</p>
                                            <p className="text-xs text-slate-500">{formatDate(withdrawal.requestedAt)}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="ml-3"
                                            onClick={() => handleApproveWithdrawal(withdrawal.id)}
                                        >
                                            Aprovar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* PIX Info */}
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-green-800 dark:text-green-200">
                                Chave PIX da Empresa
                            </p>
                            <p className="text-green-700 dark:text-green-300 font-mono">
                                zellomed@jim.com
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
