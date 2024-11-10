'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { AlertCircle, CheckCircle } from "lucide-react"

// Esquema de validação com Zod
const debtSchema = z.object({
  valor: z.string().nonempty("Valor é obrigatório"),
  prazo: z.string()
    .nonempty("Prazo é obrigatório")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Prazo deve estar no formato yyyy-MM-dd"),
  taxaJuros: z.string().nonempty("Taxa de juros é obrigatória"),
})

const formSchema = z.object({
  dividas: z.array(debtSchema).min(1, "Pelo menos uma dívida deve ser adicionada"),
  rendaMensal: z.string().nonempty("Renda mensal é obrigatória"),
  gastosFixes: z.string().nonempty("Gastos fixos são obrigatórios"),
  gastosVariaveis: z.string().nonempty("Gastos variáveis são obrigatórios"),
  objetivoPagamento: z.string().nonempty("Objetivo de pagamento é obrigatório"),
  prazoPagamento: z.string()
    .nonempty("Prazo de pagamento é obrigatório")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Prazo de pagamento deve estar no formato yyyy-MM-dd"),
})

type FormData = z.infer<typeof formSchema>

export default function Component() {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dividas: [{ valor: '', prazo: '', taxaJuros: '' }],
      rendaMensal: '',
      gastosFixes: '',
      gastosVariaveis: '',
      objetivoPagamento: '',
      prazoPagamento: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dividas',
  })

  // Comentada a função de submissão original
  /*
  const onSubmit = async (data: FormData) => {
    console.log("Dados do formulário:", data) // Log para depuração
    try {
      const response = await fetch('/api/agent_planejador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.erro || 'Falha ao enviar o formulário')
      }

      const result = await response.json()
      console.log('Success:', result)
      setSuccess(true)
      setStep(4) // Move to the confirmation step
      setError(null)
    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.')
      setSuccess(false)
    }
  }
  */

  // Nova função para simular o submit e avançar para o passo de sucesso
  const handleFinalizar = () => {
    // Ignora a lógica de submissão e define o estado de sucesso
    setSuccess(true)
    setStep(4) // Move para a etapa de confirmação
    setError(null)
  }

  const addDebt = () => {
    append({ valor: '', prazo: '', taxaJuros: '' })
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
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`dividas.${index}.valor`}
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
                    name={`dividas.${index}.prazo`}
                    render={({ field }) => {
                      console.log(`Valor do prazo da dívida ${index + 1}:`, field.value) // Log
                      return (
                        <FormItem>
                          <FormLabel>Prazo</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`dividas.${index}.taxaJuros`}
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
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Remover Dívida
                  </Button>
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
                name="rendaMensal"
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
                name="gastosFixes"
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
                name="gastosVariaveis"
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
                name="objetivoPagamento"
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
                name="prazoPagamento"
                render={({ field }) => {
                  console.log("Valor do prazoPagamento:", field.value) // Log
                  return (
                    <FormItem>
                      <FormLabel>Prazo Desejado</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Anterior
              </Button>
              {/* Alterado o tipo e a função para ignorar o submit */}
              <Button type="button" onClick={handleFinalizar}>
                Finalizar
              </Button>
            </DialogFooter>
          </DialogContent>
        )
      case 4:
        return (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmação</DialogTitle>
              <DialogDescription>
                {success ? 'Seu plano de acesso foi criado com sucesso!' : 'Houve um problema ao criar seu plano de acesso.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {success ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Sucesso</AlertTitle>
                  <AlertDescription>
                    Seu plano de acesso foi criado com sucesso. Por favor, verifique o plano de ação na aba de dashboard.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>
                    Houve um problema ao criar seu plano de acesso. Por favor, tente novamente mais tarde.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Fechar</Button>
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
