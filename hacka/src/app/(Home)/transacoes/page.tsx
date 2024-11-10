'use client'

import { useState } from 'react'
import { format, subMonths } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowUpDown, Search, AlertTriangle } from 'lucide-react'

// Define the Transaction interface
interface Transaction {
  id: number
  date: string
  description: string
  category: string
  amount: number
  type: 'entrada' | 'saída'
}

// Define the SortColumn type
type SortColumn = 'date' | 'description' | 'amount'

// Sample transaction data
const generateTransactions = (count: number): Transaction[] => {
  const categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação']
  const types: Transaction['type'][] = ['entrada', 'saída']
  const transactions: Transaction[] = []

  for (let i = 0; i < count; i++) {
    const date = subMonths(new Date(), Math.floor(Math.random() * 12))
    transactions.push({
      id: i + 1,
      date: format(date, 'dd/MM/yyyy'),
      description: `Transação ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: parseFloat((Math.random() * 1000).toFixed(2)),
      type: types[Math.floor(Math.random() * types.length)],
    })
  }

  return transactions
}

const transactions: Transaction[] = generateTransactions(50)

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<SortColumn>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const itemsPerPage = 10

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filterCategory === 'all' || transaction.category === filterCategory) &&
      (filterType === 'all' || transaction.type === filterType) &&
      (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm))
    )
  })

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    let aValue: string | number | Date = a[sortColumn]
    let bValue: string | number | Date = b[sortColumn]

    // If sorting by date, parse the date strings into Date objects
    if (sortColumn === 'date') {
      aValue = new Date(a.date.split('/').reverse().join('-')) // Convert 'dd/MM/yyyy' to 'yyyy-MM-dd'
      bValue = new Date(b.date.split('/').reverse().join('-'))
    }

    // Compare based on type
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime()
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    }

    return 0
  })

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  const handleSort = (column: SortColumn) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-white">
      <Card className="bg-zinc-900 border-zinc-800 mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-100">Transações de Carlos</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-red-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className='text-zinc-50'>Alerta de Gastos</AlertTitle>
            <AlertDescription className='text-zinc-50'>
              Carlos, seus gastos com transporte estão acima do normal. Considere alternativas mais econômicas para reduzir essas despesas e economizar.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Label htmlFor="search" className="sr-only">Buscar</Label>
              <Input
                id="search"
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Button variant="outline" size="icon" className="shrink-0">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-50">
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="Alimentação">Alimentação</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Lazer">Lazer</SelectItem>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px] bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-50">
                  <SelectItem value="all">Todos Tipos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saída">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-zinc-800 text-zinc-100">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('date')}>
                      Data
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('description')}>
                      Descrição
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('amount')}>
                      Valor
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">R$ {transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className={transaction.type === 'entrada' ? 'text-green-500' : 'text-red-500'}>
                      {transaction.type === 'entrada' ? 'Receita' : 'Despesa'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-zinc-50">
            <p className="text-sm text-zinc-400">
              Exibindo {paginatedTransactions.length} de {sortedTransactions.length} transações
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50 text-zinc-50 ' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className='bg-zinc-900'
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            * As transações exibidas são dos últimos 12 meses. Para acessar transações mais antigas, entre em contato com o suporte.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
