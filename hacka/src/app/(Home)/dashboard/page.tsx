"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, Banknote, Users, Scissors, Utensils, Car, 
  Briefcase, Package, GraduationCap, PiggyBank, Target, Trophy, Star 
} from "lucide-react"

const Dashboard = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${URL}/v1/user/pendency`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const getIcon = (type: string) => {
    const iconProps = { className: "h-8 w-8 text-white" }
    switch (type) {
      case "Cartão de crédito": return <CreditCard {...iconProps} />
      case "Empréstimo bancário": return <Banknote {...iconProps} />
      case "Dívida pessoal com um amigo": return <Users {...iconProps} />
      case "Lazer e entretenimento": return <Scissors {...iconProps} />
      case "Alimentação fora de casa": return <Utensils {...iconProps} />
      case "Transporte": return <Car {...iconProps} />
      case "Trabalho freelance": return <Briefcase {...iconProps} />
      case "Venda de itens usados": return <Package {...iconProps} />
      case "Aulas particulares": return <GraduationCap {...iconProps} />
      default: return <PiggyBank {...iconProps} />
    }
  };

  const toggleExpand = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container p-20 space-y-10 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 min-h-screen min-w-full">
      <h1 className="text-4xl font-bold text-center text-blue-600 animate-pulse mb-6">Sua Jornada para a Liberdade Financeira</h1>

      {/* Card de Progresso */}
      <Card className="border-blue-400 shadow-2xl overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Seu Progresso</h2>
              <p className="text-xl">{data.estimativa_de_tempo_para_quitar_dividas}</p>
            </div>
            <Trophy className="h-16 w-16 text-yellow-300" />
          </div>
        </div>
        <CardContent className="pt-6">
          <Progress value={66} className="h-6 mb-4" />
          <p className="text-lg font-semibold text-center text-blue-700">Você já está 66% do caminho! Continue assim!</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plano de Ação */}
        <Card className="border-green-300 shadow-2xl overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white rounded-t-xl">
            <h2 className="text-2xl font-semibold mb-2 flex items-center">
              <Target className="h-8 w-8 mr-2" />
              Plano de Ação
            </h2>
            <p>Seus próximos passos para o sucesso financeiro</p>
          </div>
          <CardContent className="pt-6">
            {data.prioridades_de_pagamento.map((item, index) => (
              <div key={index} className="mb-4">
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-semibold"
                  onClick={() => toggleExpand(`prioridade-${index}`)}
                >
                  <span className="flex items-center">
                    <span className="bg-blue-500 p-2 rounded-full mr-3">
                      {getIcon(item.tipo)}
                    </span>
                    {item.tipo}
                  </span>
                  <Badge variant="secondary">R$ {item.valor.toFixed(2)}</Badge>
                </Button>
                {expandedSection === `prioridade-${index}` && (
                  <p className="mt-2 text-gray-600 pl-14">{item.justificativa}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dicas de Ouro */}
      <Card className="border-orange-300 shadow-2xl overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <Star className="h-8 w-8 mr-2" />
            Dicas de Ouro para o Sucesso Financeiro
          </h2>
          <p>Hábitos que transformarão sua vida financeira</p>
        </div>
        <CardContent className="pt-6">
          <ul className="space-y-4">
            {data.dicas_de_controle_financeiro.map((dica, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-yellow-500 p-2 rounded-full mr-3 flex-shrink-0">
                  <PiggyBank className="h-6 w-6 text-white" />
                </span>
                <p className="text-gray-700">{dica}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">Sua Jornada Financeira</h3>
        <p className="text-lg text-gray-600 mb-6">Cada passo conta. Continue focado e celebre cada vitória!</p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
          Comece Sua Próxima Missão
        </Button>
      </div>
    </div>
  )
}

export default Dashboard;
