"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CadastroPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-4 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">Cadastro</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-purple-700 dark:text-purple-300">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Alternar modo escuro</span>
            </Button>
          </div>
          <CardDescription className="text-purple-600 dark:text-purple-400">
            Preencha suas informações para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-700 dark:text-purple-300">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-700 dark:text-purple-300">Senha</Label>
            <Input id="password" type="password" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-purple-700 dark:text-purple-300">Nome Completo</Label>
            <Input id="name" type="text" placeholder="Seu Nome Completo" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-purple-700 dark:text-purple-300">CPF</Label>
            <Input id="cpf" type="text" placeholder="123.456.789-00" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-purple-700 dark:text-purple-300">Número de Telefone</Label>
            <Input id="phoneNumber" type="tel" placeholder="(00) 00000-0000" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
    
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Cadastrar
          </Button>
          <p className="text-sm text-center text-purple-600 dark:text-purple-400">
            Já tem uma conta?{" "}
            <a href="/login" className="font-medium text-purple-700 hover:underline dark:text-purple-300">
              Faça login
            </a>
          </p>
          <div className="space-y-2">
           <a href="/">Voltar</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}