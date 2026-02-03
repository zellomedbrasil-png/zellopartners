"use client"

import Link from "next/link"
import { XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <XCircle className="w-10 h-10 text-slate-500" />
                    </div>
                    <CardTitle className="text-2xl">
                        Pagamento Cancelado
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Sua compra não foi finalizada.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">
                        Não se preocupe, nenhum valor foi cobrado.
                        Você pode tentar novamente quando quiser.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button asChild className="w-full">
                        <Link href="/checkout">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Tentar Novamente
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">
                            Voltar ao Início
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
