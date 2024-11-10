'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const debtSchema = z.object({
  value: z.string(),
  dueDate: z.string(),
  interestRate: z.string(),
})

const formSchema = z.object({
  debts: z.array(debtSchema),
  monthlyIncome: z.string(),
  fixedExpenses: z.string(),
  variableExpenses: z.string(),
  paymentGoal: z.string(),
  paymentDeadline: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function Component() {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)
  const [debts, setDebts] = useState<Array<{ value: string; dueDate: string; interestRate: string }>>([])
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debts: [],
      monthlyIncome: '',
      fixedExpenses: '',
      variableExpenses: '',
      paymentGoal: '',
      paymentDeadline: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/agent_planejador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      console.log('Success:', result)
      setOpen(false)
      setError(null)
    } catch (error) {
      console.error('Error:', error)
      setError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.')
    }
  }

  const addDebt = () => {
    setDebts([...debts, { value: '', dueDate: '', interestRate: '' }])
  }

  const startPlanning = () => {
    setStep(1)
    setOpen(true)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Planejamento Financeiro</DialogTitle>
              <DialogDescription>
                Vamos começar seu planejamento financeiro personalizado.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Button onClick={startPlanning}>Começar Planejamento</Button>
            </div>
          </DialogContent>
        )
      case 1:
        return (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dívidas</DialogTitle>
              <DialogDescription>
                Informe os detalhes das suas dívidas atuais
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {debts.map((_, index) => (
                <div key={index} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`debts.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Dívida {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="R$ 0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`debts.${index}.dueDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prazo</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`debts.${index}.interestRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00%" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addDebt}>
                Adicionar Dívida
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setStep(2)}>Próximo</Button>
            </DialogFooter>
          </DialogContent>
        )
      case 2:
        return (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Renda e Gastos</DialogTitle>
              <DialogDescription>
                Informe sua renda mensal e gastos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renda Mensal</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fixedExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gastos Fixos</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variableExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gastos Variáveis</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Anterior
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Próximo
              </Button>
            </DialogFooter>
          </DialogContent>
        )
      case 3:
        return (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Metas de Pagamento</DialogTitle>
              <DialogDescription>
                Defina suas metas de pagamento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="paymentGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Limpar nome, quitar cartão..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo Desejado</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Anterior
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Finalizar
              </Button>
            </DialogFooter>
          </DialogContent>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Iniciar Planejamento Financeiro</Button>
      </DialogTrigger>
      <Form {...form}>
        <form className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {renderStep()}
        </form>
      </Form>
    </Dialog>
  )
}