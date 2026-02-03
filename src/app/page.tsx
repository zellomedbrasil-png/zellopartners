import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Gift, Users, Wallet, Star, Zap, Phone, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-blue-600 dark:text-blue-400">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <span className="truncate">ZelloPartners</span>
          </div>
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="#como-funciona" className="hover:text-blue-600 transition">Como Funciona</Link>
            <Link href="#beneficios" className="hover:text-blue-600 transition">Benefícios</Link>
            <Link href="/checkout" className="hover:text-blue-600 transition">Comprar Consulta</Link>
          </nav>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="ghost" className="text-gray-600 hidden sm:flex" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm" size="sm" asChild>
              <Link href="/register">Seja Parceiro</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-50 via-blue-50/50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-900/30 dark:text-green-300">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span>Ganhe 10% de comissão por venda</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 leading-tight">
                  Ganhe dinheiro indicando
                  <span className="text-blue-600 block">consultas médicas</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Crie seu cupom exclusivo, compartilhe com amigos e ganhe <strong>10% de comissão</strong> em cada consulta. Seus clientes ganham <strong>R$ 5 de desconto</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 w-full sm:w-auto" asChild>
                    <Link href="/register">
                      Criar Meu Cupom Grátis <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-xl border-gray-300 w-full sm:w-auto" asChild>
                    <Link href="/simulator">
                      Simular Ganhos
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    <span>100% Gratuito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    <span>Sem burocracia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    <span>Saque via PIX</span>
                  </div>
                </div>
              </div>

              {/* Stats Card - Mobile friendly */}
              <div className="mt-8 lg:mt-0">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 hidden sm:block"></div>
                  <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl sm:shadow-2xl border border-gray-100 dark:border-zinc-800 p-6 sm:p-8 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Exemplo de ganhos</p>
                        <p className="font-bold text-lg sm:text-xl truncate">Cupom MARIA10</p>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Consultas vendidas</span>
                        <span className="font-bold text-xl sm:text-2xl">32</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Valor gerado</span>
                        <span className="font-bold text-xl sm:text-2xl text-green-600">R$ 1.984</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <span className="text-sm sm:text-base text-blue-800 dark:text-blue-300 font-medium">Sua comissão (10%)</span>
                        <span className="font-bold text-xl sm:text-2xl text-blue-600">R$ 198,40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="como-funciona" className="py-16 sm:py-20 md:py-24 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Como Funciona</h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Em 3 passos simples você começa a ganhar dinheiro
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg z-10">1</div>
                <div className="p-6 sm:p-8 pt-10 sm:pt-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 h-full">
                  <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Crie seu cupom</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Escolha o nome do seu cupom exclusivo. Pode ser seu nome, apelido ou marca.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg z-10">2</div>
                <div className="p-6 sm:p-8 pt-10 sm:pt-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 h-full">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Compartilhe</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Seus clientes usam o cupom e ganham R$ 5 de desconto em qualquer consulta.
                  </p>
                </div>
              </div>
              <div className="relative sm:col-span-2 md:col-span-1">
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg z-10">3</div>
                <div className="p-6 sm:p-8 pt-10 sm:pt-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 h-full">
                  <Wallet className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Receba a comissão</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Ganhe 10% de cada venda. Acompanhe em tempo real e saque via PIX.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Highlight */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="p-4 sm:p-6">
                <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-80" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">10%</div>
                <p className="text-blue-100 text-sm sm:text-base">Comissão por venda</p>
              </div>
              <div className="p-4 sm:p-6">
                <Gift className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-80" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">R$ 5</div>
                <p className="text-blue-100 text-sm sm:text-base">Desconto para o cliente</p>
              </div>
              <div className="p-4 sm:p-6">
                <Zap className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-80" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">PIX</div>
                <p className="text-blue-100 text-sm sm:text-base">Saque instantâneo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Consultas Disponíveis</h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Seus clientes compram com desconto usando seu cupom
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>CLÍNICO GERAL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Consulta Generalista</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                  Consulta médica online com clínico geral via videochamada.
                </p>
                <div className="flex flex-wrap items-end gap-2 mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">R$ 47</span>
                  <span className="text-gray-500 line-through text-sm sm:text-base mb-1">R$ 52</span>
                  <span className="text-green-600 text-xs sm:text-sm mb-1 bg-green-50 px-2 py-1 rounded-full">-R$ 5 com cupom</span>
                </div>
                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-medium">
                    💰 Sua comissão: <strong>R$ 4,70</strong> por consulta
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-purple-300 dark:border-purple-800 shadow-sm relative">
                <div className="absolute -top-3 right-4 sm:right-6 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MAIS VENDIDO
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
                  <Star className="h-4 w-4 flex-shrink-0" />
                  <span>ESPECIALISTA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Consulta Especialista</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                  Consulta online com médico especialista da área desejada.
                </p>
                <div className="flex flex-wrap items-end gap-2 mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">R$ 79</span>
                  <span className="text-gray-500 line-through text-sm sm:text-base mb-1">R$ 84</span>
                  <span className="text-green-600 text-xs sm:text-sm mb-1 bg-green-50 px-2 py-1 rounded-full">-R$ 5 com cupom</span>
                </div>
                <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <p className="text-sm sm:text-base text-purple-700 dark:text-purple-300 font-medium">
                    💰 Sua comissão: <strong>R$ 7,90</strong> por consulta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="py-16 sm:py-20 md:py-24 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Por que ser um parceiro?</h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Vantagens exclusivas para você
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2 text-base sm:text-lg">10% de Comissão</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  R$ 4,70 na generalista e R$ 7,90 na especialista.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <h3 className="font-bold mb-2 text-base sm:text-lg">Pagamento Rápido</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Saque seus ganhos via PIX de forma instantânea.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2 text-base sm:text-lg">Dashboard Completo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Acompanhe vendas e comissões em tempo real.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <h3 className="font-bold mb-2 text-base sm:text-lg">Cupom Exclusivo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Escolha o nome do seu cupom personalizado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">O que nossos parceiros dizem</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  &quot;Em 2 meses divulgando já saquei mais de R$ 800. Super recomendo!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">M</div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Mariana K.</p>
                    <p className="text-xs sm:text-sm text-gray-500">Influenciadora</p>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  &quot;Plataforma transparente. Dashboard claro e pagamentos em dia.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 text-sm">R</div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Roberto S.</p>
                    <p className="text-xs sm:text-sm text-gray-500">Corretor de Saúde</p>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-sm sm:col-span-2 md:col-span-1">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  &quot;Indico para meus pacientes e ganho renda extra. Processo simples!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600 text-sm">A</div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Ana P.</p>
                    <p className="text-xs sm:text-sm text-gray-500">Fisioterapeuta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Comece a ganhar hoje mesmo</h2>
            <p className="text-blue-100 text-base sm:text-lg px-4">
              Cadastro gratuito, sem burocracia. Crie seu cupom em menos de 1 minuto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl h-12 sm:h-14 px-8 sm:px-10 font-bold text-base sm:text-lg w-full sm:w-auto" asChild>
                <Link href="/register">Criar Minha Conta Grátis</Link>
              </Button>
            </div>
            <p className="text-blue-200 text-sm">
              Já tem conta? <Link href="/login" className="underline text-white hover:text-blue-100">Fazer login</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 sm:py-12 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200">
                <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>ZelloPartners</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Plataforma oficial de afiliados do Zello Health Group.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">Parceiros</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                <li><Link href="/register" className="hover:text-blue-600">Criar Conta</Link></li>
                <li><Link href="/login" className="hover:text-blue-600">Acessar Painel</Link></li>
                <li><Link href="/simulator" className="hover:text-blue-600">Simulador</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">Clientes</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                <li><Link href="/checkout" className="hover:text-blue-600">Comprar Consulta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                <li><Link href="#" className="hover:text-blue-600">Termos</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2024 Zello Health Group. Todos os direitos reservados.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Feito com 💙 para parceiros de saúde
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
