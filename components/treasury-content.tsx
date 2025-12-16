"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, Building2, ArrowLeftRight, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function TreasuryContent() {
  const { toast } = useToast()
  const [bankAccounts, setBankAccounts] = useState([
    {
      name: "BCA - Account 1234567",
      type: "Checking",
      balance: 485000000,
      currency: "IDR",
      lastUpdated: "2024-01-15 09:30",
      status: "active",
    },
    {
      name: "Mandiri - Account 9876543",
      type: "Checking",
      balance: 325000000,
      currency: "IDR",
      lastUpdated: "2024-01-15 09:25",
      status: "active",
    },
    {
      name: "BNI - Account 5554321",
      type: "Savings",
      balance: 150000000,
      currency: "IDR",
      lastUpdated: "2024-01-15 09:20",
      status: "active",
    },
    {
      name: "Petty Cash - Office",
      type: "Cash",
      balance: 15000000,
      currency: "IDR",
      lastUpdated: "2024-01-15 08:00",
      status: "active",
    },
  ])

  const [recentReconciliations, setRecentReconciliations] = useState([
    {
      account: "BCA - 1234567",
      date: "2024-01-14",
      transactions: 45,
      matched: 43,
      unmatched: 2,
      status: "pending",
    },
    {
      account: "Mandiri - 9876543",
      date: "2024-01-14",
      transactions: 28,
      matched: 28,
      unmatched: 0,
      status: "completed",
    },
    {
      account: "BNI - 5554321",
      date: "2024-01-13",
      transactions: 12,
      matched: 12,
      unmatched: 0,
      status: "completed",
    },
  ])

  const [scheduledTransfers, setScheduledTransfers] = useState([
    {
      from: "BCA - 1234567",
      to: "Mandiri - 9876543",
      amount: 50000000,
      date: "2024-01-16",
      purpose: "Monthly Operating Transfer",
      status: "scheduled",
    },
    {
      from: "BCA - 1234567",
      to: "Petty Cash",
      amount: 10000000,
      date: "2024-01-16",
      purpose: "Petty Cash Replenishment",
      status: "scheduled",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedRecon, setSelectedRecon] = useState<any>(null)
  const [transferForm, setTransferForm] = useState({
    from: "",
    to: "",
    amount: "",
    date: "",
    purpose: "",
  })

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)

  const handleRefreshBalance = async () => {
    setIsRefreshing(true)
    console.log("[v0] Refreshing bank balances...")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedAccounts = bankAccounts.map((acc) => ({
      ...acc,
      lastUpdated: new Date().toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      balance: acc.balance + Math.floor(Math.random() * 1000000) - 500000,
    }))

    setBankAccounts(updatedAccounts)
    setIsRefreshing(false)

    toast({
      title: "Saldo Berhasil Diperbarui",
      description: "Semua saldo rekening telah diperbarui dari bank",
    })
  }

  const handleTransferSubmit = async () => {
    if (!transferForm.from || !transferForm.to || !transferForm.amount) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] Processing transfer:", transferForm)

    const newTransfer = {
      from: transferForm.from,
      to: transferForm.to,
      amount: Number.parseFloat(transferForm.amount),
      date: transferForm.date || new Date().toISOString().split("T")[0],
      purpose: transferForm.purpose || "Fund Transfer",
      status: "scheduled",
    }

    setScheduledTransfers([newTransfer, ...scheduledTransfers])
    setShowTransferDialog(false)
    setTransferForm({ from: "", to: "", amount: "", date: "", purpose: "" })

    toast({
      title: "Transfer Dijadwalkan",
      description: `Transfer ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(newTransfer.amount)} berhasil dijadwalkan`,
    })
  }

  const handleViewDetails = (recon: any) => {
    setSelectedRecon(recon)
    setShowViewDialog(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Kas & Bank</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Kelola rekening bank dan posisi kas perusahaan
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={handleRefreshBalance}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Saldo"}
          </Button>
          <Button className="gap-2" onClick={() => setShowTransferDialog(true)}>
            <ArrowLeftRight className="h-4 w-4" />
            Transfer Dana
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-[var(--color-primary)] to-blue-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="h-6 w-6" />
          <h3 className="text-sm font-medium opacity-90">Total Saldo Kas & Bank</h3>
        </div>
        <div className="text-4xl font-bold mb-1">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(totalBalance)}
        </div>
        <p className="text-sm opacity-80">Across {bankAccounts.length} accounts</p>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rekening Bank & Kas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {bankAccounts.map((account, index) => (
            <Card key={index} className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    {account.type === "Cash" ? (
                      <Wallet className="h-5 w-5 text-[var(--color-primary)]" />
                    ) : (
                      <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{account.name}</h4>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{account.type}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--color-success)]/20 text-[var(--color-success)]">
                  Active
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[var(--color-muted-foreground)]">Saldo</span>
                  <span className="text-2xl font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(account.balance)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-[var(--color-muted-foreground)]">
                  <span>Last updated</span>
                  <span>{account.lastUpdated}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rekonsiliasi Bank Terkini</h3>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Rekening</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Tanggal</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Total Transaksi</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Matched</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Unmatched</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {recentReconciliations.map((recon, index) => (
                  <tr key={index} className="hover:bg-[var(--color-surface-hover)]">
                    <td className="px-4 py-3 text-sm font-medium">{recon.account}</td>
                    <td className="px-4 py-3 text-sm">{recon.date}</td>
                    <td className="px-4 py-3 text-center text-sm">{recon.transactions}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-[var(--color-success)]">{recon.matched}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`text-sm font-medium ${recon.unmatched > 0 ? "text-[var(--color-warning)]" : "text-[var(--color-muted-foreground)]"}`}
                      >
                        {recon.unmatched}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          recon.status === "completed"
                            ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                            : "bg-[var(--color-warning)]/20 text-[var(--color-warning)]"
                        }`}
                      >
                        {recon.status === "completed" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {recon.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant="ghost" onClick={() => handleViewDetails(recon)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Transfer Terjadwal</h3>
        <Card className="divide-y divide-[var(--color-border)]">
          {scheduledTransfers.map((transfer, index) => (
            <div key={index} className="p-4 hover:bg-[var(--color-surface-hover)] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <ArrowLeftRight className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{transfer.from}</span>
                      <span className="text-[var(--color-muted-foreground)]">→</span>
                      <span className="text-sm font-medium">{transfer.to}</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{transfer.purpose}</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-lg font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(transfer.amount)}
                    </div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">{transfer.date}</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transfer Dana</DialogTitle>
            <DialogDescription>Buat transfer antar rekening atau jadwalkan transfer di masa depan</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="from-account">Dari Rekening</Label>
              <Select
                value={transferForm.from}
                onValueChange={(value) => setTransferForm({ ...transferForm, from: value })}
              >
                <SelectTrigger id="from-account">
                  <SelectValue placeholder="Pilih rekening sumber" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccounts.map((acc, idx) => (
                    <SelectItem key={idx} value={acc.name}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="to-account">Ke Rekening</Label>
              <Select
                value={transferForm.to}
                onValueChange={(value) => setTransferForm({ ...transferForm, to: value })}
              >
                <SelectTrigger id="to-account">
                  <SelectValue placeholder="Pilih rekening tujuan" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccounts.map((acc, idx) => (
                    <SelectItem key={idx} value={acc.name}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Jumlah</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={transferForm.amount}
                onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal Transfer</Label>
              <Input
                id="date"
                type="date"
                value={transferForm.date}
                onChange={(e) => setTransferForm({ ...transferForm, date: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purpose">Tujuan Transfer</Label>
              <Textarea
                id="purpose"
                placeholder="Masukkan keterangan..."
                value={transferForm.purpose}
                onChange={(e) => setTransferForm({ ...transferForm, purpose: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleTransferSubmit}>Jadwalkan Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Rekonsiliasi</DialogTitle>
            <DialogDescription>Informasi lengkap rekonsiliasi bank</DialogDescription>
          </DialogHeader>

          {selectedRecon && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Rekening</Label>
                  <p className="font-medium mt-1">{selectedRecon.account}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tanggal</Label>
                  <p className="font-medium mt-1">{selectedRecon.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Total Transaksi</Label>
                  <p className="font-medium mt-1 text-2xl">{selectedRecon.transactions}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Matched</Label>
                  <p className="font-medium mt-1 text-2xl text-success">{selectedRecon.matched}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Unmatched</Label>
                  <p className="font-medium mt-1 text-2xl text-warning">{selectedRecon.unmatched}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Status</Label>
                <p className="font-medium mt-1 capitalize">{selectedRecon.status}</p>
              </div>

              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-2 block">Transaksi yang Belum Match</Label>
                {selectedRecon.unmatched > 0 ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Transfer ke Vendor ABC</span>
                      <span className="font-medium">Rp 2,500,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Pembayaran Invoice #INV-001</span>
                      <span className="font-medium">Rp 1,250,000</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Semua transaksi sudah match</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Tutup
            </Button>
            <Button>Proses Rekonsiliasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
