"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ShieldCheck, Video, FileText, Star, Menu, X, ArrowRight, HeartPulse, Stethoscope, Users, Check, Activity } from "lucide-react"
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
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <HeartPulse className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">ZelloMed</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Telemedicina</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('servicos')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Serviços</button>
                        <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Como Funciona</button>
                        <button onClick={() => scrollToSection('precos')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Planos</button>
                        <Link href="/checkout">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-0.5">
                                Falar com Médico Agora
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2">
                        <button onClick={() => scrollToSection('servicos')} className="text-left py-2 font-semibold text-lg text-slate-700">Serviços</button>
                        <button onClick={() => scrollToSection('como-funciona')} className="text-left py-2 font-semibold text-lg text-slate-700">Como Funciona</button>
                        <button onClick={() => scrollToSection('precos')} className="text-left py-2 font-semibold text-lg text-slate-700">Planos</button>
                        <Link href="/checkout" className="w-full">
                            <Button size="lg" className="w-full bg-blue-600 rounded-xl text-lg h-14">Falar com Médico Agora</Button>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-50 to-transparent -z-10"></div>
                <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 text-center md:text-left space-y-8 animate-in slide-in-from-left-4 duration-700 fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-full shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-sm font-semibold text-slate-700">Médicos Online Agora</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                                Consulta Online: <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Rápida, Segura e Acessível
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                                Cuide da sua saúde hoje, sem complicação. Atendimento médico humanizado, sem filas e com receita digital válida em todo o Brasil.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
                                    {[
                                        "Consultas de Rotina",
                                        "Orientação Clínica",
                                        "Continuidade de Tratamento",
                                        "Emissão de Documentos"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-white/60 p-2 rounded-lg border border-slate-100">
                                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
                                    <Link href="/checkout" className="w-full sm:w-auto">
                                        <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30 rounded-2xl transition-all hover:-translate-y-1">
                                            Iniciar Atendimento
                                            <ArrowRight className="w-6 h-6 ml-2" />
                                        </Button>
                                    </Link>
                                    <div className="flex flex-col text-sm font-medium text-slate-500 gap-1 text-center sm:text-left">
                                        <span className="flex items-center gap-1 justify-center sm:justify-start"><ShieldCheck className="w-4 h-4 text-green-600" /> 100% Seguro</span>
                                        <span>Sem mensalidades. Pague só quando usar.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="flex-1 w-full max-w-[500px] relative animate-in slide-in-from-right-4 duration-1000 fade-in delay-200">
                            <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-3 opacity-10 scale-105"></div>
                            <div className="relative bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-14 h-14 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                                                <Stethoscope className="w-full h-full p-3 text-slate-400" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg">Dr. Plantonista</h3>
                                            <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                                                Disponível Agora
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Ao Vivo
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                                                <Video className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Vídeo Chamada</h4>
                                                <p className="text-sm text-slate-500 mt-1">Alta qualidade, sem travar, direto no navegador ou celular.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 flex-shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Receita & Atestado PDF</h4>
                                                <p className="text-sm text-slate-500 mt-1">Com QR Code e Assinatura Digital ICP-Brasil.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
                                                User
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm">
                                            +2k
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex text-yellow-400 text-sm gap-0.5 mb-1">
                                            <Star className="fill-current w-4 h-4" />
                                            <Star className="fill-current w-4 h-4" />
                                            <Star className="fill-current w-4 h-4" />
                                            <Star className="fill-current w-4 h-4" />
                                            <Star className="fill-current w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-medium text-slate-500">4.9/5 de satisfação</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Bar */}
            <div className="border-y border-slate-200 bg-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-bold text-slate-400">
                            <ShieldCheck className="w-8 h-8" /> SEGURANÇA SSL
                        </div>
                        <div className="flex items-center gap-2 font-bold text-slate-400">
                            <Activity className="w-8 h-8" /> MÉDICOS CFM
                        </div>
                        <div className="flex items-center gap-2 font-bold text-slate-400">
                            <FileText className="w-8 h-8" /> ASSINATURA DIGITAL
                        </div>
                        <div className="flex items-center gap-2 font-bold text-slate-400">
                            <CheckCircle2 className="w-8 h-8" /> APROVADO ANVISA
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section id="servicos" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">Nossos Serviços Médicos</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Telemedicina pensada para <br />resolver o que você precisa</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Atendimento médico online para situações do dia a dia, com rapidez, segurança e preço justo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Consulta Médica Online",
                                desc: "Converse com um médico por vídeo, tire dúvidas sobre sintomas, receba orientações e acompanhamento.",
                                icon: Video,
                                color: "blue"
                            },
                            {
                                title: "Médicos Especialistas",
                                desc: "Conectamos você a especialistas qualificados com atendimento humanizado, da Pediatria à Geriatria.",
                                icon: Users,
                                color: "purple"
                            },
                            {
                                title: "Avaliação para Atestado",
                                desc: "Emissão sujeita estritamente à avaliação clínica do médico durante a videochamada.",
                                icon: FileText,
                                color: "green"
                            },
                            {
                                title: "Orientação em Saúde",
                                desc: "Receba orientações claras, acompanhamento e encaminhamentos quando necessário.",
                                icon: Activity,
                                color: "orange"
                            },
                            {
                                title: "Receita Digital",
                                desc: "Receitas de controle especial ou simples, assinadas digitalmente e aceitas em farmácias.",
                                icon: FileText,
                                color: "red"
                            },
                            {
                                title: "Avaliação de Sintomas",
                                desc: "Dor, febre, gripe, mal-estar, alergias e outros sintomas avaliados por médico em consulta online.",
                                icon: Stethoscope,
                                color: "indigo"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm mb-6">{item.desc}</p>
                                <Link href="/checkout" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
                                    Agendar <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="precos" className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="bg-blue-600 mb-4 hover:bg-blue-600">PREÇO JUSTO</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Escolha seu Plano</h2>
                        <p className="text-xl text-slate-300">Consultas avulsas. Sem contratos, sem mensalidades.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Standard Plan */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 flex flex-col hover:border-blue-500/50 transition-colors">
                            <div className="mb-8">
                                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                                    <Stethoscope className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Clínico Geral</h3>
                                <p className="text-slate-400 mt-2">Para resolver problemas pontuais de saúde.</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-4xl font-bold text-white">R$ 47</span>
                                <span className="text-slate-400">/consulta</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {["Atendimento Imediato", "Receita Digital", "Atestado Médico (se necessário)", "Retorno incluso"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/checkout">
                                <Button className="w-full h-14 bg-slate-100 hover:bg-white text-slate-900 font-bold rounded-xl text-lg">
                                    Agendar Consulta
                                </Button>
                            </Link>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-1 p-relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/50">
                            <div className="bg-slate-900/10 h-full rounded-[20px] p-8 flex flex-col relative overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 right-0 bg-white/20 px-4 py-2 rounded-bl-2xl text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md">
                                    Recomendado
                                </div>

                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Especialista</h3>
                                    <p className="text-blue-100 mt-2">Atendimento focado em sua necessidade específica.</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">R$ 79</span>
                                    <span className="text-blue-200">/consulta</span>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {["Escolha a Especialidade", "Duração Estendida", "Laudos Específicos", "Acompanhamento Dedicado"].map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white">
                                            <div className="bg-white/20 rounded-full p-0.5">
                                                <Check className="w-4 h-4 text-white flex-shrink-0" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/checkout">
                                    <Button className="w-full h-14 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl text-lg shadow-lg">
                                        Agendar Especialista
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <HeartPulse className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-slate-900">ZelloMed</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-6 text-slate-500">
                                Nossa missão é democratizar o acesso à saúde de qualidade no Brasil, conectando pacientes a médicos excepcionais através da tecnologia.
                            </p>
                            <div className="flex gap-4">
                                {['instagram', 'twitter', 'facebook'].map((social) => (
                                    <div key={social} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-all">
                                        <span className="sr-only">{social}</span>
                                        <div className="w-4 h-4 bg-current rounded-sm"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1">
                            <h4 className="font-bold text-slate-900 mb-6">Nossos Serviços</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                {['Clínico Geral', 'Pediatria', 'Cardiologia', 'Psicologia', 'Dermatologia', 'Nutrição'].map(serv => (
                                    <li key={serv}><Link href="/checkout" className="hover:text-blue-600 transition-colors">{serv}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h4 className="font-bold text-slate-900 mb-6">Institucional</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="https://zellomed.com" target="_blank" className="hover:text-blue-600">Sobre nós</a></li>
                                <li><a href="https://zellomed.com" target="_blank" className="hover:text-blue-600">Blog da Saúde</a></li>
                                <li><a href="https://zellomed.com/termos/" target="_blank" className="hover:text-blue-600">Termos de Uso</a></li>
                                <li><a href="https://zellomed.com/privacidade/" target="_blank" className="hover:text-blue-600">Privacidade</a></li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h4 className="font-bold text-slate-900 mb-6">Central de Ajuda</h4>
                            <div className="space-y-4 text-sm">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="font-bold text-slate-900 mb-1">Precisa de ajuda?</p>
                                    <p className="text-slate-500 mb-3">Nossa equipe está disponível todos os dias.</p>
                                    <a href="mailto:admin@zellomed.com" className="text-blue-600 font-bold hover:underline">admin@zellomed.com</a>
                                </div>

                                <div className="text-xs text-slate-400 mt-6 pt-6 border-t border-slate-100">
                                    <p className="font-bold text-slate-500">ZelloMed Serviços Médicos Ltda</p>
                                    <p>CNPJ: 55.409.706/0001-01</p>
                                    <p>Resp. Técnico: Dr. Marcos A. (CRM 26.155)</p>
                                    <p className="mt-2">Av. Santos Dumont, 1234 - Fortaleza/CE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                        <p>&copy; 2026 ZelloMed. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Site Seguro</span>
                            <span>Feito com ❤️ por médicos para pacientes</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
