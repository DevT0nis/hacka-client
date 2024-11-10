'use client'

import { useState } from 'react'
import { Send, MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Mensagem {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [userInput, setUserInput] = useState('')
  const [chatHistory, setChatHistory] = useState<Mensagem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const formatarHora = () => {
    return new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userInput.trim() || isLoading) return

    setIsLoading(true)

    try {
      const novaMensagemUsuario: Mensagem = {
        role: 'user',
        content: userInput,
        timestamp: formatarHora()
      }
      
      const novoHistorico = [...chatHistory, novaMensagemUsuario]
      setChatHistory(novoHistorico)
      setUserInput('')

      const resposta = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: novoHistorico,
          message: userInput 
        }),
      })

      if (!resposta.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      const dados = await resposta.json()

      setChatHistory([...novoHistorico, {
        role: 'assistant',
        content: dados.reply,
        timestamp: formatarHora()
      }])
    } catch (erro) {
      console.error('Erro:', erro)
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: formatarHora()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full w-16 h-16 p-0 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Abrir chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Chat Assistente</CardTitle>

          </CardHeader>
          <CardContent className="flex-grow flex flex-col pt-4">
            <ScrollArea className="flex-grow pr-4 mb-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Comece uma conversa enviando uma mensagem...
                </div>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        msg.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="mt-1">
                        <AvatarImage 
                          src={msg.role === 'user' ? '/user-avatar.png' : '/bot-avatar.png'} 
                          alt={msg.role === 'user' ? 'Usuário' : 'Assistente'} 
                        />
                        <AvatarFallback>
                          {msg.role === 'user' ? 'U' : 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            <form onSubmit={enviarMensagem} className="flex gap-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="min-h-[60px] resize-none"
              />
              <Button type="submit" disabled={isLoading || !userInput.trim()}>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="sr-only">Enviar mensagem</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  )
}