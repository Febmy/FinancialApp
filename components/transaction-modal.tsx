"use client"

import type React from "react"
import { addTransaction } from "@/lib/data-store"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransactionModalProps {
  open: boolean
  onClose: () => void
}

export function TransactionModal({ open, onClose }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    type: "in",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    account: "",
  })

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transactionData = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      type: formData.type === "in" ? ("income" as const) : ("expense" as const),
      amount: Number.parseFloat(formData.amount),
      status: "completed" as const,
      account: formData.account,
    }

    addTransaction(transactionData)
    console.log("[v0] Transaction saved successfully:", transactionData)

    // Reset form
    setFormData({
      type: "in",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      account: "",
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-[var(--color-surface)] rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[var(--color-border)]">
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tambah Transaksi Baru</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipe Transaksi</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">Kas Masuk</SelectItem>
                <SelectItem value="out">Kas Keluar</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah (Rp)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Penjualan</SelectItem>
                <SelectItem value="cogs">COGS</SelectItem>
                <SelectItem value="salary">Gaji</SelectItem>
                <SelectItem value="operational">Operasional</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="tax">Pajak</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Akun Bank/Kas</Label>
            <Select value={formData.account} onValueChange={(value) => setFormData({ ...formData, account: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih akun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bca">BCA - 1234567890</SelectItem>
                <SelectItem value="mandiri">Mandiri - 9876543210</SelectItem>
                <SelectItem value="bni">BNI - 5555666677</SelectItem>
                <SelectItem value="cash">Kas Kecil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              placeholder="Keterangan transaksi..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
              Simpan Transaksi
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
