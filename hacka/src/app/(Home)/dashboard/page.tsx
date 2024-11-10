"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, Users, Scissors, Utensils, Car, Briefcase, Package, GraduationCap, PiggyBank, Target, Trophy, Star } from "lucide-react";

const URL = process.env.NEXT_PUBLIC_URL;

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
    const iconProps = { className: "h-8 w-8 text-white" };
    switch (type.toLowerCase()) {
      case "cartão de crédito": return <CreditCard {...iconProps} />;
      case "empréstimo bancário": return <Banknote {...iconProps} />;
      case "financiamento veicular": return <Car {...iconProps} />;
      case "empréstimo pessoal": return <Users {...iconProps} />;
      case "consórcio de imóvel": return <Package {...iconProps} />;
      case "dívida de educação": return <GraduationCap {...iconProps} />;
      case "reforma residencial": return <Briefcase {...iconProps} />;
      case "dívida médica": return <Scissors {...iconProps} />;
      default: return <PiggyBank {...iconProps} />;
    }
  };

  const toggleExpand = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Opção 1</li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Opção 2</li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Opção 3</li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 ml-64 p-8">
        <div className="container p-20 space-y-10 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 min-h-screen">
          <h1 className="text-4xl font-bold text-center text-blue-600 animate-pulse mb-6">
            Sua Jornada para a Liberdade Financeira
          </h1>

          {/* Card de Progresso */}
          <Card className="border-blue-400 shadow-2xl overflow-hidden rounded-xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Seu Progresso</h2>
                  <p className="text-xl">Resumo das suas pendências financeiras</p>
                </div>
                <Trophy className="h-16 w-16 text-yellow-300" />
              </div>
            </div>
            <CardContent className="pt-6">
              <Progress value={50} className="h-6 mb-4" />
              <p className="text-lg font-semibold text-center text-blue-700">
                Você está no caminho certo! Continue assim!
              </p>
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
                {data?.pendingItems?.length > 0 ? (
                  data.pendingItems.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-semibold"
                        onClick={() => toggleExpand(`pendencia-${index}`)}
                      >
                        <span className="flex items-center">
                          <span className="bg-blue-500 p-2 rounded-full mr-3">
                            {getIcon(item.name)}
                          </span>
                          {item.name}
                        </span>
                        <Badge variant="secondary">R$ {item.amount.toFixed(2)}</Badge>
                      </Button>
                      {expandedSection === `pendencia-${index}` && (
                        <p className="mt-2 text-gray-600 pl-14">
                          Parcelas: {item.installments}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Nenhuma pendência encontrada.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Sua Jornada Financeira</h3>
            <p className="text-lg text-gray-600 mb-6">Cada passo conta. Continue focado e celebre cada vitória!</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-blue-600 hover:to-purple-700 transition duration-300">
              Comece Sua Próxima Missão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
