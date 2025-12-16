"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, Plus, Upload, RefreshCw, TrendingDown } from "lucide-react"

export function PettyCashContent() {
  const [activeTab, setActiveTab] = useState("transactions")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Petty Cash Management</h1>
          <p className="text-muted-foreground">Kelola kas kecil dan pengeluaran operasional</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Petty Cash Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disbursement">Disbursement</SelectItem>
                      <SelectItem value="replenishment">Replenishment</SelectItem>
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
                      <SelectItem value="office">Office Supplies</SelectItem>
                      <SelectItem value="meal">Meal Allowance</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="misc">Miscellaneous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <Label>Receipt</Label>
                  <Input type="file" accept="image/*" />
                </div>
                <Button className="w-full">Save Transaction</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 5,250,000</div>
            <p className="text-xs text-muted-foreground">Last updated: Today, 09:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12,750,000</div>
            <p className="text-xs text-success">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Needs documentation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Replenishment</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 10,000,000</div>
            <p className="text-xs text-muted-foreground">Scheduled: Dec 20, 2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="replenishment">Replenishment</TabsTrigger>
          <TabsTrigger value="custodians">Custodians</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Office Supplies</div>
                    <div className="text-sm text-muted-foreground">Dec 15, 2025 • Stationery purchase</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-danger">-Rp 350,000</div>
                    <div className="text-xs text-muted-foreground">Receipt attached</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Meal Allowance</div>
                    <div className="text-sm text-muted-foreground">Dec 14, 2025 • Team lunch meeting</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-danger">-Rp 750,000</div>
                    <div className="text-xs text-warning">Pending receipt</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Replenishment</div>
                    <div className="text-sm text-muted-foreground">Dec 13, 2025 • From main cash account</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">+Rp 10,000,000</div>
                    <div className="text-xs text-muted-foreground">Approved</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Transportation</div>
                    <div className="text-sm text-muted-foreground">Dec 12, 2025 • Client visit taxi fare</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-danger">-Rp 125,000</div>
                    <div className="text-xs text-muted-foreground">Receipt attached</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replenishment" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Replenishment History</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Replenishment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Petty Cash Replenishment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Requested Amount</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Source Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">Main Cash Account</SelectItem>
                            <SelectItem value="bank1">BCA - Operational</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Reason</Label>
                        <Textarea placeholder="Enter reason for replenishment" />
                      </div>
                      <Button className="w-full">Submit Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Replenishment Request #REP-245</div>
                    <div className="text-sm text-muted-foreground">Dec 13, 2025 • Requested by: Finance Staff</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rp 10,000,000</div>
                    <div className="text-xs text-success">Approved & Disbursed</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Replenishment Request #REP-244</div>
                    <div className="text-sm text-muted-foreground">Dec 6, 2025 • Requested by: Finance Staff</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rp 8,500,000</div>
                    <div className="text-xs text-success">Approved & Disbursed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custodians" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Petty Cash Custodians</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Admin Finance</div>
                    <div className="text-sm text-muted-foreground">Primary Custodian • HQ Office</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rp 5,250,000</div>
                    <div className="text-xs text-muted-foreground">Current balance</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Warehouse Manager</div>
                    <div className="text-sm text-muted-foreground">Secondary Custodian • Warehouse</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rp 2,000,000</div>
                    <div className="text-xs text-muted-foreground">Current balance</div>
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
