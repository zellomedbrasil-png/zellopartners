"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, DollarSign } from "lucide-react"

interface DashboardData {
    seller: {
        id: string
        name: string
        coupon_code: string
        wallet_balance: number
    }
    today_sales: number
    recent_sales: Array<{
        id: string
        consultation_type: string
        commission_amount: number
        created_at: string
        status: string
    }>
}

export default function DashboardPage() {
    const router = useRouter()
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [withdrawalLoading, setWithdrawalLoading] = useState(false)

    useEffect(() => {
        // Check auth
        const sellerId = localStorage.getItem("seller_id")
        if (!sellerId) {
            router.push("/register") // Or login
            return
        }
        fetchDashboard(sellerId)
    }, [router])

    async function fetchDashboard(sellerId: string) {
        try {
            const res = await fetch("/api/sellers/dashboard", {
                headers: {
                    "x-seller-id": sellerId
                }
            })
            if (!res.ok) throw new Error("Falha ao carregar")
            const json = await res.json()
            setData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const copyCoupon = () => {
        if (data?.seller.coupon_code) {
            navigator.clipboard.writeText(data.seller.coupon_code)
            alert("Cupom copiado!")
        }
    }

    async function handleWithdrawal() {
        if (!data || data.seller.wallet_balance < 20) return

        const confirm = window.confirm(`Deseja solicitar o saque de R$ ${data.seller.wallet_balance.toFixed(2)}?`)
        if (!confirm) return

        setWithdrawalLoading(true)
        try {
            const res = await fetch("/api/withdrawals/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-seller-id": data.seller.id
                },
                body: JSON.stringify({ amount: data.seller.wallet_balance })
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.error || "Erro ao solicitar saque")
            }

            alert("Saque solicitado com sucesso! O valor será processado em breve.")
            fetchDashboard(data.seller.id) // Refresh data
        } catch (error) {
            alert(error instanceof Error ? error.message : "Erro desconhecido")
        } finally {
            setWithdrawalLoading(false)
        }
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Carregando...</div>
    }

    if (!data) return null

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Olá, {data.seller.name}</h1>
                        <p className="text-muted-foreground">Bem-vindo ao seu painel.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 bg-primary/10 p-4 rounded-xl flex items-center gap-4">
                        <div>
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Seu Cupom</p>
                            <p className="text-2xl font-black text-primary">{data.seller.coupon_code}</p>
                        </div>
                        <Button size="icon" variant="ghost" onClick={copyCoupon}>
                            <Copy className="h-5 w-5 text-primary" />
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">R$ {data.seller.wallet_balance.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {data.seller.wallet_balance >= 20
                                    ? "Saque disponível"
                                    : `Faltam R$ ${(20 - data.seller.wallet_balance).toFixed(2)} para sacar`}
                            </p>
                            <Button
                                className="w-full mt-4"
                                disabled={data.seller.wallet_balance < 20 || withdrawalLoading}
                                onClick={handleWithdrawal}
                            >
                                {withdrawalLoading ? "Processando..." : "Solicitar Saque"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.today_sales}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                +R$ {(data.today_sales * 5).toFixed(2)} em comissões
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Sales */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Últimas Vendas</CardTitle>
                                <CardDescription>Histórico recente de comissões aprovadas.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/extract">Ver Extrato Completo</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {data.recent_sales.length === 0 ? (
                            <div className="text-center py-8 text-black dark:text-white">Nenhuma venda registrada ainda.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.recent_sales.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>
                                                {new Date(sale.created_at).toLocaleDateString('pt-BR', {
                                                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </TableCell>
                                            <TableCell className="capitalize">{sale.consultation_type}</TableCell>
                                            <TableCell className="font-medium text-green-600">
                                                + R$ {sale.commission_amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                                    {sale.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
