"use client"

import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-slate-50 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-700 dark:text-green-400">
                        Pagamento Confirmado!
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Sua compra foi processada com sucesso.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                        Você receberá um email com os detalhes da sua consulta e instruções de acesso.
                    </p>
                    <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-lg">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Obrigado por escolher a ZelloMed!
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                        <Link href="/">
                            Voltar ao Início <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
