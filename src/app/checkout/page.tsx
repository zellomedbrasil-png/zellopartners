"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Tag, Loader2, Sparkles, CreditCard, QrCode, Copy, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

const PRODUCTS = [
    {
        id: 'consulta-generalista',
        name: 'Consulta Generalista',
        price: 4700, // R$ 47,00
        description: 'Consulta médica online com clínico geral',
        features: ['Atendimento rápido', 'Receita digital', 'Atestado médico'],
    },
    {
        id: 'consulta-especialista',
        name: 'Consulta Especialista',
        price: 7900, // R$ 79,00
        description: 'Consulta com médico especialista',
        features: ['Escolha a especialidade', 'Laudos e exames', 'Acompanhamento'],
        popular: true,
    },
];

// Fixed discount for partner coupons
const COUPON_DISCOUNT = 500; // R$ 5,00

function formatPrice(cents: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cents / 100);
}

export default function CheckoutPage() {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pixData, setPixData] = useState<{ code: string, orderId: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [sellerId, setSellerId] = useState<string | null>(null);

    const selectedProductData = PRODUCTS.find(p => p.id === selectedProduct);
    const discount = couponApplied ? COUPON_DISCOUNT : 0;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;

        setIsValidatingCoupon(true);
        setCouponError("");

        try {
            const res = await fetch('/api/validate-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ couponCode })
            });

            const data = await res.json();

            if (data.valid) {
                setCouponApplied(true);
                setCouponCode(data.couponCode); // Ensure correct format
                setSellerId(data.sellerId); // Track seller for commission
            } else {
                setCouponApplied(false);
                setCouponError(data.message || "Cupom inválido");
            }
        } catch (err) {
            setCouponError("Erro ao validar cupom");
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleCopyPix = () => {
        if (pixData?.code) {
            navigator.clipboard.writeText(pixData.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCheckout = async () => {
        if (!selectedProduct || !customerEmail) {
            setError("Selecione um produto e informe seu email");
            return;
        }

        setLoading(true);
        setError("");

        try {
            if (paymentMethod === 'card') {
                // Use Static Stripe Payment Links
                // Generalista: https://buy.stripe.com/28E3cudHpaWz7S92UP5Ne00
                // Especialista: https://buy.stripe.com/eVq6oGeLtfcPgoF52X5Ne01

                let paymentUrl = '';

                if (selectedProduct === 'consulta-generalista') {
                    paymentUrl = 'https://buy.stripe.com/28E3cudHpaWz7S92UP5Ne00';
                } else if (selectedProduct === 'consulta-especialista') {
                    paymentUrl = 'https://buy.stripe.com/eVq6oGeLtfcPgoF52X5Ne01';
                }

                if (paymentUrl) {
                    // Append paramters for tracking
                    // client_reference_id = sellerId (for commission)
                    // prefilled_email = customerEmail

                    const params = new URLSearchParams();
                    params.append('prefilled_email', customerEmail);

                    if (sellerId) {
                        params.append('client_reference_id', sellerId);
                    }

                    window.location.href = `${paymentUrl}?${params.toString()}`;
                } else {
                    setError("Erro ao gerar link de pagamento.");
                }
            } else {
                // PIX Payment
                const response = await fetch("/api/pix/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: selectedProduct,
                        couponCode: couponApplied ? couponCode : null,
                        customerEmail,
                        customerName,
                    }),
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || "Erro ao gerar PIX");
                }

                const data = await response.json();
                setPixData({ code: data.pixCode, orderId: data.orderId });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!selectedProductData) return 0;
        return selectedProductData.price - discount;
    };

    // Rule: If user has typed a coupon (length > 0) AND it is NOT applied/valid, disable payment.
    const isPaymentDisabled = loading || !customerEmail || (couponCode.length > 0 && !couponApplied);

    // PIX Generated - Show PIX Code
    if (pixData) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-950 py-12 px-4">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <QrCode className="w-8 h-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl">PIX Gerado!</CardTitle>
                            <CardDescription>
                                Copie o código abaixo e pague no app do seu banco
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-lg">
                                <p className="text-xs text-slate-500 mb-2">Código PIX Copia e Cola:</p>
                                <p className="text-sm font-mono break-all select-all">
                                    {pixData.code}
                                </p>
                            </div>

                            <Button
                                onClick={handleCopyPix}
                                className="w-full"
                                variant={copied ? "outline" : "default"}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copiar Código PIX
                                    </>
                                )}
                            </Button>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Produto</span>
                                    <span>{selectedProductData?.name}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(calculateTotal())}</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 p-3 rounded-lg">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    ⏰ O pagamento será confirmado automaticamente.
                                    Após pagar, aguarde alguns segundos.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Voltar ao Início
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Agende sua Consulta
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Consultas médicas online com qualidade e praticidade.
                        Use um cupom de parceiro e ganhe <strong>R$ 5,00 de desconto</strong>!
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                    {PRODUCTS.map((product) => (
                        <Card
                            key={product.id}
                            className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedProduct === product.id
                                ? 'ring-2 ring-blue-600 shadow-lg'
                                : 'hover:ring-1 hover:ring-slate-300'
                                }`}
                            onClick={() => setSelectedProduct(product.id)}
                        >
                            {product.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                                    <Sparkles className="w-3 h-3 mr-1" /> Mais Popular
                                </Badge>
                            )}
                            <CardHeader>
                                <CardTitle className="text-xl">{product.name}</CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        {formatPrice(product.price)}
                                    </span>
                                    {couponApplied && (
                                        <span className="ml-2 text-green-600 text-sm font-medium">
                                            → {formatPrice(product.price - COUPON_DISCOUNT)}
                                        </span>
                                    )}
                                </div>
                                <ul className="space-y-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={selectedProduct === product.id ? "default" : "outline"}
                                    className="w-full"
                                >
                                    {selectedProduct === product.id ? "Selecionado" : "Selecionar"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Checkout Form */}
                {selectedProduct && (
                    <Card className="max-w-xl mx-auto">
                        <CardHeader>
                            <CardTitle>Finalizar Compra</CardTitle>
                            <CardDescription>
                                {selectedProductData?.name} - {formatPrice(selectedProductData?.price || 0)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-100 dark:border-red-900">
                                    {error}
                                </div>
                            )}

                            {/* Customer Info */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="space-y-3">
                                <Label>Forma de Pagamento</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${paymentMethod === 'card'
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300'
                                            }`}
                                    >
                                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-500'}`} />
                                        <span className={`font-medium ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-600'}`}>
                                            Cartão
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('pix')}
                                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${paymentMethod === 'pix'
                                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                                            : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300'
                                            }`}
                                    >
                                        <QrCode className={`w-5 h-5 ${paymentMethod === 'pix' ? 'text-green-600' : 'text-slate-500'}`} />
                                        <span className={`font-medium ${paymentMethod === 'pix' ? 'text-green-600' : 'text-slate-600'}`}>
                                            PIX
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Coupon Section */}
                            <div className="space-y-2">
                                <Label htmlFor="coupon">Cupom de Desconto</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="coupon"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value.toUpperCase());
                                            setCouponApplied(false);
                                            setCouponError("");
                                        }}
                                        placeholder="Ex: ZELLOMARCOS"
                                        disabled={couponApplied || isValidatingCoupon}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleApplyCoupon}
                                        disabled={couponApplied || !couponCode.trim() || isValidatingCoupon}
                                    >
                                        {isValidatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4 mr-2" />}
                                        {couponApplied ? "Aplicado!" : "Aplicar"}
                                    </Button>
                                </div>
                                {couponError && (
                                    <p className="text-sm text-red-500 mt-1">
                                        ❌ {couponError}
                                    </p>
                                )}
                                {couponApplied && (
                                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Cupom oficial verificado! Desconto de R$ 5,00 aplicado.
                                    </p>
                                )}
                            </div>

                            {/* Price Summary */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span>{formatPrice(selectedProductData?.price || 0)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Desconto (Cupom)</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span>{formatPrice(calculateTotal())}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleCheckout}
                                disabled={isPaymentDisabled}
                                className={`w-full h-12 text-lg font-bold ${paymentMethod === 'pix'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Processando...
                                    </>
                                ) : paymentMethod === 'pix' ? (
                                    <>
                                        <QrCode className="w-5 h-5 mr-2" />
                                        Gerar PIX - {formatPrice(calculateTotal())}
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Pagar com Cartão - {formatPrice(calculateTotal())}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
