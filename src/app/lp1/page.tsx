"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ShieldCheck, Video, FileText, Star, Menu, X, ArrowRight, HeartPulse, Stethoscope, Users } from "lucide-react"
import { useState } from "react"

export default function LandingPage1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <HeartPulse className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">ZelloMed</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Como Funciona</button>
                        <button onClick={() => scrollToSection('beneficios')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Benefícios</button>
                        <button onClick={() => scrollToSection('precos')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Planos</button>
                        <Link href="/checkout">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                                Consultar Agora
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-4 flex flex-col gap-4 shadow-xl">
                        <button onClick={() => scrollToSection('como-funciona')} className="text-left py-2 font-medium text-slate-600">Como Funciona</button>
                        <button onClick={() => scrollToSection('beneficios')} className="text-left py-2 font-medium text-slate-600">Benefícios</button>
                        <button onClick={() => scrollToSection('precos')} className="text-left py-2 font-medium text-slate-600">Planos</button>
                        <Link href="/checkout" className="w-full">
                            <Button className="w-full bg-blue-600">Consultar Agora</Button>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                </div>

                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full border-none">
                                ✨ Saúde acessível para todos
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                                Médico Online Agora: <br className="hidden md:block" />
                                <span className="text-blue-600">Atendimento em minutos!</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Fale com clínicos gerais e especialistas sem sair de casa. Receita digital, atestado e pedido de exames direto no seu celular.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
                                <Link href="/checkout" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1">
                                        Agendar Consulta
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    Médicos verificados (CFM)
                                </div>
                            </div>
                        </div>

                        {/* Abstract Visual Representation instead of stock photo */}
                        <div className="flex-1 w-full max-w-md md:max-w-full relative">
                            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 transform rotate-1 transition-transform hover:rotate-0 duration-500">
                                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg text-sm animate-bounce">
                                    Médicos Disponíveis 🟢
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Video className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">Consulta por Vídeo</h3>
                                            <p className="text-sm text-slate-500">Segurança e praticidade</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">Receita Digital</h3>
                                            <p className="text-sm text-slate-500">Válida em todo território nacional</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                                                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                                                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600">+10k pacientes</span>
                                        </div>
                                        <div className="flex text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Benefits */}
            <section id="beneficios" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Por que escolher a ZelloMed?</h2>
                        <p className="text-lg text-slate-600">Resolvemos seu problema de saúde de forma simples, sem burocracia e com preço justo.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Clock,
                                title: "Sem Filas de Espera",
                                description: "Esqueça horas em hospitais. Seja atendido no conforto da sua casa em poucos minutos."
                            },
                            {
                                icon: ShieldCheck,
                                title: "100% Seguro e Sigiloso",
                                description: "Plataforma criptografada e médicos éticos. Seus dados e sua história estão protegidos."
                            },
                            {
                                icon: FileText,
                                title: "Documentos Válidos",
                                description: "Receitas, atestados e pedidos de exame com assinatura digital aceitos em todo o Brasil."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Products */}
            <section id="precos" className="py-20 bg-slate-900 text-white relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu Atendimento</h2>
                        <p className="text-lg text-slate-300">Valores transparentes. Sem mensalidades ou taxas escondidas.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Generalista */}
                        <Card className="bg-slate-800 border-slate-700 text-slate-100 relative overflow-hidden group hover:border-blue-500 transition-all duration-300">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <Stethoscope className="w-6 h-6 text-blue-400" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Clínico Geral</CardTitle>
                                <CardDescription className="text-slate-400">Para sintomas comuns, receitas e orientações.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-slate-400">R$</span>
                                    <span className="text-5xl font-extrabold text-white">47</span>
                                    <span className="text-sm text-slate-400">,00</span>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        Atendimento rápido (ordem de chegada)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        Receita Digital e Atestado
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        Retorno incluso (se necessário)
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-bold">
                                        Agendar Agora
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Especialista */}
                        <Card className="bg-white text-slate-900 border-none relative overflow-hidden shadow-2xl transform md:-translate-y-4">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            <Badge className="absolute top-4 right-4 bg-purple-100 text-purple-700 hover:bg-purple-200">Mais Popular</Badge>

                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Médico Especialista</CardTitle>
                                <CardDescription className="text-slate-600">Pediatria, Cardiologia, Ginecologia e +</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-slate-500">R$</span>
                                    <span className="text-5xl font-extrabold text-slate-900">79</span>
                                    <span className="text-sm text-slate-500">,00</span>
                                </div>
                                <ul className="space-y-3 text-sm font-medium text-slate-600">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                        Escolha a especialidade desejada
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                        Laudos e avaliações específicas
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                        Acompanhamento dedicado
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 font-bold shadow-lg">
                                        Agendar Especialista
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="como-funciona" className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Consulta Simples e Rápida</h2>
                        <p className="text-lg text-slate-600">Em apenas 3 passos você resolve o seu problema.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

                        {[
                            { step: "1", title: "Pagamento Seguro", desc: "Escolha seu plano e pague via PIX ou Cartão no nosso checkout seguro." },
                            { step: "2", title: "Triagem Digital", desc: "Receba o link da sala virtual em seu WhatsApp/Email imediatamente." },
                            { step: "3", title: "Atendimento", desc: "Converse com o médico, receba o diagnóstico e sua receita digital." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:bg-transparent md:border-none md:shadow-none">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-blue-600/30">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/checkout">
                            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                Começar Agora
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4 text-white">
                                <HeartPulse className="w-6 h-6" />
                                <span className="text-xl font-bold">ZelloMed</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-4">
                                Levando saúde de qualidade para todos os brasileiros. Simples, acessível e humano.
                            </p>
                            <div className="flex gap-4">
                                {/* Social Placeholders */}
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 4.635c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8 0.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <h4 className="text-white font-bold mb-4">Serviços</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/checkout" className="hover:text-blue-400">Clínico Geral</Link></li>
                                <li><Link href="/checkout" className="hover:text-blue-400">Pediatria</Link></li>
                                <li><Link href="/checkout" className="hover:text-blue-400">Cardiologia</Link></li>
                                <li><Link href="/checkout" className="hover:text-blue-400">Saúde Mental</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="https://zellomed.com/termos/" target="_blank" className="hover:text-blue-400">Termos de Uso</a></li>
                                <li><a href="https://zellomed.com/privacidade/" target="_blank" className="hover:text-blue-400">Privacidade</a></li>
                                <li><span className="text-slate-500 cursor-not-allowed">Política de Reembolso</span></li>
                            </ul>
                        </div>

                        <div className="col-span-1 border-t border-slate-800 pt-4 md:border-t-0 md:pt-0">
                            <h4 className="text-white font-bold mb-4">Contato</h4>
                            <p className="text-sm mb-2">Dúvidas? Fale conosco.</p>
                            <a href="mailto:admin@zellomed.com" className="text-sm text-blue-400 hover:text-blue-300 block mb-4">admin@zellomed.com</a>

                            <div className="text-xs text-slate-500 mt-6">
                                <p className="font-bold text-slate-400">ZelloMed Serviços Médicos</p>
                                <p>CNPJ: 55.409.706/0001-01</p>
                                <p>Responsável Técnico: Dr. Marcos A. (CRM-PJ 26.155)</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
                        <p>&copy; 2026 ZelloMed. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
