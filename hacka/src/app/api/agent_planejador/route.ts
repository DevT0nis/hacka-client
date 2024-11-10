import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Groq } from 'groq-sdk';
import fs from 'fs/promises';
import path from 'path';

interface Divida {
  valor: string;
  prazo: string;
  taxaJuros: string;
}

interface SolicitacaoPlanejamentoFinanceiro {
  dividas: Divida[];
  rendaMensal: string;
  gastosFixes: string;
  gastosVariaveis: string;
  objetivoPagamento: string;
  prazoPagamento: string;
}

export async function POST(request: NextRequest) {
  // Inicializa o cliente Groq dentro da função handler
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const dados: SolicitacaoPlanejamentoFinanceiro = await request.json();

    // Valida os dados recebidos
    if (!dados || !Array.isArray(dados.dividas) || dados.dividas.length === 0) {
      return NextResponse.json(
        {
          erro: 'Dados inválidos. Certifique-se de que "dividas" é um array não vazio.',
        },
        { status: 400 }
      );
    }

    // Calcula o total da dívida
    const dividaTotal = dados.dividas.reduce((acc, divida) => {
      const valor = parseFloat(divida.valor);
      return isNaN(valor) ? acc : acc + valor;
    }, 0);

    // Calcula a renda disponível mensal
    const rendaMensal = parseFloat(dados.rendaMensal) || 0;
    const gastosFixes = parseFloat(dados.gastosFixes) || 0;
    const gastosVariaveis = parseFloat(dados.gastosVariaveis) || 0;
    const rendaDisponivel = rendaMensal - gastosFixes - gastosVariaveis;

    const prompt = `
Você é um consultor financeiro especializado em auxiliar pessoas a saírem da inadimplência e quitarem dívidas de forma eficaz. Sua missão é criar um plano de ação detalhado e motivador, em formato JSON, para ajudar essa pessoa a organizar suas finanças, eliminar suas dívidas e melhorar o controle financeiro.

Utilize os dados fornecidos para desenvolver uma abordagem personalizada, incluindo:
1. Estratégias que priorizam o pagamento das dívidas
2. Recomendações práticas para corte de despesas
3. Sugestões para aumentar a renda
4. Dicas de educação financeira

O plano deve ser realista, prático e inspirador, considerando os objetivos e limitações apresentados.

Dados fornecidos:

Renda mensal: R$ ${dados.rendaMensal}
Despesas mensais fixas: R$ ${dados.gastosFixes}
Despesas mensais variáveis: R$ ${dados.gastosVariaveis}
Valor total das dívidas: R$ ${dividaTotal.toFixed(2)}
Detalhamento das dívidas:
${dados.dividas
  .map(
    (divida, index) =>
      `${index + 1}. Dívida de R$ ${divida.valor} com taxa de juros de ${divida.taxaJuros}% ao mês e prazo de ${divida.prazo}`
  )
  .join('\n')}
Capacidade mensal de pagamento extra: R$ ${rendaDisponivel.toFixed(2)}
Objetivo: ${dados.objetivoPagamento}
Prazo desejado: ${dados.prazoPagamento}

Formato JSON esperado:

{
  "prioridades_de_pagamento": [
    {
      "tipo_divida": "string",
      "valor": number,
      "justificativa": "string"
    }
  ],
  "cortes_de_despesas_sugeridos": [
    {
      "categoria": "string",
      "valor_sugerido": number,
      "justificativa": "string"
    }
  ],
  "estrategias_para_aumentar_pagamento_mensal": [
    {
      "estrategia": "string",
      "descricao": "string",
      "potencial_aumento": number
    }
  ],
  "recomendacoes_renegociacao": [
    {
      "tipo_de_divida": "string",
      "recomendacao": "string",
      "economia_potencial": number
    }
  ],
  "dicas_de_controle_financeiro": [
    "string"
  ],
  "estimativa_de_tempo_para_quitar_dividas": {
    "cenario_otimista": "string",
    "cenario_realista": "string",
    "cenario_pessimista": "string"
  },
  "proximos_passos": [
    {
      "acao": "string",
      "prazo": "string",
      "impacto_esperado": "string"
    }
  ]
}

Instruções detalhadas:

1. Prioridades de pagamento: Analise cada dívida considerando sua taxa de juros, valor e prazo. Ordene-as por prioridade de pagamento, justificando cada escolha.

2. Cortes de despesas: Baseado nos gastos fixos e variáveis informados, sugira cortes específicos e realistas, explicando o impacto de cada um.

3. Estratégias para aumentar pagamentos: Proponha formas criativas e práticas para aumentar a renda ou reduzir despesas, estimando o potencial aumento nos pagamentos mensais.

4. Recomendações de renegociação: Para cada dívida, avalie a possibilidade de renegociação, sugerindo abordagens e estimando a economia potencial.

5. Dicas de controle financeiro: Forneça conselhos práticos e específicos para melhorar a gestão financeira diária e manter o foco no plano de pagamento.

6. Estimativa de tempo para quitação: Apresente três cenários (otimista, realista e pessimista) para a quitação total das dívidas, considerando as estratégias sugeridas.

7. Próximos passos: Detalhe as ações imediatas que o usuário deve tomar, incluindo prazos e o impacto esperado de cada ação.

Lembre-se: O plano deve ser motivador, realçando os benefícios a longo prazo da disciplina financeira e oferecendo encorajamento para superar desafios.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Você é um consultor financeiro especializado em ajudar pessoas a saírem das dívidas e melhorarem sua situação financeira.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 1,
      max_tokens: 8000,
      top_p: 1,
      stream: false,
      stop: null,
    });

    let planoFinanceiro;
    try {
      const conteudo = completion.choices[0]?.message?.content;
      if (conteudo) {
        // Tenta analisar o conteúdo como JSON
        planoFinanceiro = JSON.parse(conteudo);
      } else {
        throw new Error('Nenhum conteúdo recebido da API Groq');
      }
    } catch (erroAnalise) {
      console.error('Erro ao analisar resposta da API Groq:', erroAnalise);
      // Se a análise falhar, retorna o conteúdo bruto para depuração
      planoFinanceiro = {
        erro: 'Falha ao analisar resposta da IA',
        conteudoBruto: completion.choices[0]?.message?.content,
      };
    }

    if (!planoFinanceiro || typeof planoFinanceiro !== 'object') {
      planoFinanceiro = {
        erro: 'Resposta inválida da IA',
        conteudoBruto: completion.choices[0]?.message?.content,
      };
    }

    // Salva os dados em um arquivo de texto
    const nomeArquivo = `plano_financeiro_${Date.now()}.txt`;
    const caminhoArquivo = path.join(
      process.cwd(),
      'public',
      'planos_financeiros',
      nomeArquivo
    );

    await fs.mkdir(path.dirname(caminhoArquivo), { recursive: true });
    await fs.writeFile(
      caminhoArquivo,
      JSON.stringify({ dadosUsuario: dados, planoGeradoPelaIA: planoFinanceiro }, null, 2)
    );

    return NextResponse.json({ ...planoFinanceiro, nomeArquivo });
  } catch (erro: unknown) {
    console.error('Erro:', erro);
    let errorMessage: string;
    if (erro instanceof Error) {
      errorMessage = erro.message;
    } else {
      errorMessage = 'An unknown error occurred.';
    }
    return NextResponse.json(
      { erro: 'Falha ao processar o plano financeiro', detalhes: errorMessage },
      { status: 500 }
    );
  }
}
