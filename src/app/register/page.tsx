"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, ArrowRight, ShieldCheck, Gift, Sparkles, CheckCircle } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [couponPreview, setCouponPreview] = useState("")

    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 15)
        setCouponPreview(value)
        e.target.value = value
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get("name"),
            whatsapp: formData.get("whatsapp"),
            pix_key: formData.get("pix_key"),
            coupon_code: formData.get("coupon_code"),
        }

        try {
            const response = await fetch("/api/sellers/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.error || "Erro ao criar conta")
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
                <div className="mx-auto grid w-[380px] gap-6">
                    <div className="grid gap-2 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                            <TrendingUp className="h-8 w-8" />
                            <span className="text-2xl font-bold">ZelloPartners</span>
                        </div>
                        <h1 className="text-3xl font-bold">Crie sua conta grátis</h1>
                        <p className="text-balance text-muted-foreground">
                            Comece a faturar com comissões de saúde hoje mesmo.
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
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" name="name" placeholder="Ex: Maria Silva" required className="h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                <Input id="whatsapp" name="whatsapp" placeholder="Ex: 11999999999" required className="h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="pix_key">Chave Pix (para receber)</Label>
                                <Input id="pix_key" name="pix_key" placeholder="Ex: CPF, Email ou Celular" required className="h-11" />
                            </div>

                            {/* Custom Coupon Code */}
                            <div className="grid gap-2">
                                <Label htmlFor="coupon_code" className="flex items-center gap-2">
                                    <Gift className="h-4 w-4 text-purple-600" />
                                    Escolha seu Cupom de Desconto
                                </Label>
                                <Input
                                    id="coupon_code"
                                    name="coupon_code"
                                    placeholder="Ex: MARIA10, DRSAUDE, PROMO2024"
                                    required
                                    className="h-11 font-mono uppercase tracking-wider"
                                    onChange={handleCouponChange}
                                    maxLength={15}
                                />
                                {couponPreview && (
                                    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                                        <Sparkles className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            Seu cupom será: <strong className="text-purple-600 font-mono">{couponPreview}</strong>
                                        </span>
                                    </div>
                                )}
                                <p className="text-xs text-slate-500">
                                    Apenas letras e números (máx. 15 caracteres). Este será o cupom que seus clientes usarão.
                                </p>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold text-base" disabled={loading}>
                                    {loading ? "Criando cadastro..." : "Criar Minha Conta"} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Cadastro 100% gratuito, sem taxas escondidas
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-sm">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="underline text-blue-600 font-medium">
                            Entrar agora
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-900 via-blue-800 to-slate-900 opacity-95" />
                <div className="relative h-full flex flex-col justify-center p-12 text-white">
                    <div className="space-y-8 max-w-lg">
                        <h2 className="text-4xl font-bold leading-tight">
                            Ganhe dinheiro indicando consultas médicas online
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                                    <Gift className="h-6 w-6 text-blue-300" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Seu cupom exclusivo</h4>
                                    <p className="text-blue-100">Escolha o nome do seu cupom e compartilhe com seus clientes.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-500/20 rounded-lg flex-shrink-0">
                                    <TrendingUp className="h-6 w-6 text-green-300" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">5% de comissão</h4>
                                    <p className="text-blue-100">Ganhe em cada venda feita com seu cupom.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                                    <ShieldCheck className="h-6 w-6 text-purple-300" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Pagamento via PIX</h4>
                                    <p className="text-blue-100">Saque seus ganhos de forma rápida e segura.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
