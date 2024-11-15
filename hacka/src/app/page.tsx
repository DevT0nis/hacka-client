"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Book,
  BarChart,
  Zap,
  Star,
  Moon,
  Sun,
  Menu,
  PieChart,
  Shield,
  ChevronDown,
  Github,
  Linkedin,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { id: "inicio", name: "Início", href: "#inicio" },
  { id: "sobre", name: "Sobre Nós", href: "#sobre" },
  { id: "recursos", name: "Recursos", href: "#recursos" },
  { id: "depoimentos", name: "Depoimentos", href: "#depoimentos" },
  { id: "faq", name: "FAQ", href: "#faq" },
  { id: "contato", name: "Contato", href: "#contato" },
]

const features = [
  {
    id: "plano-acao",
    icon: Zap,
    title: "Plano de Ação Personalizado",
    description: "IA cria um plano individual com passos específicos para sair da inadimplência.",
  },
  {
    id: "insights",
    icon: PieChart,
    title: "Insights Financeiros",
    description: "Análise detalhada de gastos por categoria com recomendações inteligentes de economia.",
  },
  {
    id: "previsao",
    icon: BarChart,
    title: "Previsão Financeira",
    description: "Projeções precisas do tempo necessário para recuperação financeira.",
  },
  {
    id: "educacao",
    icon: Book,
    title: "Educação Financeira",
    description: "Conteúdo personalizado para desenvolver hábitos financeiros saudáveis.",
  },
  {
    id: "seguranca",
    icon: Shield,
    title: "Segurança Total",
    description: "Proteção de dados e privacidade com criptografia de ponta a ponta.",
  },
  {
    id: "inteligencia",
    icon: Star,
    title: "IA Avançada",
    description: "Algoritmos de última geração para análise e recomendações personalizadas.",
  },
]

const faqs = [
  {
    question: "Como o Quita.AI pode me ajudar a sair das dívidas?",
    answer:
      "Utilizamos inteligência artificial para analisar sua situação financeira e criar um plano de ação personalizado para você quitar suas dívidas de forma eficiente.",
  },
  {
    question: "É seguro conectar minhas contas bancárias?",
    answer:
      "Sim, a segurança dos seus dados é nossa prioridade. Utilizamos criptografia de ponta a ponta para proteger todas as informações.",
  },
  {
    question: "O Quita.AI é gratuito?",
    answer:
      "Oferecemos uma versão gratuita com recursos limitados e planos premium com funcionalidades avançadas.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "O tempo varia de acordo com sua situação financeira, mas muitos usuários começam a ver melhorias em suas finanças em 3 a 6 meses de uso consistente.",
  },
  {
    question: "Posso usar o Quita.AI se estiver desempregado?",
    answer:
      "Sim, o Quita.AI pode ajudar a gerenciar suas finanças e encontrar oportunidades de economia, independentemente da sua situação de emprego.",
  },
]

