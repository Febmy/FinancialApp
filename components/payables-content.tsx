"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, CreditCard, Download, AlertCircle, CheckCircle, Clock } from "lucide-react"

export function PayablesContent() {
  const [showBillDialog, setShowBillDialog] = useState(false)

  const bills = [
    {
      id: "BILL-2024-001",
      vendor: "PT Supplier ABC",
      amount: 25000000,
      dueDate: "2024-01-18",
      status: "pending",
      age: 2,
    },
    {
      id: "BILL-2024-002",
      vendor: "CV Mitra Usaha",
      amount: 12500000,
      dueDate: "2024-01-22",
      status: "pending",
      age: -2,
    },
    {
      id: "BILL-2024-003",
      vendor: "PT Distributor XYZ",
      amount: 18000000,
      dueDate: "2024-01-12",
      status: "overdue",
      age: 8,
    },
    {
      id: "BILL-2024-004",
      vendor: "UD Sumber Rezeki",
      amount: 7500000,
      dueDate: "2024-01-10",
      status: "paid",
      age: 10,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-success/20 text-success hover:bg-success/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-warning/20 text-warning hover:bg-warning/30">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-danger/20 text-danger hover:bg-danger/30">
            <AlertCircle className="mr-1 h-3 w-3" />
            Overdue
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Payable</h1>
          <p className="text-muted-foreground">Manage bills and vendor payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showBillDialog} onOpenChange={setShowBillDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Record New Bill</DialogTitle>
                <DialogDescription>Enter vendor bill details for payment tracking</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bill-number">Bill Number</Label>
                    <Input id="bill-number" placeholder="BILL-2024-XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bill-date">Bill Date</Label>
                    <Input id="bill-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Select>
                    <SelectTrigger id="vendor">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-supplier">PT Supplier ABC</SelectItem>
                      <SelectItem value="cv-mitra">CV Mitra Usaha</SelectItem>
                      <SelectItem value="pt-distributor">PT Distributor XYZ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Bill description" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Expense Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory">Inventory Purchase</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBillDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowBillDialog(false)}>Record Bill</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 63.0M</div>
            <p className="text-xs text-muted-foreground">Across 89 bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">Rp 18.0M</div>
            <p className="text-xs text-muted-foreground">12 overdue bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Rp 25.0M</div>
            <p className="text-xs text-muted-foreground">15 bills due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 42.5M</div>
            <p className="text-xs text-muted-foreground">35 payments made</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="aging">Aging Report</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bills..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bills Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Bill #</th>
                      <th className="text-left p-4 font-medium">Vendor</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium">Age (Days)</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {bills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{bill.id}</td>
                        <td className="p-4">{bill.vendor}</td>
                        <td className="p-4">Rp {bill.amount.toLocaleString()}</td>
                        <td className="p-4">{bill.dueDate}</td>
                        <td className="p-4">
                          <span className={bill.age > 0 && bill.status === "overdue" ? "text-danger font-medium" : ""}>
                            {bill.age > 0 ? `+${bill.age}` : bill.age}
                          </span>
                        </td>
                        <td className="p-4">{getStatusBadge(bill.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accounts Payable Aging</CardTitle>
              <CardDescription>Outstanding bills by age category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Vendor</th>
                      <th className="text-right p-4 font-medium">Current</th>
                      <th className="text-right p-4 font-medium">1-30 Days</th>
                      <th className="text-right p-4 font-medium">31-60 Days</th>
                      <th className="text-right p-4 font-medium">61-90 Days</th>
                      <th className="text-right p-4 font-medium">&gt;90 Days</th>
                      <th className="text-right p-4 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">PT Supplier ABC</td>
                      <td className="p-4 text-right">Rp 10.0M</td>
                      <td className="p-4 text-right">Rp 5.5M</td>
                      <td className="p-4 text-right text-warning">Rp 3.0M</td>
                      <td className="p-4 text-right text-danger">Rp 2.0M</td>
                      <td className="p-4 text-right text-danger font-bold">Rp 1.2M</td>
                      <td className="p-4 text-right font-bold">Rp 21.7M</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">CV Mitra Usaha</td>
                      <td className="p-4 text-right">Rp 8.5M</td>
                      <td className="p-4 text-right">Rp 4.2M</td>
                      <td className="p-4 text-right">Rp 1.8M</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right font-bold">Rp 14.5M</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">PT Distributor XYZ</td>
                      <td className="p-4 text-right">Rp 12.0M</td>
                      <td className="p-4 text-right">Rp 3.8M</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right font-bold">Rp 15.8M</td>
                    </tr>
                    <tr className="border-t-2 bg-muted/50 font-bold">
                      <td className="p-4">Total</td>
                      <td className="p-4 text-right">Rp 30.5M</td>
                      <td className="p-4 text-right">Rp 13.5M</td>
                      <td className="p-4 text-right text-warning">Rp 4.8M</td>
                      <td className="p-4 text-right text-danger">Rp 2.0M</td>
                      <td className="p-4 text-right text-danger">Rp 1.2M</td>
                      <td className="p-4 text-right">Rp 52.0M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Accounts</CardTitle>
              <CardDescription>Vendor list with outstanding balances</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Vendor list view coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Payments</CardTitle>
              <CardDescription>Upcoming automated and scheduled payments with three-way matching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">PT Supplier ABC - BILL-2024-001</h4>
                        <p className="text-sm text-muted-foreground">Scheduled for Jan 18, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">Rp 25,000,000</div>
                      <Badge className="bg-success/20 text-success">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        3-Way Match Complete
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Purchase Order</p>
                      <p className="font-medium">PO-2024-158</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        Matched
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goods Receipt</p>
                      <p className="font-medium">GR-2024-245</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        Matched
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vendor Invoice</p>
                      <p className="font-medium">INV-ABC-2024-089</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        Matched
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Process Payment</Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold">CV Mitra Usaha - BILL-2024-002</h4>
                        <p className="text-sm text-muted-foreground">Scheduled for Jan 22, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">Rp 12,500,000</div>
                      <Badge className="bg-warning/20 text-warning">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Partial Match
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Purchase Order</p>
                      <p className="font-medium">PO-2024-162</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        Matched
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goods Receipt</p>
                      <p className="font-medium">GR-2024-251</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        Matched
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vendor Invoice</p>
                      <p className="font-medium text-warning">Amount Mismatch</p>
                      <Badge variant="outline" className="mt-1 border-warning text-warning">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Discrepancy
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Review Discrepancy
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
