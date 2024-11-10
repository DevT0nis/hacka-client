"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
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
            <Input id="email" type="email" placeholder="seu@email.com" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-700 dark:text-purple-300">Senha</Label>
            <Input id="password" type="password" className="border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <a href="/inicio">Entrar</a>
            
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