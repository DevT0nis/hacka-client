'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react'

interface Divida {
  valor: string
  prazo: string
  taxaJuros: string
}

interface FormularioData {
  rendaMensal: string
  gastosFixes: string
  gastosVariaveis: string
  dividas: Divida[]
  objetivoPagamento: string
  prazoPagamento: string
}

const etapas = [
  { titulo: 'Renda Mensal', descricao: 'Informe sua renda mensal total' },
  { titulo: 'Gastos Fixos', descricao: 'Informe seus gastos fixos mensais' },
  { titulo: 'Gastos Variáveis', descricao: 'Informe seus gastos variáveis mensais' },
  { titulo: 'Dívidas', descricao: 'Informe suas dívidas atuais' },
  { titulo: 'Objetivo', descricao: 'Qual seu objetivo de pagamento?' },
  { titulo: 'Prazo', descricao: 'Em quanto tempo deseja quitar suas dívidas?' },
]

export default function FormularioPlanejamentoFinanceiro() {
  const [etapaAtual, setEtapaAtual] = useState(0)
  const [formData, setFormData] = useState<FormularioData>({
    rendaMensal: '',
    gastosFixes: '',
    gastosVariaveis: '',
    dividas: [{ valor: '', prazo: '', taxaJuros: '' }],
    objetivoPagamento: '',
    prazoPagamento: '',
  })
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleInputChange = (campo: string, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  const handleDividaChange = (index: number, campo: keyof Divida, valor: string) => {
    const novasDividas = [...formData.dividas]
    novasDividas[index][campo] = valor
    setFormData(prev => ({ ...prev, dividas: novasDividas }))
  }

  const adicionarDivida = () => {
    setFormData(prev => ({
      ...prev,
      dividas: [...prev.dividas, { valor: '', prazo: '', taxaJuros: '' }]
    }))
  }

  const removerDivida = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dividas: prev.dividas.filter((_, i) => i !== index)
    }))
  }

  const validarEtapa = () => {
    switch (etapaAtual) {
      case 0:
        return !!formData.rendaMensal
      case 1:
        return !!formData.gastosFixes
      case 2:
        return !!formData.gastosVariaveis
      case 3:
        return formData.dividas.every(d => d.valor && d.prazo && d.taxaJuros)
      case 4:
        return !!formData.objetivoPagamento
      case 5:
        return !!formData.prazoPagamento
      default:
        return false
    }
  }

  const avancarEtapa = () => {
    if (validarEtapa()) {
      if (etapaAtual < etapas.length - 1) {
        setEtapaAtual(prev => prev + 1)
      } else {
        enviarFormulario()
      }
    }
  }

  const voltarEtapa = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(prev => prev - 1)
    }
  }

  const enviarFormulario = async () => {
    setCarregando(true)
    try {
      const resposta = await fetch('/api/agent_planejador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const dados = await resposta.json()
      if (resposta.ok) {
        router.push('/dashboard')
      } else {
        throw new Error(dados.erro || 'Erro ao processar o plano financeiro')
      }
    } catch (erro) {
      console.error('Erro ao enviar formulário:', erro)
      // Aqui você pode adicionar uma notificação de erro para o usuário
    } finally {
      setCarregando(false)
    }
  }

  const renderEtapa = () => {
    switch (etapaAtual) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="rendaMensal">Renda Mensal</Label>
            <Input
              id="rendaMensal"
              type="number"
              value={formData.rendaMensal}
              onChange={(e) => handleInputChange('rendaMensal', e.target.value)}
              placeholder="R$ 0,00"
              className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="gastosFixes">Gastos Fixos Mensais</Label>
            <Input
              id="gastosFixes"
              type="number"
              value={formData.gastosFixes}
              onChange={(e) => handleInputChange('gastosFixes', e.target.value)}
              placeholder="R$ 0,00"
              className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="gastosVariaveis">Gastos Variáveis Mensais</Label>
            <Input
              id="gastosVariaveis"
              type="number"
              value={formData.gastosVariaveis}
              onChange={(e) => handleInputChange('gastosVariaveis', e.target.value)}
              placeholder="R$ 0,00"
              className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label>Dívidas</Label>
            {formData.dividas.map((divida, index) => (
              <div key={index} className="space-y-2 p-4 bg-orange-100 rounded-lg">
                <Input
                  type="number"
                  value={divida.valor}
                  onChange={(e) => handleDividaChange(index, 'valor', e.target.value)}
                  placeholder="Valor da dívida"
                  className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <Input
                  type="text"
                  value={divida.prazo}
                  onChange={(e) => handleDividaChange(index, 'prazo', e.target.value)}
                  placeholder="Prazo (ex: 12 meses)"
                  className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <Input
                  type="number"
                  value={divida.taxaJuros}
                  onChange={(e) => handleDividaChange(index, 'taxaJuros', e.target.value)}
                  placeholder="Taxa de juros (%)"
                  className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                />
                {index > 0 && (
                  <Button type="button" variant="destructive" onClick={() => removerDivida(index)} className="bg-red-500 hover:bg-red-600">
                    <Minus className="mr-2 h-4 w-4" /> Remover Dívida
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={adicionarDivida} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Dívida
            </Button>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="objetivoPagamento">Objetivo de Pagamento</Label>
            <Input
              id="objetivoPagamento"
              value={formData.objetivoPagamento}
              onChange={(e) => handleInputChange('objetivoPagamento', e.target.value)}
              placeholder="Ex: Quitar todas as dívidas"
              className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <Label htmlFor="prazoPagamento">Prazo Desejado para Pagamento</Label>
            <Input
              id="prazoPagamento"
              value={formData.prazoPagamento}
              onChange={(e) => handleInputChange('prazoPagamento', e.target.value)}
              placeholder="Ex: 24 meses"
              className="text-lg bg-orange-50 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardTitle className="text-3xl font-bold">Planejamento Financeiro</CardTitle>
        <CardDescription className="text-lg text-orange-100">
          {etapas[etapaAtual].descricao}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={etapaAtual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderEtapa()}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between bg-orange-50 p-4">
        <Button onClick={voltarEtapa} disabled={etapaAtual === 0} className="bg-orange-300 text-orange-800 hover:bg-orange-400">
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <Button
          onClick={avancarEtapa}
          disabled={!validarEtapa() || carregando}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {etapaAtual === etapas.length - 1 ? (
            carregando ? 'Processando...' : 'Finalizar'
          ) : (
            <>
              Próximo
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
      <div className="flex justify-center mt-4 pb-4">
        {etapas.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === etapaAtual ? 'bg-orange-500' : 'bg-orange-200'
            }`}
            animate={{
              scale: index === etapaAtual ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </Card>
  )
}

