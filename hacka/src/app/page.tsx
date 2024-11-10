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
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { id: "inicio", name: "Início", href: "#inicio" },
  { id: "sobre", name: "Sobre", href: "#sobre" },
  { id: "recursos", name: "Recursos", href: "#recursos" },
  { id: "simulados", name: "Simulados", href: "#simulados" },
  { id: "depoimentos", name: "Depoimentos", href: "#depoimentos" },
  { id: "contato", name: "Contato", href: "#contato" },
]

const features = [
  {
    id: "plano-acao",
    icon: Zap,
    title: "Plano de Ação Personalizado",
    description: "IA cria um plano individual com passos específicos para sair da inadimplência.",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    id: "insights",
    icon: PieChart,
    title: "Insights Financeiros",
    description: "Análise detalhada de gastos por categoria com recomendações inteligentes de economia.",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "previsao",
    icon: BarChart,
    title: "Previsão Financeira",
    description: "Projeções precisas do tempo necessário para recuperação financeira.",
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "educacao",
    icon: Book,
    title: "Educação Financeira",
    description: "Conteúdo personalizado para desenvolver hábitos financeiros saudáveis.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: "seguranca",
    icon: Shield,
    title: "Segurança Total",
    description: "Proteção de dados e privacidade com criptografia de ponta a ponta.",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    id: "inteligencia",
    icon: Star,
    title: "IA Avançada",
    description: "Algoritmos de última geração para análise e recomendações personalizadas.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
  },
]



const testimonials = [
  {
    id: "maria",
    name: "Maria Silva",
    role: "Professora",
    comment: "O Quita.AI transformou minha vida financeira. Em 6 meses, consegui limpar meu nome e hoje tenho total controle das minhas finanças.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "joao",
    name: "João Santos",
    role: "Autônomo",
    comment: "A análise detalhada dos meus gastos abriu meus olhos. As recomendações da IA são práticas e realmente funcionam!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "ana",
    name: "Ana Oliveira",
    role: "Estudante",
    comment: "Como estudante, achei que seria impossível organizar minhas finanças. O Quita.AI provou que é possível com as ferramentas certas!",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
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
    console.log("Form submitted:", { name, email, message })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className={`min-h-screen w-full ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-50">
        <header className="fixed w-full top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
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
                      <SheetTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Menu
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="mt-6 flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
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
                      className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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
                        className="rounded-full bg-slate-100 dark:bg-slate-800"
                      >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{darkMode ? "Modo claro" : "Modo escuro"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href="/inicio">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 rounded-full">
                  Começar Agora
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20">
          <section id="inicio" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="inline-flex items-center rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-4 py-1.5 mb-6">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Análise com IA 
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Recupere o controle das suas{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                      finanças
                    </span>{" "}
                    e sua{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">tranquilidade</span>
                  </h1>
                  <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
                    Transforme sua vida financeira com o poder da IA. Análise personalizada, plano de ação para quitação de dividas e acompanhamento em tempo real.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 rounded-full h-12 px-8">
                      Comece Gratuitamente
                    </Button>
                    <Button variant="outline" className="rounded-full h-12 px-8">
                      Ver Demonstração
                    </Button>
                  </div>
                  
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Quita.AI Dashboard"
                      width={600}
                      height={600}
                      className="relative rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="recursos" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Tecnologia de ponta para transformar sua saúde financeira
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <Card key={feature.id} className="border-none shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="depoimentos" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Histórias de Sucesso</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Veja como o Quita.AI está transformando vidas
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-none shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{testimonial.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="contato" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Estamos aqui para ajudar você a recuperar sua liberdade financeira
                </p>
              </div>
              <div className="max-w-lg mx-auto">
                <Card className="border-none shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
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
                          className="bg-white dark:bg-slate-900"
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
                          className="bg-white dark:bg-slate-900"
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
                          className="bg-white dark:bg-slate-900"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 rounded-full h-12"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link href="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
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
                  <Link href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                    Termos de Uso
                  </Link>
                  <Link href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                    Política de Privacidade
                  </Link>
                  <Link href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                    Cookies
                  </Link>
                </nav>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
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