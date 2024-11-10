"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  PieChart,
  ArrowLeftRight,
  Home,
  CalendarClock,
  PlusCircle,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Início", icon: Home, href: "/inicio" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Dívidas", icon: PieChart, href: "/dividas" },
  { name: "Transações", icon: ArrowLeftRight, href: "/transacoes" },
  { name: "Planejamento", icon: CalendarClock, href: "/planejamento" },
];

const transactionTypes = [
  { value: "transfer", label: "Transferência", icon: ArrowLeftRight },
  { value: "income", label: "Receita", icon: TrendingUp },
  { value: "expense", label: "Despesa", icon: TrendingDown },
  { value: "card", label: "Despesa Cartão", icon: CreditCard },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const lightModeStyles = {
    primaryGradientFrom: "#7c3aed",
    primaryGradientTo: "#3b82f6",
    background: "#f8fafc",
    textPrimary: "#0f172a",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    highlightBackground: "#faf5ff",
    highlightText: "#7c3aed",
    inputBackground: "#ffffff",
    buttonBackground: "#7c3aed",
    buttonHoverOpacity: "0.90"
  };

  const darkModeStyles = {
    primaryGradientFrom: "#7c3aed",
    primaryGradientTo: "#3b82f6",
    backgroundFrom: "#0f172a",
    backgroundTo: "#1e293b",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#1e293b",
    highlightBackground: "#4c1d95",
    highlightText: "#7c3aed",
    inputBackground: "#0f172a",
    buttonBackground: "#7c3aed",
    buttonHoverOpacity: "0.90"
  };

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex flex-col h-screen",
        collapsed ? "w-20" : "w-64",
        "overflow-hidden absolute z-10 fixed"
      )}
      style={{
        borderRight: `1px solid ${theme === 'dark' ? darkModeStyles.border : lightModeStyles.border}`,
        background: theme === 'dark' ? `linear-gradient(to bottom, ${darkModeStyles.backgroundFrom}, ${darkModeStyles.backgroundTo})` : lightModeStyles.background
      }}
    >
      <div
        className="flex items-center justify-between p-4"
        style={{
          borderBottom: `1px solid ${theme === 'dark' ? darkModeStyles.border : lightModeStyles.border}`,
        }}
      >
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme === 'dark' ? darkModeStyles.primaryGradientFrom : lightModeStyles.primaryGradientFrom}, ${theme === 'dark' ? darkModeStyles.primaryGradientTo : lightModeStyles.primaryGradientTo})`,
                  }}
                />
                <span
                  className="text-xl font-bold"
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? darkModeStyles.primaryGradientFrom : lightModeStyles.primaryGradientFrom}, ${theme === 'dark' ? darkModeStyles.primaryGradientTo : lightModeStyles.primaryGradientTo})`,
                  }}
                >
                  Quita.AI
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            style={{
              color: theme === 'dark' ? darkModeStyles.textSecondary : lightModeStyles.textSecondary
            }}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: theme === 'dark' ? darkModeStyles.textSecondary : lightModeStyles.textSecondary
            }}
          >
            <ChevronRight size={20} className={cn("transition-transform", collapsed ? "rotate-180" : "")} />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
                style={{
                  color: pathname === item.href ? theme === 'dark' ? darkModeStyles.highlightText : lightModeStyles.highlightText : theme === 'dark' ? darkModeStyles.textSecondary : lightModeStyles.textSecondary,
                  backgroundColor: pathname === item.href ? theme === 'dark' ? darkModeStyles.highlightBackground : lightModeStyles.highlightBackground : 'transparent'
                }}
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
              className="w-full px-3 py-2"
              style={{
                backgroundColor: theme === 'dark' ? darkModeStyles.inputBackground : lightModeStyles.inputBackground,
                color: theme === 'dark' ? darkModeStyles.textPrimary : lightModeStyles.textPrimary,
                borderColor: theme === 'dark' ? darkModeStyles.border : lightModeStyles.border,
              }}
            >
              {collapsed ? (
                <PlusCircle size={20} />
              ) : (
                <SelectValue placeholder="Adicionar" />
              )}
            </SelectTrigger>
            <SelectContent
              className="bg-popover"
              style={{
                backgroundColor: theme === 'dark' ? darkModeStyles.backgroundFrom : lightModeStyles.background,
                borderColor: theme === 'dark' ? darkModeStyles.border : lightModeStyles.border,
              }}
            >
              <SelectGroup>
                <SelectLabel
                  className="text-muted-foreground"
                  style={{
                    color: theme === 'dark' ? darkModeStyles.textSecondary : lightModeStyles.textSecondary,
                  }}
                >
                  Adicionar Transação
                </SelectLabel>
                {transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
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
            className="p-4"
            style={{
              borderTop: `1px solid ${theme === 'dark' ? darkModeStyles.border : lightModeStyles.border}`,
            }}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                <AvatarFallback style={{ backgroundColor: theme === 'dark' ? darkModeStyles.highlightBackground : lightModeStyles.highlightBackground, color: theme === 'dark' ? darkModeStyles.textPrimary : lightModeStyles.textPrimary }}>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium" style={{ color: theme === 'dark' ? darkModeStyles.textPrimary : lightModeStyles.textPrimary }}>João Silva</p>
                <p className="text-xs" style={{ color: theme === 'dark' ? darkModeStyles.textSecondary : lightModeStyles.textSecondary }}>joao@exemplo.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};