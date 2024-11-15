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
import { LayoutDashboard, ArrowLeftRight, CalendarClock, PlusCircle, CreditCard, TrendingUp, TrendingDown, ChevronRight, LogOut, Home, PieChart, Sun, Moon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"

const menuItems = [
  { name: "Início", icon: Home, href: "/inicio" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Dívidas", icon: PieChart, href: "/dividas" },
  { name: "Transações", icon: ArrowLeftRight, href: "/transacoes" },
  { name: "Planejamento", icon: CalendarClock, href: "/planejamento" },
]

const mobileMenuItems = [
  { name: "Início", icon: Home, href: "/inicio" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Dívidas", icon: PieChart, href: "/dividas" },
  { name: "Transações", icon: ArrowLeftRight, href: "/transacoes" },
]

const transactionTypes = [
  { value: "transfer", label: "Transferência", icon: ArrowLeftRight },
  { value: "income", label: "Receita", icon: TrendingUp },
  { value: "expense", label: "Despesa", icon: TrendingDown },
  { value: "card", label: "Despesa Cartão", icon: CreditCard },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setCollapsed(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setTheme(isDarkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [setTheme])

  if (!mounted) {
    return null
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("darkMode", (newTheme === "dark").toString())
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const isDarkMode = theme === 'dark'

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg",
          isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
        )}
      >
        <nav className="flex items-center justify-around h-16 px-4">
          {mobileMenuItems.map((item, index) => (
            <Link key={item.name} href={item.href}>
              <div className="flex flex-col items-center gap-1">
                <item.icon
                  size={24}
                  className={cn(
                    "transition-colors",
                    index === 0 ? "text-orange-600" : isDarkMode ? "text-zinc-400" : "text-zinc-600"
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    index === 0 ? "text-orange-600" : isDarkMode ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
          <button className="relative -top-6" aria-label="Adicionar nova transação">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-600 text-white shadow-lg">
              <PlusCircle size={24} />
            </div>
          </button>
        </nav>
      </motion.div>
    )
  }

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex flex-col overflow-hidden fixed z-10 top-0 left-0 h-screen border-r",
        isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
      )}
    >
      <div className={cn(
        "flex items-center justify-between p-4 border-b",
        isDarkMode ? "border-zinc-800" : "border-zinc-200"
      )}>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600" />
                <span className={cn(
                  "text-xl font-bold",
                  isDarkMode ? "text-white" : "text-zinc-900"
                )}>Quita.AI</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "hover:bg-zinc-100",
            isDarkMode ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900"
          )}
          aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          <ChevronRight
            size={20}
            className={cn("transition-transform", collapsed ? "rotate-180" : "")}
          />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                  isDarkMode
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                )}
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
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
              "w-full justify-start",
              isDarkMode
                ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            )}
          >
            {isDarkMode ? (
              <>
                <Sun size={20} className="mr-2" />
                {!collapsed && <span>Modo Claro</span>}
              </>
            ) : (
              <>
                <Moon size={20} className="mr-2" />
                {!collapsed && <span>Modo Escuro</span>}
              </>
            )}
          </Button>
        </div>
        <div className="p-2">
          <Select>
            <SelectTrigger className={cn(
              "w-full px-3 py-2",
              isDarkMode
                ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                : "bg-zinc-100 text-zinc-700 border-zinc-200"
            )}>
              {collapsed ? (
                <PlusCircle size={20} />
              ) : (
                <SelectValue placeholder="Nova Transação" />
              )}
            </SelectTrigger>
            <SelectContent className={cn(
              isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
            )}>
              <SelectGroup>
                <SelectLabel className={isDarkMode ? "text-zinc-500" : "text-zinc-700"}>
                  Adicionar Transação
                </SelectLabel>
                {transactionTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}
                  >
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
            className={cn(
              "p-4 border-t",
              isDarkMode ? "border-zinc-800" : "border-zinc-200"
            )}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/time/marcelo.jpeg" alt="Marcelo" />
                <AvatarFallback className={cn(
                  isDarkMode ? "bg-zinc-800 text-zinc-300" : "bg-zinc-200 text-zinc-700"
                )}>
                  MA
                </AvatarFallback>
              </Avatar>
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-zinc-300" : "text-zinc-700"
                )}>Marcelo Aggio</p>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-zinc-500" : "text-zinc-600"
                )}>marceloaggio@yahoo.com</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className={cn(
                "w-full mt-2",
                isDarkMode
                  ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              )}
            >
              <LogOut size={16} className="mr-2" />
              <Link href="/">Sair</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}