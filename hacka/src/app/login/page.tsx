"use client"

import { useState } from "react"
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return 

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Login bem-sucedido")
      router.push('/inicio')
    } catch (error) {
      console.error("Erro no login:", error)
  
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-orange-600 dark:text-orange-400">Login</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Alternar modo escuro</span>
            </Button>
          </div>
          <CardDescription className="text-orange-700 dark:text-orange-300">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-700 dark:text-orange-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-orange-50 dark:bg-zinc-700 border-orange-200 dark:border-zinc-600 focus:ring-orange-500 dark:focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-700 dark:text-orange-300">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-orange-50 dark:bg-zinc-700 border-orange-200 dark:border-zinc-600 focus:ring-orange-500 dark:focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            <p className="text-sm text-center text-orange-700 dark:text-orange-300">
              Não tem uma conta?{" "}
              <a href="/cadastro" className="font-medium text-orange-600 hover:underline dark:text-orange-400">
                Registre-se
              </a>
            </p>
            <div className="space-y-2">
              <a href="/" className="text-orange-600 hover:underline dark:text-orange-400">Voltar</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

