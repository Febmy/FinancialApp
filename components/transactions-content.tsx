"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, Download, Upload, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { getTransactions, addTransaction, type Transaction } from "@/lib/data-store"

export function TransactionsContent() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const updateTransactions = () => {
      setTransactions(getTransactions())
    }

    updateTransactions()
    const interval = setInterval(updateTransactions, 2000)
    return () => clearInterval(interval)
  }, [])

  const filteredTransactions = transactions.filter((trx) => {
    const matchesSearch =
      trx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchQuery.toLowerCase())
    const typeMatch =
      filterType === "all" ||
      (filterType === "Cash In" && trx.type === "income") ||
      (filterType === "Cash Out" && trx.type === "expense")
    return matchesSearch && typeMatch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Transaksi Harian</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Kelola semua transaksi keuangan perusahaan
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Transaksi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Transaksi Baru</DialogTitle>
              </DialogHeader>
              <TransactionForm onClose={() => setIsAddOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <Input
              placeholder="Cari transaksi, referensi, atau deskripsi..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipe Transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="Cash In">Cash In</SelectItem>
                <SelectItem value="Cash Out">Cash Out</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="this-month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="this-week">Minggu Ini</SelectItem>
                <SelectItem value="this-month">Bulan Ini</SelectItem>
                <SelectItem value="last-month">Bulan Lalu</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">ID Transaksi</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Tanggal</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Tipe</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Kategori</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Deskripsi</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Akun</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Jumlah</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-[var(--color-surface-hover)] cursor-pointer transition-colors">
                  <td className="px-4 py-3 text-sm font-mono">{trx.id}</td>
                  <td className="px-4 py-3 text-sm">{trx.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {trx.type === "income" ? (
                        <ArrowDownCircle className="h-4 w-4 text-[var(--color-success)]" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-[var(--color-danger)]" />
                      )}
                      <span className="text-sm">{trx.type === "income" ? "Cash In" : "Cash Out"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{trx.category}</td>
                  <td className="px-4 py-3 text-sm">{trx.description}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-muted-foreground)]">{trx.account}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        trx.type === "income" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                      }`}
                    >
                      {trx.type === "income" ? "+" : "-"}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(trx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-success)]/20 text-[var(--color-success)]">
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function TransactionForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    description: "",
    amount: "",
    account: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      type: formData.type === "cash-in" ? ("income" as const) : ("expense" as const),
      amount: Number.parseFloat(formData.amount),
      status: "completed" as const,
      account: formData.account,
      reference: formData.reference,
    }

    addTransaction(transaction)
    console.log("[v0] Transaction saved:", transaction)

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipe Transaksi</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash-in">Cash In (Penerimaan)</SelectItem>
              <SelectItem value="cash-out">Cash Out (Pengeluaran)</SelectItem>
              <SelectItem value="transfer">Transfer Antar Akun</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Tanggal Transaksi</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue (Pendapatan)</SelectItem>
              <SelectItem value="cogs">COGS (HPP)</SelectItem>
              <SelectItem value="operational">Operational (Operasional)</SelectItem>
              <SelectItem value="salary">Salary (Gaji)</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="investment">Investment (Investasi)</SelectItem>
              <SelectItem value="loan">Loan (Pinjaman)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account">Akun/Rekening</Label>
          <Select value={formData.account} onValueChange={(value) => setFormData({ ...formData, account: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih akun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bca">BCA - 1234567</SelectItem>
              <SelectItem value="mandiri">Mandiri - 9876543</SelectItem>
              <SelectItem value="bni">BNI - 5554321</SelectItem>
              <SelectItem value="cash">Kas (Cash)</SelectItem>
              <SelectItem value="petty-cash">Petty Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (IDR)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Transaksi</Label>
        <Input
          id="description"
          placeholder="Contoh: Pembayaran Invoice #INV-001"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference">No. Referensi (Opsional)</Label>
        <Input
          id="reference"
          placeholder="Contoh: INV-2024-001, PO-2024-045"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
        <Textarea
          id="notes"
          placeholder="Catatan atau keterangan tambahan..."
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit">Simpan Transaksi</Button>
      </div>
    </form>
  )
}
