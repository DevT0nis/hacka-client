"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LayoutDashboard,
  ArrowLeftRight,
  CalendarClock,
  PlusCircle,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  LogOut,
  Home,
  PieChart,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [ { name: "Início", icon: Home, href: "/inicio" }, { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }, { name: "Dívidas", icon: PieChart, href: "/dividas" }, { name: "Transações", icon: ArrowLeftRight, href: "/transacoes" }, { name: "Planejamento", icon: CalendarClock, href: "/planejamento" }, ]; 

const transactionTypes = [ { value: "transfer", label: "Transferência", icon: ArrowLeftRight }, { value: "income", label: "Receita", icon: TrendingUp }, { value: "expense", label: "Despesa", icon: TrendingDown }, { value: "card", label: "Despesa Cartão", icon: CreditCard }, ];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex flex-col h-screen",
        collapsed ? "w-20" : "w-64",
        "overflow-hidden fixed z-10 bg-zinc-900 border-r border-zinc-800"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <span className="text-xl font-bold text-white">Quita.AI</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <ChevronRight size={20} className={cn("transition-transform", collapsed ? "rotate-180" : "")} />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <item.icon size={20} />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
        <div className="p-2">
          <Select>
            <SelectTrigger
              className="w-full px-3 py-2 bg-zinc-800 text-zinc-300 border-zinc-700"
            >
              {collapsed ? (
                <PlusCircle size={20} />
              ) : (
                <SelectValue placeholder="Nova Transação" />
              )}
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectGroup>
                <SelectLabel className="text-zinc-500">
                  Adicionar Transação
                </SelectLabel>
                {transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-zinc-300">
                    <div className="flex items-center space-x-2">
                      <type.icon size={18} />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ScrollArea>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="p-4 border-t border-zinc-800"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/time/marcelo.jpeg" alt="Carlos" />
                <AvatarFallback className="bg-zinc-800 text-zinc-300">CO</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-zinc-300">Marcelo Aggio</p>
                <p className="text-xs text-zinc-500">marceloaggio@yahoo.com</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              <LogOut size={16} className="mr-2" />
              <Link href="/">
              Sair
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}