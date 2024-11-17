'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, CheckCircle, DollarSign, TrendingUp, AlertCircle, Printer, Edit3, Sun, Moon } from 'lucide-react'
import { useTheme } from "next-themes"

interface DadosUsuario {
  rendaMensal: string;
  gastosFixes: string;
  gastosVariaveis: string;
  dividas: Array<{
    valor: string;
    prazo: string;
    taxaJuros: string;
  }>;
  objetivoPagamento: string;
  prazoPagamento: string;
}

interface PlanoFinanceiro {
  prioridades_de_pagamento: Array<{
    tipo_divida: string;
    valor: number;
    justificativa: string;
  }>;
  estrategias_para_aumentar_pagamento_mensal: Array<{
    estrategia: string;
    descricao: string;
    potencial_aumento: number;
  }>;
  estimativa_de_tempo_para_quitar_dividas: {
    cenario_otimista: string;
    cenario_realista: string;
    cenario_pessimista: string;
  };
  proximos_passos: Array<{
    acao: string;
    prazo: string;
    impacto_esperado: string;
  }>;
}

interface DadosFinanceiros {
  dadosUsuario: DadosUsuario;
  planoGeradoPelaIA: {
    plano: string;
  };
}

async function obterDadosFinanceiros(): Promise<DadosFinanceiros | null> {
  try {
    const resposta = await fetch('/planos_financeiros/plano_financeiro.txt')
    if (!resposta.ok) throw new Error('Falha ao buscar dados')
    const dados = await resposta.json()
    return dados
  } catch (erro) {
    console.error('Erro ao ler os dados financeiros:', erro)
    return null
  }
}