const teamMembers = [
  {
    id: "anthony",
    name: "Anthony Thomas",
    role: "Desenvolvedor Full-Stack",
    photo: "/time/anthony.jpg",
    linkedin: "https://www.linkedin.com/in/anthonythomasmm",
    github: "https://github.com/devt0nis",
  },
  {
    id: "vini",
    name: "Vinicius Costa",
    role: "Dev Mobile Android",
    photo: "/time/vinicius.jpg",
    linkedin: "https://www.linkedin.com/in/vinicius-scosta/",
    github: "https://github.com",
  },
  {
    id: "marcelo",
    name: "Marcelo Aggio",
    role: "Desenvolvedor Backend",
    photo: "/time/marcelo.jpeg",
    linkedin: "https://www.linkedin.com/in/marceloaggiodev/",
    github: "https://github.com",
  },
  {
    id: "vitor",
    name: "Vitor Lopes",
    role: "Desenvolvedor Backend",
    photo: "/time/vitor.jpg",
    linkedin: "https://www.linkedin.com/in/vitorlopesrmo",
    github: "https://github.com",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Professora",
    content: "O Quita.AI mudou minha vida financeira. Em 6 meses, consegui quitar todas as minhas dívidas e agora estou economizando para realizar meu sonho de viajar para a Europa.",
    avatar: "/avatars/maria.jpg",
  },
  {
    id: 2,
    name: "João Santos",
    role: "Empreendedor",
    content: "Como dono de pequeno negócio, sempre tive dificuldades em gerenciar minhas finanças pessoais e profissionais. O Quita.AI me ajudou a organizar tudo e agora meu negócio está crescendo de forma sustentável.",
    avatar: "/avatars/joao.jpg",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    role: "Estudante",
    content: "Nunca pensei que conseguiria pagar meu empréstimo estudantil tão rápido! Com as dicas e o planejamento do Quita.AI, estou no caminho certo para um futuro financeiro estável.",
    avatar: "/avatars/ana.jpg",
  },
]

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode.toString())
    document.documentElement.classList.toggle("dark", newMode)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", { name, email, message })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className={`min-h-screen w-full ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-orange-50">
        <header className="fixed w-full top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-orange-200 dark:border-orange-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300">
                  Quita.AI
                </span>
              </Link>

              <div className="md:hidden">
                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                        Menu
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="mt-6 flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="text-lg font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link href="/login" className="text-center">
                        <Button className="w-full bg-orange-600 text-white hover:bg-zinc-700 rounded-full mt-2">
                          Login
                        </Button>
                      </Link>
                      <Link href="/cadastro" className="text-center">
                        <Button className="w-full bg-orange-500 text-white hover:bg-zinc-600 rounded-full mt-2">
                          Cadastro
                        </Button>
                      </Link>
                      <div className="flex justify-center mt-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="rounded-full bg-orange-100 dark:bg-zinc-800"
                              >
                                {darkMode ? (
                                  <Sun className="h-5 w-5" />
                                ) : (
                                  <Moon className="h-5 w-5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{darkMode ? "Modo claro" : "Modo escuro"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <nav className="flex space-x-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDarkMode}
                        className="rounded-full bg-orange-100 dark:bg-zinc-800"
                      >
                        {darkMode ? (
                          <Sun className="h-5 w-5" />
                        ) : (
                          <Moon className="h-5 w-5" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{darkMode ? "Modo claro" : "Modo escuro"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href="/login">
                  <Button className="bg-orange-600 text-white hover:bg-orange-700 rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600 rounded-full">
                    Cadastro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20">
          {/* Seção Hero */}
          <section id="inicio" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-zinc-900/20 px-4 py-1.5 mb-6">
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Análise com IA
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-snug">
                    Recupere o controle das suas{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300">
                      finanças
                    </span>{" "}
                    e sua{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300">
                      tranquilidade
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl mb-8 text-orange-700 dark:text-orange-300">
                    Transforme sua vida financeira com o poder da IA. Análise personalizada, plano
                    de ação para quitação de dívidas e acompanhamento em tempo real.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:opacity-90 rounded-full h-12 px-8">
                      Comece Gratuitamente
                    </Button>
                    <Button variant="outline" className="rounded-full h-12 px-8 border-orange-400 text-orange-600 hover:bg-orange-100">
                      Ver Demonstração
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative w-full h-64 sm:h-80 md:h-full">
                    <div className="absolute -inset-1  rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <video className="rounded-2xl" width={1000} height={500} autoPlay controls>
              
              <source src="/lv_0_20241110113729.mp4" type="video/mp4"/>
            </video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Recursos */}
          <section id="recursos" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Tecnologia de ponta para transformar sua saúde financeira
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <Card
                    key={feature.id}
                    className="border-none shadow-lg bg-white/50 dark:bg-orange-700 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-700 flex items-center justify-center mb-4`}
                      >
                        <feature.icon className={`w-6 h-6 text-orange-600 dark:text-orange-300`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-orange-700 dark:text-orange-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Nova Seção: Como Funciona */}
          <section id="como-funciona" className="py-20 bg-orange-100 dark:bg-orange-900">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Como o Quita.AI Funciona</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Três passos simples para sua liberdade financeira
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Conecte suas Contas</h3>
                  <p className="text-orange-700 dark:text-orange-300">
                    Conecte suas contas bancárias e cartões de crédito de forma segura para uma análise completa.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Receba sua Análise</h3>
                  <p className="text-orange-700 dark:text-orange-300">
                    Nossa IA analisa seus dados e cria um plano personalizado para quitar suas dívidas.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Implemente e Acompanhe</h3>
                  <p className="text-orange-700 dark:text-orange-300">
                    Siga o plano e acompanhe seu progresso em tempo real, com ajustes automáticos conforme necessário.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Depoimentos */}
          <section id="depoimentos" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Histórias reais de pessoas que transformaram suas vidas financeiras com o Quita.AI
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-none shadow-lg bg-white/50 dark:bg-orange-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-orange-600 dark:text-orange-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-orange-700 dark:text-orange-300">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Seção FAQ */}
          <section id="faq" className="py-20 bg-orange-50 dark:bg-orange-900/50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Respostas para as dúvidas mais comuns
                </p>
              </div>
              <div className="max-w-3xl mx-auto ">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-lg font-medium py-4 ">
                        {faq.question}

                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-orange-700 dark:text-orange-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Seção Sobre Nós */}
          <section id="sobre" className="py-20 bg-orange-100 dark:bg-orange-900/50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Conheça as pessoas por trás do Quita.AI
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="border-none shadow-lg bg-white/50 dark:bg-orange-800/50 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 text-center">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="mx-auto rounded-full mb-4"
                      />
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                        {member.role}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Link href={member.linkedin} passHref target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-6 h-6 text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300" />
                        </Link>
                        <Link href={member.github} passHref target="_blank" rel="noopener noreferrer">
                          <Github className="w-6 h-6 text-orange-800 hover:text-orange-600 dark:text-orange-200 dark:hover:text-orange-400" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Seção Contato */}
          <section id="contato" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
                <p className="text-lg text-orange-700 dark:text-orange-300">
                  Estamos aqui para ajudar você a recuperar sua liberdade financeira
                </p>
              </div>
              <div className="max-w-lg mx-auto">
                <Card className="border-none shadow-lg bg-white/50 dark:bg-orange-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nome
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-white dark:bg-orange-900 w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white dark:bg-orange-900 w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Mensagem
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="bg-white dark:bg-orange-900 w-full"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:opacity-90 rounded-full h-12"
                      >
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <Link href="/" className="inline-block mb-4">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300">
                    Quita.AI
                  </span>
                </Link>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Transformando vidas através da inteligência financeira
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Navegação</h3>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="#"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Termos de Uso
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Política de Privacidade
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Cookies
                  </Link>
                </nav>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {/* Ícones das redes sociais */}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Quita.AI. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
