"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-hot-toast"

const URL = process.env.NEXT_PUBLIC_URL;

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.")
      return
    }

    try {
      const response = await fetch(`${URL}/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.token) {
          localStorage.setItem('token', data.token) // Salva o token no localStorage
          toast.success("Login bem-sucedido!")
          window.location.href = "/inicio"
        } else {
          toast.error("Login bem-sucedido, mas nenhum token foi retornado.")
        }
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Erro ao fazer login. Verifique suas credenciais.")
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error)
      toast.error("Ocorreu um erro. Tente novamente mais tarde.")
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-4 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">Login</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-purple-700 dark:text-purple-300">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Alternar modo escuro</span>
            </Button>
          </div>
          <CardDescription className="text-purple-600 dark:text-purple-400">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-700 dark:text-purple-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-700 dark:text-purple-300">Senha</Label>
            <Input
              id="password"
              type="password"
              className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Entrar
          </Button>
          <p className="text-sm text-center text-purple-600 dark:text-purple-400">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="font-medium text-purple-700 hover:underline dark:text-purple-300">
              Registre-se
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
