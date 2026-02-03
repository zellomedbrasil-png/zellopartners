"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"


export default function SimulatorPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setResult("")

        const formData = new FormData(event.currentTarget)
        const data = {
            coupon_code: formData.get("coupon_code"),
            consultation_type: formData.get("consultation_type"),
            payment_amount: Number(formData.get("payment_amount")),
        }

        try {
            const response = await fetch("/api/webhooks/payment-confirmed", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const json = await response.json()
            setResult(JSON.stringify(json, null, 2))

        } catch (err) {
            setResult("Erro: " + (err instanceof Error ? err.message : "Erro desconhecido"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Simulador de Webhook</CardTitle>
                    <CardDescription>Simule uma confirmação de pagamento (Gateway).</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Cupom do Vendedor</Label>
                            <Input name="coupon_code" placeholder="Ex: ZELLOJOAO" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="consultation_type">Tipo de Consulta</Label>
                            <select
                                id="consultation_type"
                                name="consultation_type"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="telemedicina_geral"
                            >
                                <option value="telemedicina_geral">Telemedicina Geral</option>
                                <option value="psicologia">Psicologia</option>
                                <option value="cardiologia">Cardiologia</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Valor do Pagamento (R$)</Label>
                            <Input name="payment_amount" type="number" step="0.01" defaultValue="49.90" required />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Enviando..." : "Simular Pagamento Confirmado"}
                        </Button>
                    </form>

                    {result && (
                        <div className="mt-6 p-4 bg-muted rounded-md overflow-x-auto">
                            <pre className="text-xs">{result}</pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
