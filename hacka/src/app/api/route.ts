import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Groq } from 'groq-sdk'

interface Mensagem {
  role: 'system' | 'user' | 'assistant'
  content: string
  timestamp?: string
}

interface RequestBody {
  message: string
  messages: Mensagem[]
}

export async function POST(request: NextRequest) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
  })

  try {
    const body: RequestBody = await request.json()
    const { message, messages } = body

    const chatHistory: Mensagem[] = [
      {
        role: 'system',
        content: 'Você é um assistente prestativo que responde em português do Brasil de forma clara e concisa.'
      },
      ...messages.slice(-10).map(({ role, content }) => ({
        role,
        content
      }))
    ]

    const completion = await client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: chatHistory,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 0.9,
      stream: false
    })

    const resposta = completion.choices[0]?.message?.content

    if (!resposta) {
      throw new Error('Resposta vazia do modelo')
    }

    return NextResponse.json({ reply: resposta }, { status: 200 })
  } catch (erro) {
    console.error('Erro na API de chat:', erro)
    
    return NextResponse.json(
      { 
        error: 'Desculpe, não foi possível processar sua mensagem no momento. Por favor, tente novamente.',
        details: process.env.NODE_ENV === 'development' ? erro.message : undefined
      }, 
      { status: 500 }
    )
  }
}