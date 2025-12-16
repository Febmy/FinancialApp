"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, TrendingDown, Download, AlertCircle, DollarSign, Target, BarChart3 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BudgetingContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const budgetSummary = [
    { label: "Total Budget", value: "Rp 500,000,000", icon: DollarSign, color: "text-blue-500" },
    { label: "Total Actual", value: "Rp 425,000,000", icon: BarChart3, color: "text-green-500" },
    { label: "Variance", value: "Rp 75,000,000 (15%)", icon: TrendingUp, color: "text-green-500" },
    { label: "Budget Utilization", value: "85%", icon: Target, color: "text-orange-500" },
  ]

  const budgetByCategory = [
    { category: "Operational", budget: 150000000, actual: 135000000, variance: 15000000, status: "under" },
    { category: "Marketing", budget: 80000000, actual: 85000000, variance: -5000000, status: "over" },
    { category: "Salary & Benefits", budget: 200000000, actual: 180000000, variance: 20000000, status: "under" },
    { category: "R&D", budget: 50000000, actual: 45000000, variance: 5000000, status: "under" },
    { category: "Administration", budget: 20000000, actual: 22000000, variance: -2000000, status: "over" },
  ]

  const monthlyBudget = [
    { month: "Jan", budget: 42000000, actual: 38000000 },
    { month: "Feb", budget: 42000000, actual: 40000000 },
    { month: "Mar", budget: 42000000, actual: 41000000 },
    { month: "Apr", budget: 42000000, actual: 39000000 },
    { month: "May", budget: 42000000, actual: 43000000 },
    { month: "Jun", budget: 42000000, actual: 40000000 },
  ]

  const departmentBudgets = [
    { department: "Finance", allocated: 30000000, spent: 25000000, remaining: 5000000 },
    { department: "IT", allocated: 50000000, spent: 48000000, remaining: 2000000 },
    { department: "HR", allocated: 40000000, spent: 35000000, remaining: 5000000 },
    { department: "Operations", allocated: 80000000, spent: 70000000, remaining: 10000000 },
    { department: "Sales", allocated: 60000000, spent: 55000000, remaining: 5000000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-500"
    if (variance < 0) return "text-red-500"
    return "text-gray-400"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budgeting & Planning</h1>
          <p className="text-muted-foreground">Manage and monitor budget allocation</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Budget Plan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department/Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="salary">Salary & Benefits</SelectItem>
                      <SelectItem value="rd">R&D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Amount</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Budget description" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Budget</Button>
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
        {budgetSummary.map((item, index) => (
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

      {/* Tabs */}
      <Tabs defaultValue="category" className="space-y-4">
        <TabsList>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetByCategory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{item.category}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">Budget: {formatCurrency(item.budget)}</span>
                            <span className="text-foreground">Actual: {formatCurrency(item.actual)}</span>
                            <span className={getVarianceColor(item.variance)}>
                              Variance: {formatCurrency(Math.abs(item.variance))}
                              {item.status === "over" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                              {item.status === "under" && <TrendingDown className="inline h-4 w-4 ml-1" />}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 bg-surface rounded-full overflow-hidden">
                          <div
                            className={`absolute h-full ${item.status === "over" ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${(item.actual / item.budget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Month</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Budgeted</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actual</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variance</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyBudget.map((item, index) => {
                        const variance = item.budget - item.actual
                        const percentage = ((item.actual / item.budget) * 100).toFixed(1)
                        return (
                          <tr key={index} className="border-b border-border hover:bg-surface/50">
                            <td className="py-3 px-4 font-medium">{item.month}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(item.budget)}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(item.actual)}</td>
                            <td className={`py-3 px-4 text-right ${getVarianceColor(variance)}`}>
                              {formatCurrency(Math.abs(variance))}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Badge variant={Number.parseFloat(percentage) > 100 ? "destructive" : "default"}>
                                {percentage}%
                              </Badge>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentBudgets.map((item, index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{item.department}</h4>
                      <Badge variant="outline">{((item.spent / item.allocated) * 100).toFixed(0)}% Used</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Allocated</p>
                        <p className="font-medium">{formatCurrency(item.allocated)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spent</p>
                        <p className="font-medium">{formatCurrency(item.spent)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-medium text-green-500">{formatCurrency(item.remaining)}</p>
                      </div>
                    </div>
                    <div className="relative h-2 bg-background rounded-full overflow-hidden mt-3">
                      <div
                        className="absolute h-full bg-blue-500"
                        style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Variance Analysis & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-500">Marketing Budget Exceeded</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Marketing expenses are 6.25% over budget this month. Review spending immediately.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-500">IT Department Approaching Limit</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      IT department has used 96% of allocated budget. Consider budget reallocation.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-500">Operational Efficiency Improved</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Operational costs are 10% under budget while maintaining performance targets.
                    </p>
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
