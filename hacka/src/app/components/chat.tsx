"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { CloudIcon } from "./CloudIcon";
import ReactMarkdown from "react-markdown";

interface Mensagem {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isPartial?: boolean;
}

export default function PaginaChat() {
  const [entradaUsuario, setEntradaUsuario] = useState("");
  const [historicoChat, setHistoricoChat] = useState<Mensagem[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [estaAberto, setEstaAberto] = useState(false);

  const refAreaRolagem = useRef<HTMLDivElement>(null);
  const refAreaTexto = useRef<HTMLTextAreaElement>(null);

  const formatarHora = () => {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const enviarMensagemEmPartes = async (mensagemCompleta: string) => {
    const palavras = mensagemCompleta.split(" ");
    let mensagemParcial = "";
    let indice = 0;

    const adicionarPalavra = () => {
      if (indice < palavras.length) {
        mensagemParcial += (indice > 0 ? " " : "") + palavras[indice];
        setHistoricoChat((prev) => {
          const novoHistorico = [...prev];
          if (novoHistorico[novoHistorico.length - 1].role === "assistant") {
            novoHistorico[novoHistorico.length - 1] = {
              ...novoHistorico[novoHistorico.length - 1],
              content: mensagemParcial,
              isPartial: indice < palavras.length - 1,
            };
          } else {
            novoHistorico.push({
              role: "assistant",
              content: mensagemParcial,
              timestamp: formatarHora(),
              isPartial: indice < palavras.length - 1,
            });
          }
          return novoHistorico;
        });
        indice++;
        setTimeout(adicionarPalavra, Math.random() * 30 + 10); // Reduced interval for smoother animation
      }
    };

    adicionarPalavra();
  };

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!entradaUsuario.trim() || estaCarregando) return;

    setEstaCarregando(true);

    try {
      const novaMensagemUsuario: Mensagem = {
        role: "user",
        content: entradaUsuario,
        timestamp: formatarHora(),
      };

      setHistoricoChat((prev) => [...prev, novaMensagemUsuario]);
      setEntradaUsuario("");

      const resposta = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensagens: historicoChat,
          mensagem: entradaUsuario,
        }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status}`);
      }

      const dados = await resposta.json();

      if (dados.erro) {
        throw new Error(dados.erro);
      }

      // Inicia o envio da mensagem em partes
      enviarMensagemEmPartes(dados.resposta);
    } catch (erro) {
      console.error("Erro:", erro);
      setHistoricoChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
          timestamp: formatarHora(),
        },
      ]);
    } finally {
      setEstaCarregando(false);
    }
  };

  useEffect(() => {
    if (refAreaRolagem.current) {
      refAreaRolagem.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [historicoChat]);

  useEffect(() => {
    if (refAreaTexto.current) {
      refAreaTexto.current.style.height = "auto";
      refAreaTexto.current.style.height = `${refAreaTexto.current.scrollHeight}px`;
    }
  }, [entradaUsuario]);

  const renderizarMensagem = (conteudo: string, isPartial: boolean = false) => {
    return (
      <div className="relative">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="mb-2 font-poppins">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-4 mb-2 font-poppins">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-4 mb-2 font-poppins">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="mb-1 font-poppins">{children}</li>
            ),
            h1: ({ children }) => (
              <h1 className="text-xl font-bold mb-2 font-poppins">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-bold mb-2 font-poppins">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-bold mb-2 font-poppins">
                {children}
              </h3>
            ),
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <pre className="bg-gray-100 dark:bg-gray-800 rounded p-2 mb-2 overflow-x-auto font-poppins">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code
                  className="bg-gray-100 dark:bg-gray-800 rounded px-1 font-poppins"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {conteudo}
        </ReactMarkdown>
        {isPartial && (
          <motion.div
            className="absolute bottom-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <span className="inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <>
      <Sheet open={estaAberto} onOpenChange={setEstaAberto}>
        <SheetTrigger asChild>
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              className="w-16 h-16 p-0 shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 rounded-full z-50"
              onClick={() => setEstaAberto(true)}
            >
              <CloudIcon />
              <span className="sr-only">Abrir chat</span>
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] md:w-[540px] p-0 "
        >
          <Card className="h-full flex flex-col rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardTitle className="text-xl font-bold">
                Tire suas dúvidas com o Toni, nosso agente especialista em
                finanças!
              </CardTitle>
  
            </CardHeader>
            <CardContent className="flex-grow flex flex-col pt-4 overflow-hidden">
              <ScrollArea className="flex-grow pr-4 mb-4">
                <AnimatePresence>
                  {historicoChat.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center text-muted-foreground py-8 font-poppins"
                    >
                      Comece uma conversa enviando uma mensagem...
                    </motion.div>
                  ) : (
                    historicoChat.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-3 mb-4 font-poppins ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <Avatar>
                            <AvatarImage
                              src="/bot-avatar.png"
                              alt="Assistente"
                            />
                            <AvatarFallback>T</AvatarFallback>
                          </Avatar>
                        )}
                        <motion.div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {msg.role === "assistant" ? (
                            renderizarMensagem(msg.content, msg.isPartial)
                          ) : (
                            <p className="text-sm font-poppins">{msg.content}</p>
                          )}
                          <span className="text-xs opacity-70 mt-1 block font-poppins">
                            {msg.timestamp}
                          </span>
                        </motion.div>
                        {msg.role === "user" && (
                          <Avatar>
                            <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-full font-poppins">
                              <User className="h-6 w-6 text-gray-500 font-poppins" />
                            </div>
                          </Avatar>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                <div ref={refAreaRolagem} />
              </ScrollArea>
              <form onSubmit={enviarMensagem} className="flex gap-2">
                <Textarea
                  ref={refAreaTexto}
                  value={entradaUsuario}
                  onChange={(e) => setEntradaUsuario(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="min-h-[60px] max-h-[120px] resize-none font-poppins"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      enviarMensagem(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={estaCarregando || !entradaUsuario.trim()}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {estaCarregando ? (
                    <motion.div
                      className="rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="sr-only">Enviar mensagem</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </>
  );
}
