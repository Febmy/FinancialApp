"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FolderTree, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ChartOfAccountsContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const accounts = [
    { code: "1000", name: "Kas", type: "Asset", category: "Current Asset", balance: 50000000, status: "active" },
    { code: "1010", name: "Bank BCA", type: "Asset", category: "Current Asset", balance: 250000000, status: "active" },
    {
      code: "1020",
      name: "Bank Mandiri",
      type: "Asset",
      category: "Current Asset",
      balance: 150000000,
      status: "active",
    },
    {
      code: "1100",
      name: "Piutang Usaha",
      type: "Asset",
      category: "Current Asset",
      balance: 75000000,
      status: "active",
    },
    {
      code: "1200",
      name: "Persediaan",
      type: "Asset",
      category: "Current Asset",
      balance: 120000000,
      status: "active",
    },
    { code: "1500", name: "Gedung", type: "Asset", category: "Fixed Asset", balance: 500000000, status: "active" },
    { code: "1510", name: "Kendaraan", type: "Asset", category: "Fixed Asset", balance: 200000000, status: "active" },
    {
      code: "2000",
      name: "Utang Usaha",
      type: "Liability",
      category: "Current Liability",
      balance: 45000000,
      status: "active",
    },
    {
      code: "2100",
      name: "Utang Gaji",
      type: "Liability",
      category: "Current Liability",
      balance: 30000000,
      status: "active",
    },
    {
      code: "2500",
      name: "Utang Bank",
      type: "Liability",
      category: "Long-term Liability",
      balance: 150000000,
      status: "active",
    },
    { code: "3000", name: "Modal", type: "Equity", category: "Equity", balance: 800000000, status: "active" },
    { code: "3100", name: "Laba Ditahan", type: "Equity", category: "Equity", balance: 200000000, status: "active" },
    {
      code: "4000",
      name: "Pendapatan Penjualan",
      type: "Revenue",
      category: "Operating Revenue",
      balance: 0,
      status: "active",
    },
    {
      code: "4100",
      name: "Pendapatan Jasa",
      type: "Revenue",
      category: "Operating Revenue",
      balance: 0,
      status: "active",
    },
    { code: "5000", name: "Beban Gaji", type: "Expense", category: "Operating Expense", balance: 0, status: "active" },
    {
      code: "5100",
      name: "Beban Listrik",
      type: "Expense",
      category: "Operating Expense",
      balance: 0,
      status: "active",
    },
    { code: "5200", name: "Beban Sewa", type: "Expense", category: "Operating Expense", balance: 0, status: "active" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Asset":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Liability":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Equity":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Revenue":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Expense":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.code.includes(searchQuery) ||
      account.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chart of Accounts</h1>
          <p className="text-muted-foreground">Manage your account structure and hierarchy</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Code</Label>
                    <Input placeholder="e.g., 1030" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Name</Label>
                    <Input placeholder="e.g., Bank BNI" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asset">Asset</SelectItem>
                        <SelectItem value="liability">Liability</SelectItem>
                        <SelectItem value="equity">Equity</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-asset">Current Asset</SelectItem>
                        <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                        <SelectItem value="current-liability">Current Liability</SelectItem>
                        <SelectItem value="operating-revenue">Operating Revenue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Account description" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Add Account</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Assets", value: "Rp 1.2B", icon: FolderTree, color: "text-blue-500" },
          { label: "Liabilities", value: "Rp 225M", icon: FolderTree, color: "text-red-500" },
          { label: "Equity", value: "Rp 1B", icon: FolderTree, color: "text-purple-500" },
          { label: "Revenue", value: "Rp 500M", icon: FolderTree, color: "text-green-500" },
          { label: "Expense", value: "Rp 350M", icon: FolderTree, color: "text-orange-500" },
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold mt-1">{item.value}</p>
                </div>
                <div className={`p-2 bg-surface rounded-lg ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Accounts</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Account Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.code} className="border-b border-border hover:bg-surface/50">
                    <td className="py-3 px-4 font-mono text-sm">{account.code}</td>
                    <td className="py-3 px-4 font-medium">{account.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getTypeColor(account.type)}>
                        {account.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{account.category}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatCurrency(account.balance)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
