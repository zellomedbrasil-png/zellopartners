"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Sale {
    id: string
    date: string
    type: string
    commission: number
    status: string
}

export default function ExtractPage() {
    const router = useRouter()
    const [sales, setSales] = useState<Sale[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const sellerId = localStorage.getItem("seller_id")
        if (!sellerId) {
            router.push("/register")
            return
        }

        fetch("/api/sellers/sales", { headers: { "x-seller-id": sellerId } })
            .then(res => res.json())
            .then(data => {
                if (data.sales) setSales(data.sales)
            })
            .finally(() => setLoading(false))
    }, [router])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Extrato de Vendas</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Histórico Completo</CardTitle>
                        <CardDescription>Todas as comissões registradas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-4">Carregando...</div>
                        ) : sales.length === 0 ? (
                            <div className="text-center py-8">Nenhuma venda encontrada.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Comissão</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sales.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>
                                                {new Date(sale.date).toLocaleDateString('pt-BR', {
                                                    day: '2-digit', month: '2-digit', year: '2-digit',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </TableCell>
                                            <TableCell className="capitalize">{sale.type}</TableCell>
                                            <TableCell className="font-medium text-green-600">
                                                + R$ {sale.commission.toFixed(2)}
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
