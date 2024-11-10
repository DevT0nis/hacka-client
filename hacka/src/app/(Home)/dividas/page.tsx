'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {  DollarSign, CreditCard, Wallet, PiggyBank } from "lucide-react"

const expensesData = [
  { category: 'Moradia', amount: 500, color: '#ec4899' },
  { category: 'Transporte', amount: 220, color: '#3b82f6' },
  { category: 'Alimentação', amount: 550, color: '#eab308' },
  { category: 'Lazer', amount: 290, color: '#06b6d4' },
  { category: 'Saúde', amount: 80, color: '#a855f7' },
  { category: 'Outros', amount: 360, color: '#64748b' },
]

export default function Component() {
  return (
    <div className="p-4 space-y-6 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Financeiro de Carlos</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-green-400 text-2xl font-bold">R$ 5.000,00</div>
            <p className="text-xs text-zinc-500">+2% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Gastos do Mês</CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className=" text-red-400 text-2xl font-bold">R$ 2.000,00</div>
            <p className="text-xs text-zinc-500">-5% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Economia</CardTitle>
            <PiggyBank className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className=" text-green-400 text-2xl font-bold">R$ 3.200,00</div>
            <p className="text-xs text-zinc-500">42% da meta para fundo de emergência</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Score de Crédito</CardTitle>
            <Wallet className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-zinc-400 text-2xl font-bold">650</div>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Contas a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { name: "Contribuição Familiar", value: 500.00, dueDate: "2024-11-05", status: "pending" },
                { name: "Empréstimo Pessoal", value: 250.00, dueDate: "2024-11-15", status: "pending" },
                { name: "Bilhete de Transporte", value: 220.00, dueDate: "2024-11-01", status: "paid" },
                { name: "Plano de Celular", value: 60.00, dueDate: "2024-11-10", status: "pending" },
                { name: "Academia", value: 80.00, dueDate: "2024-11-05", status: "paid" },
              ].map((bill, index) => (
                <li key={index} className="flex text-zinc-400 items-center justify-between p-3 bg-zinc-800 rounded-lg">
                  <div>
                    <p className="font-medium">{bill.name}</p>
                    <p className="text-sm text-zinc-400">Vencimento: {new Date(bill.dueDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {bill.value.toFixed(2)}</p>
                    <Button size="sm" variant={bill.status === 'paid' ? 'secondary' : 'default'} className="mt-2 " disabled={bill.status === 'paid'}>
                      {bill.status === 'paid' ? 'Pago' : 'Pagar'}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Empréstimo Pessoal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-lg font-semibold text-zinc-400">Curso Profissionalizante</p>
                  <p className="text-sm text-zinc-400">Empréstimo Pessoal</p>
                </div>
                <p className="text-xl font-bold text-blue-500">R$ 3.200,00</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-zinc-400" >
                  <span>Progresso</span>
                  <span>11 de 24 parcelas</span>
                </div>
                <Progress value={45.83} className="h-2" />
              </div>
              <p className="text-sm text-zinc-400">Próximo pagamento: R$ 250,00 em 15/11/2024</p>
              <div className="pt-4">
                <p className="text-sm font-semibold mb-2 text-zinc-400">Detalhes do Empréstimo</p>
                <ul className="text-sm space-y-1 text-zinc-400">
                  <li>Taxa de Juros: 25% ao ano</li>
                  <li>Valor Original: R$ 5.000,00</li>
                  <li>Prazo Total: 24 meses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Gastos do Mês - Novembro 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`R$ ${value}`, 'Valor']}
                />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {expensesData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full " style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-400">{item.category}</span>
                </div>
                <span className="text-zinc-400">R$ {item.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}