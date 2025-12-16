"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, FileText, Calendar, AlertCircle, CheckCircle } from "lucide-react"

export function TaxContent() {
  const taxObligations = [
    { type: "PPN", period: "December 2024", dueDate: "2024-01-31", amount: 15000000, status: "pending" },
    { type: "PPh 21", period: "December 2024", dueDate: "2024-01-10", amount: 8500000, status: "overdue" },
    { type: "PPh 23", period: "December 2024", dueDate: "2024-01-10", amount: 3200000, status: "overdue" },
    { type: "PPN", period: "November 2024", dueDate: "2023-12-31", amount: 14200000, status: "paid" },
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
            <Calendar className="mr-1 h-3 w-3" />
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
          <h1 className="text-3xl font-bold tracking-tight">Tax Management</h1>
          <p className="text-muted-foreground">Monitor tax obligations and compliance</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax This Year</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 180.5M</div>
            <p className="text-xs text-muted-foreground">All tax types combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Rp 26.7M</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Taxes</CardTitle>
            <AlertCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">Rp 11.7M</div>
            <p className="text-xs text-muted-foreground">2 overdue obligations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">On-time submissions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="obligations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="obligations">Tax Obligations</TabsTrigger>
          <TabsTrigger value="ppn">PPN (VAT)</TabsTrigger>
          <TabsTrigger value="pph">PPh (Income Tax)</TabsTrigger>
          <TabsTrigger value="reports">Tax Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="obligations" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tax obligations..." className="pl-9" />
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

          {/* Tax Obligations Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Tax Type</th>
                      <th className="text-left p-4 font-medium">Period</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {taxObligations.map((tax, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{tax.type}</td>
                        <td className="p-4">{tax.period}</td>
                        <td className="p-4">{tax.dueDate}</td>
                        <td className="p-4">Rp {tax.amount.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(tax.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
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

        <TabsContent value="ppn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PPN (Value Added Tax)</CardTitle>
              <CardDescription>VAT reports and submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPN In (Input Tax)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Rp 45.2M</div>
                      <p className="text-xs text-muted-foreground">This period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPN Out (Output Tax)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Rp 60.2M</div>
                      <p className="text-xs text-muted-foreground">This period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPN Payable</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-danger">Rp 15.0M</div>
                      <p className="text-xs text-muted-foreground">Net tax due</p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-muted-foreground text-center py-4">Detailed PPN reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pph" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PPh (Income Tax)</CardTitle>
              <CardDescription>Income tax withholding and submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPh 21 (Employee)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Rp 8.5M</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPh 23 (Services)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Rp 3.2M</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">PPh 25 (Corporate)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Rp 12.5M</div>
                      <p className="text-xs text-muted-foreground">Monthly installment</p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-muted-foreground text-center py-4">Detailed PPh reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports & Filings</CardTitle>
              <CardDescription>Generate and download tax reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Monthly Tax Report</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Annual Tax Report</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>SPT Tahunan PPh Badan</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Tax Reconciliation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
