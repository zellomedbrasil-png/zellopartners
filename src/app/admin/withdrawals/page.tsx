"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Clock, DollarSign, Search, RefreshCw, Copy, Check } from "lucide-react"

interface Withdrawal {
    id: string
    amount: number
    status: string
    requestedAt: string
    approvedAt: string | null
    paidAt: string | null
    seller: {
        id: string
        name: string
        pixKey: string
        couponCode: string
        walletBalance: number
    }
}

export default function AdminWithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string>("all")
    const [search, setSearch] = useState("")
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const fetchWithdrawals = useCallback(async () => {
        setLoading(true)
        try {
            const statusParam = filter !== "all" ? `?status=${filter}` : ""
            const res = await fetch(`/api/admin/withdrawals${statusParam}`)
            const data = await res.json()
            setWithdrawals(data.withdrawals || [])
        } catch (error) {
            console.error("Erro ao carregar saques:", error)
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => {
        fetchWithdrawals()
    }, [fetchWithdrawals])

    const handleApprove = async (withdrawalId: string) => {
        try {
            const res = await fetch("/api/admin/withdrawals/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ withdrawalId }),
            })
            if (res.ok) {
                fetchWithdrawals()
            }
        } catch (error) {
            console.error("Erro ao aprovar:", error)
        }
    }

    const handlePay = async (withdrawalId: string) => {
        try {
            const res = await fetch("/api/admin/withdrawals/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ withdrawalId }),
            })
            if (res.ok) {
                fetchWithdrawals()
            }
        } catch (error) {
            console.error("Erro ao marcar como pago:", error)
        }
    }

    const handleCopyPix = (pixKey: string, id: string) => {
        navigator.clipboard.writeText(pixKey)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
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
            case "aprovado":
                return <Badge variant="outline" className="border-blue-500 text-blue-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Aprovado</Badge>
            case "pago":
                return <Badge className="bg-green-500"><DollarSign className="w-3 h-3 mr-1" /> Pago</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const filteredWithdrawals = withdrawals.filter(w => {
        if (!search) return true
        const searchLower = search.toLowerCase()
        return (
            w.seller.name.toLowerCase().includes(searchLower) ||
            w.seller.pixKey.toLowerCase().includes(searchLower) ||
            w.seller.couponCode.toLowerCase().includes(searchLower)
        )
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Saques</h1>
                    <p className="text-slate-600 dark:text-slate-400">Aprove e pague os saques dos parceiros</p>
                </div>
                <Button onClick={fetchWithdrawals} variant="outline">
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
                                placeholder="Buscar por nome, PIX, cupom..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "pendente", "aprovado", "pago"].map((status) => (
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

            {/* Withdrawals Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Saques</CardTitle>
                    <CardDescription>{filteredWithdrawals.length} saque(s) encontrado(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredWithdrawals.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <p>Nenhum saque encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-slate-500">
                                        <th className="pb-3 font-medium">Data</th>
                                        <th className="pb-3 font-medium">Parceiro</th>
                                        <th className="pb-3 font-medium">Chave PIX</th>
                                        <th className="pb-3 font-medium">Valor</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredWithdrawals.map((withdrawal) => (
                                        <tr key={withdrawal.id} className="text-sm">
                                            <td className="py-4">
                                                <div className="text-slate-900 dark:text-white">{formatDate(withdrawal.requestedAt)}</div>
                                                {withdrawal.paidAt && (
                                                    <div className="text-xs text-green-600">Pago: {formatDate(withdrawal.paidAt)}</div>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                <div className="font-medium">{withdrawal.seller.name}</div>
                                                <Badge variant="secondary" className="text-xs">{withdrawal.seller.couponCode}</Badge>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-sm">{withdrawal.seller.pixKey}</span>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-6 w-6"
                                                        onClick={() => handleCopyPix(withdrawal.seller.pixKey, withdrawal.id)}
                                                    >
                                                        {copiedId === withdrawal.id ? (
                                                            <Check className="h-3 w-3 text-green-600" />
                                                        ) : (
                                                            <Copy className="h-3 w-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className="font-bold text-green-600">{formatCurrency(withdrawal.amount)}</span>
                                            </td>
                                            <td className="py-4">
                                                {getStatusBadge(withdrawal.status)}
                                            </td>
                                            <td className="py-4">
                                                <div className="flex gap-2">
                                                    {withdrawal.status === "pendente" && (
                                                        <Button size="sm" variant="outline" onClick={() => handleApprove(withdrawal.id)}>
                                                            Aprovar
                                                        </Button>
                                                    )}
                                                    {withdrawal.status === "aprovado" && (
                                                        <Button size="sm" onClick={() => handlePay(withdrawal.id)}>
                                                            Marcar Pago
                                                        </Button>
                                                    )}
                                                </div>
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
