'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { PlayCircle, Newspaper, ExternalLink, TrendingUp, DollarSign, PiggyBank, Moon, Sun } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"

// Define your FeedItem types here or import them if defined elsewhere
interface ArticleItem {
  type: 'article';
  title: string;
  description: string;
  link: string;
  date: string;
  icon: typeof PiggyBank | typeof TrendingUp | typeof DollarSign;
  color: string;
  author: string;
  authorAvatar: string;
}

interface VideoItem {
  type: 'video';
  title: string;
  channelName: string;
  videoId: string;
  thumbnail: string;
  views: string;
  duration: string;
}

interface NewsItem {
  type: 'news';
  title: string;
  source: string;
  link: string;
  date: string;
}

type FeedItem = ArticleItem | VideoItem | NewsItem;
const feedItems: FeedItem[] = [
  {
    type: 'article',
    title: "10 Dicas para Economizar Dinheiro no Dia a Dia",
    description: "Aprenda estratégias simples para reduzir gastos e aumentar suas economias.",
    link: "https://www.infomoney.com.br/minhas-financas/10-dicas-para-economizar-dinheiro-no-dia-a-dia/",
    date: "2024-03-15",
    icon: PiggyBank,
    color: "bg-pink-500",
    author: "Ana Silva",
    authorAvatar: "/placeholder.svg?height=40&width=40"
  },
  {
    type: 'video',
    title: "10 dicas para se organizar financeiramente em 2024!",
    channelName: "Nath Finanças",
    videoId: "jvJBjO24PVs",
    thumbnail: "https://img.youtube.com/vi/jvJBjO24PVs/maxresdefault.jpg",
    views: "250K",
    duration: "15:30"
  },
  {
    type: 'news',
    title: "Banco Central mantém taxa de juros em 11,75% ao ano",
    source: "G1 Economia",
    link: "https://g1.globo.com/economia/noticia/2024/03/20/copom-mantem-taxa-basica-de-juros-em-1175percent-ao-ano.ghtml",
    date: "2024-03-20"
  },
  {
    type: 'article',
    title: "Investimentos para Iniciantes: Por Onde Começar",
    description: "Um guia completo para quem quer começar a investir com segurança.",
    link: "https://www.btgpactual.com/blog/investimentos/guia-de-investimentos-para-iniciantes",
    date: "2024-03-10",
    icon: TrendingUp,
    color: "bg-green-500",
    author: "Carlos Mendes",
    authorAvatar: "/placeholder.svg?height=40&width=40"
  },
  {
    type: 'video',
    title: "COMO MONTAR UMA CARTEIRA DE FUNDOS IMOBILIÁRIOS (COM R$1.000)",
    channelName: "Primo Rico",
    videoId: "gOuYvRw5kE4",
    thumbnail: "https://img.youtube.com/vi/gOuYvRw5kE4/maxresdefault.jpg",
    views: "500K",
    duration: "12:45"
  },
  {
    type: 'news',
    title: "Inflação fecha fevereiro em 0,83%, maior taxa para o mês desde 2016",
    source: "Valor Econômico",
    link: "https://valor.globo.com/brasil/noticia/2024/03/12/inflacao-oficial-fecha-fevereiro-em-083percent-maior-taxa-para-o-mes-desde-2016.ghtml",
    date: "2024-03-12"
  },
  {
    type: 'article',
    title: "Como Criar um Orçamento Pessoal Efetivo",
    description: "Passo a passo para elaborar e manter um orçamento que funcione para você.",
    link: "https://www.serasa.com.br/ensina/dicas/como-fazer-orcamento-pessoal/",
    date: "2024-03-05",
    icon: DollarSign,
    color: "bg-blue-500",
    author: "Mariana Costa",
    authorAvatar: "/placeholder.svg?height=40&width=40"
  },
  {
    type: 'video',
    title: "TUDO O QUE VOCÊ PRECISA PRA COMEÇAR A INVESTIR! com pouco ou muito dinheiro! #NathMeAjuda #63",
    channelName: "Me Poupe!",
    videoId: "t0RzA9-9RX0",
    thumbnail: "https://img.youtube.com/vi/t0RzA9-9RX0/maxresdefault.jpg",
    views: "750K",
    duration: "18:20"
  },
  {
    type: 'news',
    title: "Governo anuncia novo programa de incentivo à poupança para jovens",
    source: "Folha de São Paulo",
    link: "https://www1.folha.uol.com.br/mercado/2024/03/governo-anuncia-programa-de-incentivo-a-poupanca-para-jovens.shtml",
    date: "2024-03-18"
  }
]

export default function VibrantHomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen w-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 ">
        <header className="sticky bg-white dark:bg-zinc-900 shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-around items-center">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Blog Quita.AI</h1>
            <Toggle aria-label="Toggle dark mode" pressed={isDarkMode} onPressedChange={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Toggle>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-8 ">
              {feedItems.map((item, index) => (
                <Card key={index} className="bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {item.type === 'article' && (
                    <>
                      <CardHeader className={`${item.color} text-white p-4`}>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={item.authorAvatar} alt={item.author} />
                            <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription className="text-gray-200">por {item.author}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                        <Button variant="outline" asChild>
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Ler artigo
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </>
                  )}
                  {item.type === 'video' && (
                    <>
                      <CardHeader className="p-0">
                        <img src={item.thumbnail} alt={item.title} className="w-full object-cover" />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">{item.channelName}</CardDescription>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{item.views} visualizações</span>
                          <span>{item.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 bg-gray-50 dark:bg-zinc-700">
                        <Button variant="outline" className="w-full" asChild>
                          <a href={`https://www.youtube.com/watch?v=${item.videoId}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                            Assistir no YouTube
                            <PlayCircle className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </>
                  )}
                  {item.type === 'news' && (
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Newspaper className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">Notícia</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fonte: {item.source}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                      </div>
                      <Button variant="link" asChild className="p-0 mt-2">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          Ler mais
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </main>


      </div>
    </div>
  );
}