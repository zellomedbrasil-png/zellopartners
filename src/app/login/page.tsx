"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(event.currentTarget)
        const credential = formData.get("credential")

        try {
            const response = await fetch("/api/sellers/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
            })

            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.error || "Erro ao fazer login")
            }

            const seller = await response.json()
            localStorage.setItem("seller_id", seller.id)
            localStorage.setItem("seller_coupon", seller.coupon_code)

            router.push("/dashboard")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Acesse sua conta</h1>
                        <p className="text-balance text-muted-foreground">
                            Entre com seus dados para gerenciar comissões.
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="grid gap-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-100 dark:border-red-900">
                                    {error}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="credential">Identificação</Label>
                                <Input
                                    id="credential"
                                    name="credential"
                                    placeholder="WhatsApp, CPF ou Cupom"
                                    required
                                    className="h-11"
                                />
                            </div>
                            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
                                {loading ? "Verificando..." : "Entrar no Painel"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Ainda não é parceiro?{" "}
                        <Link href="/register" className="underline text-blue-600 font-medium">
                            Cadastre-se gratuitamente
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
                <div className="relative h-full flex flex-col justify-center p-12 text-white">
                    <div className="flex items-center gap-2 font-bold text-2xl mb-12">
                        <TrendingUp className="h-8 w-8" />
                        <span>ZelloPartners</span>
                    </div>
                    <div className="space-y-6 max-w-md">
                        <blockquote className="space-y-2">
                            <p className="text-2xl font-medium leading-relaxed">
                                {`"O ZelloPartners transformou a maneira como monetizo minha rede de contatos. Simples, rápido e paga certinho."`}
                            </p>
                            <footer className="text-blue-200 font-medium mt-4">— Marcos Silva, Parceiro Top Seller</footer>
                        </blockquote>
                        <div className="pt-8 space-y-4">
                            <div className="flex items-center gap-3 text-blue-100">
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                <span>Saques instantâneos via PIX</span>
                            </div>
                            <div className="flex items-center gap-3 text-blue-100">
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                <span>Comissões acima do mercado</span>
                            </div>
                            <div className="flex items-center gap-3 text-blue-100">
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                <span>Suporte dedicado ao parceiro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
