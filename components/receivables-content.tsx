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
import { Search, Plus, Send, Download, AlertCircle, CheckCircle, Clock, Bell, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ReceivablesContent() {
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [showReminderDialog, setShowReminderDialog] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const invoices = [
    {
      id: "INV-2024-001",
      customer: "PT Maju Jaya",
      amount: 15000000,
      dueDate: "2024-01-15",
      status: "overdue",
      age: 15,
      autoReminder: true,
      lastReminderSent: "2024-01-20",
    },
    {
      id: "INV-2024-002",
      customer: "CV Berkah",
      amount: 8500000,
      dueDate: "2024-01-20",
      status: "pending",
      age: 5,
      autoReminder: true,
      lastReminderSent: null,
    },
    {
      id: "INV-2024-003",
      customer: "PT Sejahtera",
      amount: 12000000,
      dueDate: "2024-01-25",
      status: "pending",
      age: 0,
      autoReminder: false,
      lastReminderSent: null,
    },
    {
      id: "INV-2024-004",
      customer: "UD Makmur",
      amount: 5500000,
      dueDate: "2024-01-30",
      status: "paid",
      age: -5,
      autoReminder: false,
      lastReminderSent: null,
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
          <h1 className="text-3xl font-bold tracking-tight">Accounts Receivable</h1>
          <p className="text-muted-foreground">Manage invoices and customer payments with auto-reminders</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Generate a new invoice for customer billing</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input id="invoice-number" placeholder="INV-2024-XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input id="invoice-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-maju">PT Maju Jaya</SelectItem>
                      <SelectItem value="cv-berkah">CV Berkah</SelectItem>
                      <SelectItem value="pt-sejahtera">PT Sejahtera</SelectItem>
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
                  <Input id="description" placeholder="Invoice description" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Payment Terms</Label>
                  <Select>
                    <SelectTrigger id="payment-terms">
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net-30">Net 30</SelectItem>
                      <SelectItem value="net-60">Net 60</SelectItem>
                      <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <div>
                      <Label className="text-sm font-medium">Enable Auto-Reminders</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically send payment reminders before and after due date
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowInvoiceDialog(false)}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 41.0M</div>
            <p className="text-xs text-muted-foreground">Across 156 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">Rp 8.5M</div>
            <p className="text-xs text-muted-foreground">23 overdue invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Rp 12.0M</div>
            <p className="text-xs text-muted-foreground">18 invoices due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Reminders Active</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">12 sent this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="aging">Aging Report</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reminders">Auto-Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9" />
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

          {/* Invoices Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Invoice #</th>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium">Age (Days)</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Reminder</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{invoice.id}</td>
                        <td className="p-4">{invoice.customer}</td>
                        <td className="p-4">Rp {invoice.amount.toLocaleString()}</td>
                        <td className="p-4">{invoice.dueDate}</td>
                        <td className="p-4">
                          <span className={invoice.age > 0 ? "text-danger font-medium" : ""}>
                            {invoice.age > 0 ? `+${invoice.age}` : invoice.age}
                          </span>
                        </td>
                        <td className="p-4">{getStatusBadge(invoice.status)}</td>
                        <td className="p-4">
                          {invoice.autoReminder ? (
                            <Badge variant="outline" className="gap-1">
                              <Bell className="h-3 w-3 text-primary" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Off
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Dialog
                              open={showReminderDialog && selectedInvoice?.id === invoice.id}
                              onOpenChange={(open) => {
                                setShowReminderDialog(open)
                                if (!open) setSelectedInvoice(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                                  <Send className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Send Payment Reminder</DialogTitle>
                                  <DialogDescription>Send a payment reminder to {invoice.customer}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Invoice Details</Label>
                                    <div className="mt-2 p-3 bg-muted/50 rounded-lg space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Invoice #:</span>
                                        <span className="font-medium">{invoice.id}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Amount:</span>
                                        <span className="font-medium">Rp {invoice.amount.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Due Date:</span>
                                        <span className="font-medium">{invoice.dueDate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Days Overdue:</span>
                                        <span className="font-medium text-danger">
                                          {invoice.age > 0 ? `${invoice.age} days` : "Not overdue"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Reminder Message</Label>
                                    <Textarea
                                      className="mt-2"
                                      rows={5}
                                      defaultValue={`Dear ${invoice.customer},\n\nThis is a friendly reminder that invoice ${invoice.id} for Rp ${invoice.amount.toLocaleString()} was due on ${invoice.dueDate}.\n\nPlease process the payment at your earliest convenience.\n\nBest regards,\nFinanceHub Team`}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      Will be sent to: finance@{invoice.customer.toLowerCase().replace(/\s+/g, "")}.com
                                    </span>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => setShowReminderDialog(false)}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Reminder
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
              <CardTitle>Accounts Receivable Aging</CardTitle>
              <CardDescription>Outstanding invoices by age category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Customer</th>
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
                      <td className="p-4 font-medium">PT Maju Jaya</td>
                      <td className="p-4 text-right">Rp 5.0M</td>
                      <td className="p-4 text-right">Rp 3.5M</td>
                      <td className="p-4 text-right text-warning">Rp 2.0M</td>
                      <td className="p-4 text-right text-danger">Rp 1.5M</td>
                      <td className="p-4 text-right text-danger font-bold">Rp 0.8M</td>
                      <td className="p-4 text-right font-bold">Rp 12.8M</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">CV Berkah</td>
                      <td className="p-4 text-right">Rp 4.2M</td>
                      <td className="p-4 text-right">Rp 2.1M</td>
                      <td className="p-4 text-right">Rp 0.5M</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right font-bold">Rp 6.8M</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">PT Sejahtera</td>
                      <td className="p-4 text-right">Rp 8.5M</td>
                      <td className="p-4 text-right">Rp 1.8M</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right">-</td>
                      <td className="p-4 text-right font-bold">Rp 10.3M</td>
                    </tr>
                    <tr className="border-t-2 bg-muted/50 font-bold">
                      <td className="p-4">Total</td>
                      <td className="p-4 text-right">Rp 17.7M</td>
                      <td className="p-4 text-right">Rp 7.4M</td>
                      <td className="p-4 text-right text-warning">Rp 2.5M</td>
                      <td className="p-4 text-right text-danger">Rp 1.5M</td>
                      <td className="p-4 text-right text-danger">Rp 0.8M</td>
                      <td className="p-4 text-right">Rp 29.9M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Accounts</CardTitle>
              <CardDescription>Customer list with outstanding balances and credit limits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Customer list view with credit monitoring</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Reminder Settings</CardTitle>
              <CardDescription>Configure automatic payment reminder schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Before Due Date Reminder</Label>
                    <p className="text-xs text-muted-foreground mt-1">Send reminder 3 days before due date</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">On Due Date Reminder</Label>
                    <p className="text-xs text-muted-foreground mt-1">Send reminder on the due date</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Overdue Reminder (7 days)</Label>
                    <p className="text-xs text-muted-foreground mt-1">Send reminder 7 days after due date</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Overdue Reminder (14 days)</Label>
                    <p className="text-xs text-muted-foreground mt-1">Send urgent reminder 14 days after due date</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Overdue Reminder (30 days)</Label>
                    <p className="text-xs text-muted-foreground mt-1">Send final reminder 30 days after due date</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Recent Reminder Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Reminder sent to PT Maju Jaya</p>
                        <p className="text-xs text-muted-foreground">INV-2024-001 - 15 days overdue</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Reminder sent to CV Berkah</p>
                        <p className="text-xs text-muted-foreground">INV-2024-002 - Due in 3 days</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Reminder Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
