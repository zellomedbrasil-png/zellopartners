"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, Copy, Check } from "lucide-react"

interface Seller {
    id: string
    name: string
    whatsapp: string
    pixKey: string
    couponCode: string
    walletBalance: number
    createdAt: string
    stats: {
        totalSales: number
        totalSalesValue: number
        totalCommissions: number
        totalWithdrawn: number
    }
}

export default function AdminSellersPage() {
    const [sellers, setSellers] = useState<Seller[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const fetchSellers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/admin/sellers")
            const data = await res.json()
            setSellers(data.sellers || [])
        } catch (error) {
            console.error("Erro ao carregar parceiros:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSellers()
    }, [fetchSellers])

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
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
        return new Date(dateString).toLocaleDateString('pt-BR')
    }

    const filteredSellers = sellers.filter(seller => {
        if (!search) return true
        const searchLower = search.toLowerCase()
        return (
            seller.name.toLowerCase().includes(searchLower) ||
            seller.couponCode.toLowerCase().includes(searchLower) ||
            seller.whatsapp.includes(search) ||
            seller.pixKey.toLowerCase().includes(searchLower)
        )
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Parceiros</h1>
                    <p className="text-slate-600 dark:text-slate-400">Lista de todos os vendedores cadastrados</p>
                </div>
                <Button onClick={fetchSellers} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Buscar por nome, cupom, WhatsApp, PIX..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Sellers Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Parceiros</CardTitle>
                    <CardDescription>{filteredSellers.length} parceiro(s) encontrado(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredSellers.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <p>Nenhum parceiro encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-slate-500">
                                        <th className="pb-3 font-medium">Parceiro</th>
                                        <th className="pb-3 font-medium">Cupom</th>
                                        <th className="pb-3 font-medium">Contato</th>
                                        <th className="pb-3 font-medium">Vendas</th>
                                        <th className="pb-3 font-medium">Comissões</th>
                                        <th className="pb-3 font-medium">Saldo</th>
                                        <th className="pb-3 font-medium">Saques</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredSellers.map((seller) => (
                                        <tr key={seller.id} className="text-sm">
                                            <td className="py-4">
                                                <div className="font-medium">{seller.name}</div>
                                                <div className="text-xs text-slate-500">Desde {formatDate(seller.createdAt)}</div>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-blue-600">{seller.couponCode}</Badge>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-6 w-6"
                                                        onClick={() => handleCopy(seller.couponCode, `coupon-${seller.id}`)}
                                                    >
                                                        {copiedId === `coupon-${seller.id}` ? (
                                                            <Check className="h-3 w-3 text-green-600" />
                                                        ) : (
                                                            <Copy className="h-3 w-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="text-slate-900 dark:text-white">{seller.whatsapp}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    PIX: {seller.pixKey}
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-5 w-5"
                                                        onClick={() => handleCopy(seller.pixKey, `pix-${seller.id}`)}
                                                    >
                                                        {copiedId === `pix-${seller.id}` ? (
                                                            <Check className="h-3 w-3 text-green-600" />
                                                        ) : (
                                                            <Copy className="h-3 w-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="font-medium">{seller.stats.totalSales}</div>
                                                <div className="text-xs text-slate-500">
                                                    {formatCurrency(seller.stats.totalSalesValue)}
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-blue-600 font-medium">
                                                    {formatCurrency(seller.stats.totalCommissions)}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`font-bold ${seller.walletBalance > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                                                    {formatCurrency(seller.walletBalance)}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className="text-slate-600">
                                                    {formatCurrency(seller.stats.totalWithdrawn)}
                                                </span>
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
