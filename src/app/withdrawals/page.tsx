"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"

export default function WithdrawalPage() {
    const router = useRouter()
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const sellerId = localStorage.getItem("seller_id")
        if (!sellerId) {
            router.push("/register")
            return
        }
        // Fetch balance only
        fetch("/api/sellers/dashboard", { headers: { "x-seller-id": sellerId } })
            .then(res => res.json())
            .then(data => {
                if (data.seller) setBalance(data.seller.wallet_balance)
            })
    }, [router])

    async function handleRequest(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        try {
            const sellerId = localStorage.getItem("seller_id")
            if (!sellerId) throw new Error("Não logado")

            const res = await fetch("/api/withdrawals/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-seller-id": sellerId
                },
                body: JSON.stringify({ amount })
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json.error || "Erro no saque")

            setSuccess(true)
            setBalance(prev => prev - Number(amount))
            setAmount("")

            // Voltar ao dashboard em 2s
            setTimeout(() => router.push("/dashboard"), 2000)

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard"><ArrowLeft className="w-4 h-4" /></Link>
                        </Button>
                        <CardTitle>Solicitar Saque</CardTitle>
                    </div>
                    <CardDescription>
                        Envie o saldo para sua chave Pix cadastrada.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleRequest}>
                    <CardContent className="space-y-6">
                        <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                            <span className="text-sm font-medium">Disponível</span>
                            <span className="text-xl font-bold text-green-600">R$ {balance.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Valor do Saque</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="20"
                                    max={balance}
                                    className="pl-9"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Mínimo R$ 20,00</p>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {success && <p className="text-sm text-green-600">Solicitação enviada! Redirecionando...</p>}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={loading || Number(amount) < 20 || Number(amount) > balance}>
                            {loading ? "Solicitando..." : "Confirmar Saque"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
