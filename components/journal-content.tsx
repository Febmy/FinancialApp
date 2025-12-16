"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, BookOpen, Download, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function JournalContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const journalEntries = [
    {
      id: "JE-2024-001",
      date: "2024-12-16",
      description: "Penjualan barang dagang",
      reference: "INV-2024-001",
      status: "posted",
      entries: [
        { account: "1010 - Bank BCA", debit: 15000000, credit: 0 },
        { account: "4000 - Pendapatan Penjualan", debit: 0, credit: 15000000 },
      ],
    },
    {
      id: "JE-2024-002",
      date: "2024-12-15",
      description: "Pembayaran gaji karyawan",
      reference: "PAY-2024-12",
      status: "posted",
      entries: [
        { account: "5000 - Beban Gaji", debit: 25000000, credit: 0 },
        { account: "1020 - Bank Mandiri", debit: 0, credit: 25000000 },
      ],
    },
    {
      id: "JE-2024-003",
      date: "2024-12-14",
      description: "Pembelian perlengkapan kantor",
      reference: "PO-2024-020",
      status: "draft",
      entries: [
        { account: "5100 - Beban Perlengkapan", debit: 5000000, credit: 0 },
        { account: "1010 - Bank BCA", debit: 0, credit: 5000000 },
      ],
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">General Journal</h1>
          <p className="text-muted-foreground">Record and manage journal entries</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reference</Label>
                    <Input placeholder="Reference number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Journal entry description" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Journal Lines</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Line
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                      <div className="col-span-6">Account</div>
                      <div className="col-span-3 text-right">Debit</div>
                      <div className="col-span-3 text-right">Credit</div>
                    </div>

                    {[1, 2].map((index) => (
                      <div key={index} className="grid grid-cols-12 gap-2">
                        <div className="col-span-6">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1010">1010 - Bank BCA</SelectItem>
                              <SelectItem value="4000">4000 - Pendapatan Penjualan</SelectItem>
                              <SelectItem value="5000">5000 - Beban Gaji</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Input type="number" placeholder="0" className="text-right" />
                        </div>
                        <div className="col-span-3">
                          <Input type="number" placeholder="0" className="text-right" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <span className="font-medium">Total:</span>
                    <div className="flex gap-8">
                      <span className="font-medium">Debit: Rp 0</span>
                      <span className="font-medium">Credit: Rp 0</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Post Entry</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Entries", value: "156", icon: BookOpen, color: "text-blue-500" },
          { label: "This Month", value: "24", icon: BookOpen, color: "text-green-500" },
          { label: "Draft", value: "3", icon: BookOpen, color: "text-orange-500" },
          { label: "Posted", value: "153", icon: BookOpen, color: "text-purple-500" },
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold mt-1">{item.value}</p>
                </div>
                <div className={`p-3 bg-surface rounded-lg ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Journal Entries Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Journal Entries</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journalEntries.map((entry) => {
              const totalDebit = entry.entries.reduce((sum, e) => sum + e.debit, 0)
              const totalCredit = entry.entries.reduce((sum, e) => sum + e.credit, 0)

              return (
                <div key={entry.id} className="p-4 border border-border rounded-lg hover:bg-surface/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-medium">{entry.id}</span>
                      <Badge variant={entry.status === "posted" ? "default" : "secondary"}>{entry.status}</Badge>
                      <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                  {entry.reference && <p className="text-sm text-muted-foreground mb-3">Ref: {entry.reference}</p>}

                  <div className="space-y-1">
                    {entry.entries.map((line, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 text-sm">
                        <div className="col-span-6 text-muted-foreground">{line.account}</div>
                        <div className="col-span-3 text-right font-medium">
                          {line.debit > 0 ? formatCurrency(line.debit) : "-"}
                        </div>
                        <div className="col-span-3 text-right font-medium">
                          {line.credit > 0 ? formatCurrency(line.credit) : "-"}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-3 pt-3 border-t border-border">
                    <div className="col-span-6 font-medium">Total</div>
                    <div className="col-span-3 text-right font-bold">{formatCurrency(totalDebit)}</div>
                    <div className="col-span-3 text-right font-bold">{formatCurrency(totalCredit)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
