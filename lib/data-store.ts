"use client"

// Simple in-memory data store for demo purposes
// In production, this would be replaced with actual database calls

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: "income" | "expense"
  amount: number
  status: "completed" | "pending" | "cancelled"
  account?: string
  reference?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  issueDate: string
  dueDate: string
  amount: number
  status: "paid" | "unpaid" | "overdue" | "partial"
  aging: number
}

export interface Bill {
  id: string
  billNumber: string
  vendor: string
  issueDate: string
  dueDate: string
  amount: number
  status: "paid" | "unpaid" | "overdue" | "partial"
  aging: number
}

// Mock data
let transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-12-16",
    description: "Penjualan Produk A",
    category: "Pendapatan",
    type: "income",
    amount: 15000000,
    status: "completed",
    account: "Bank BCA",
  },
  {
    id: "2",
    date: "2024-12-15",
    description: "Bayar Gaji Karyawan",
    category: "Gaji",
    type: "expense",
    amount: 25000000,
    status: "completed",
    account: "Bank Mandiri",
  },
  {
    id: "3",
    date: "2024-12-14",
    description: "Pembelian Bahan Baku",
    category: "Operasional",
    type: "expense",
    amount: 8500000,
    status: "completed",
    account: "Bank BCA",
  },
]

let invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customer: "PT. Maju Jaya",
    issueDate: "2024-12-01",
    dueDate: "2024-12-31",
    amount: 25000000,
    status: "unpaid",
    aging: 15,
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customer: "CV. Sukses Bersama",
    issueDate: "2024-11-15",
    dueDate: "2024-12-15",
    amount: 15000000,
    status: "overdue",
    aging: 31,
  },
]

let bills: Bill[] = [
  {
    id: "1",
    billNumber: "BILL-2024-001",
    vendor: "PT. Supplier Indo",
    issueDate: "2024-12-01",
    dueDate: "2024-12-31",
    amount: 18000000,
    status: "unpaid",
    aging: 15,
  },
  {
    id: "2",
    billNumber: "BILL-2024-002",
    vendor: "CV. Partner Jaya",
    issueDate: "2024-11-20",
    dueDate: "2024-12-20",
    amount: 12000000,
    status: "overdue",
    aging: 26,
  },
]

// Transaction CRUD
export function getTransactions(): Transaction[] {
  return transactions
}

export function addTransaction(transaction: Omit<Transaction, "id">): Transaction {
  const newTransaction: Transaction = {
    ...transaction,
    id: String(Date.now()),
  }
  transactions = [newTransaction, ...transactions]
  return newTransaction
}

export function updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
  const index = transactions.findIndex((t) => t.id === id)
  if (index === -1) return null

  transactions[index] = { ...transactions[index], ...updates }
  return transactions[index]
}

export function deleteTransaction(id: string): boolean {
  const index = transactions.findIndex((t) => t.id === id)
  if (index === -1) return false

  transactions.splice(index, 1)
  return true
}

// Invoice CRUD
export function getInvoices(): Invoice[] {
  return invoices
}

export function addInvoice(invoice: Omit<Invoice, "id">): Invoice {
  const newInvoice: Invoice = {
    ...invoice,
    id: String(Date.now()),
  }
  invoices = [newInvoice, ...invoices]
  return newInvoice
}

// Bill CRUD
export function getBills(): Bill[] {
  return bills
}

export function addBill(bill: Omit<Bill, "id">): Bill {
  const newBill: Bill = {
    ...bill,
    id: String(Date.now()),
  }
  bills = [newBill, ...bills]
  return newBill
}

// Summary calculations
export function getCashFlowSummary() {
  const income = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    income,
    expense,
    netCashFlow: income - expense,
  }
}

export function getReceivablesSummary() {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const unpaid = invoices.filter((inv) => inv.status === "unpaid" || inv.status === "overdue").length

  return { total, unpaid }
}

export function getPayablesSummary() {
  const total = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const unpaid = bills.filter((bill) => bill.status === "unpaid" || bill.status === "overdue").length

  return { total, unpaid }
}