export default function PainelFinanceiro() {
  const [dadosFinanceiros, setDadosFinanceiros] = useState<DadosFinanceiros | null>(null)
  const [planoFinanceiro, setPlanoFinanceiro] = useState<PlanoFinanceiro | null>(null)
  const [carregando, setCarregando] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    obterDadosFinanceiros().then(dados => {
      if (dados) {
        setDadosFinanceiros(dados)
        try {
          const planoString = dados.planoGeradoPelaIA.plano
          const jsonMatch = planoString.match(/```json\n([\s\S]*?)\n```/)
          if (jsonMatch && jsonMatch[1]) {
            const planoObj = JSON.parse(jsonMatch[1])
            setPlanoFinanceiro(planoObj)
          }
        } catch (erro) {
          console.error('Erro ao processar o plano:', erro)
        }
      }
      setCarregando(false)
    })
  }, [])

  if (carregando) {
    return <EstadoCarregando />
  }

  if (!dadosFinanceiros || !planoFinanceiro) {
    return <EstadoVazio />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-orange-50">
      <div className="container mx-auto p-4 space-y-6">
        <header className="text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Seu Plano de Ação Financeiro</h1>
          <p className="mt-2 text-orange-100">
            Renda Mensal: R$ {dadosFinanceiros.dadosUsuario.rendaMensal} | 
            Gastos Fixos: R$ {dadosFinanceiros.dadosUsuario.gastosFixes}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <PrioridadesPagamento prioridades={planoFinanceiro.prioridades_de_pagamento} />
          <EstrategiasAumentoPagamento estrategias={planoFinanceiro.estrategias_para_aumentar_pagamento_mensal} />
        </div>

        <EstimativaTempo estimativas={planoFinanceiro.estimativa_de_tempo_para_quitar_dividas} />
        <ProximosPassos passos={planoFinanceiro.proximos_passos} />

        <div className="flex justify-center mt-8 space-x-4">
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <a href="/editar-plano"><Edit3 className="mr-2 h-4 w-4" /> Editar Plano</a>
          </Button>
          <Button onClick={() => window.print()} variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-100 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900">
            <Printer className="mr-2 h-4 w-4" /> Imprimir Plano
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full bg-orange-100 dark:bg-zinc-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

function PrioridadesPagamento({ prioridades }: { prioridades: PlanoFinanceiro['prioridades_de_pagamento'] }) {
  if (!prioridades || prioridades.length === 0) {
    return <SecaoIndisponivel titulo="Prioridades de Pagamento" />
  }

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-600 dark:text-orange-400">
          <DollarSign className="mr-2" />
          Prioridades de Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {prioridades.map((prioridade, index) => (
            <li key={index} className="bg-orange-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{prioridade.tipo_divida}</span>
                <span className="text-orange-600 dark:text-orange-400">R$ {prioridade.valor.toFixed(2)}</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{prioridade.justificativa}</p>
              <Progress value={((index + 1) / prioridades.length) * 100} className="mt-2 bg-orange-200 dark:bg-orange-700" indicatorClassName="bg-orange-600 dark:bg-orange-400" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function EstrategiasAumentoPagamento({ estrategias }: { estrategias: PlanoFinanceiro['estrategias_para_aumentar_pagamento_mensal'] }) {
  if (!estrategias || estrategias.length === 0) {
    return <SecaoIndisponivel titulo="Estratégias para Aumentar Pagamentos" />
  }

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-600 dark:text-orange-400">
          <TrendingUp className="mr-2" />
          Estratégias para Aumentar Pagamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {estrategias.map((estrategia, index) => (
            <li key={index} className="bg-orange-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400">{estrategia.estrategia}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{estrategia.descricao}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium">Aumento potencial:</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">R$ {estrategia.potencial_aumento.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function EstimativaTempo({ estimativas }: { estimativas: PlanoFinanceiro['estimativa_de_tempo_para_quitar_dividas'] }) {
  if (!estimativas) {
    return <SecaoIndisponivel titulo="Estimativa de Tempo para Quitar Dívidas" />
  }

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-600 dark:text-orange-400">Estimativa de Tempo para Quitar Dívidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(estimativas).map(([cenario, tempo]) => (
            <div key={cenario} className="bg-orange-100 dark:bg-zinc-700 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold capitalize text-orange-600 dark:text-orange-400">{cenario.replace('_', ' ')}</h3>
              <p className="text-2xl font-bold mt-2">{tempo}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ProximosPassos({ passos }: { passos: PlanoFinanceiro['proximos_passos'] }) {
  if (!passos || passos.length === 0) {
    return <SecaoIndisponivel titulo="Próximos Passos" />
  }

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-600 dark:text-orange-400">Próximos Passos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {passos.map((passo, index) => (
            <li key={index} className="flex items-start bg-orange-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <CheckCircle className="mr-2 mt-1 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="font-semibold text-orange-600 dark:text-orange-400">{passo.acao}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Prazo: {passo.prazo}</p>
                <p className="text-sm mt-1">Impacto esperado: <span className="text-orange-600 dark:text-orange-400">{passo.impacto_esperado}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SecaoIndisponivel({ titulo }: { titulo: string }) {
  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-orange-600 dark:text-orange-400">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center text-zinc-600 dark:text-zinc-300">
          <AlertCircle className="mr-2" />
          <p>Informações não disponíveis para esta seção.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function EstadoVazio() {
  return (
    <div className="container mx-auto p-4 text-center min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">Nenhum plano financeiro encontrado</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-4">Parece que você ainda não criou um plano financeiro.</p>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <a href="/planejamento">Criar Plano Financeiro</a>
        </Button>
      </div>
    </div>
  )
}

function EstadoCarregando() {
  return (
    <div className="container mx-auto p-4 text-center min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">Carregando seu plano financeiro...</h2>
        <div className="flex space-x-4 justify-center">
          <Skeleton className="h-12 w-12 rounded-full bg-orange-200 dark:bg-zinc-700" />
          <Skeleton className="h-12 w-12 rounded-full bg-orange-200 dark:bg-zinc-700" />
          <Skeleton className="h-12 w-12 rounded-full bg-orange-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  )
}