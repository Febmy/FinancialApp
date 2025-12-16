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
import { Badge } from "@/components/ui/badge"
import { Plus, CheckCircle, XCircle, Clock, Receipt } from "lucide-react"

export function ExpenseClaimsContent() {
  const [activeTab, setActiveTab] = useState("my-claims")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Claims</h1>
          <p className="text-muted-foreground">Submit and manage employee expense reimbursements</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Expense Claim</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Claim Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="meal">Meal & Entertainment</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe the expense" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Project/Cost Center</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Department</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="ops">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Receipt/Supporting Documents</Label>
                <Input type="file" accept="image/*,.pdf" multiple />
                <p className="text-xs text-muted-foreground">Upload receipt images or PDF (max 5MB per file)</p>
              </div>
              <Button className="w-full">Submit Claim</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Total: Rp 4,250,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-success">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-danger">Needs revision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Total</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 18,500,000</div>
            <p className="text-xs text-muted-foreground">19 claims processed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my-claims">My Claims</TabsTrigger>
          <TabsTrigger value="all-claims">All Claims</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="my-claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Expense Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Client Meeting - Lunch</div>
                    <div className="text-sm text-muted-foreground">Claim #EXP-2025-089 • Dec 14, 2025</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">Rp 850,000</div>
                      <div className="text-xs text-muted-foreground">Meal & Entertainment</div>
                    </div>
                    <Badge variant="secondary" className="bg-warning/20 text-warning">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Jakarta - Surabaya Business Trip</div>
                    <div className="text-sm text-muted-foreground">Claim #EXP-2025-088 • Dec 10, 2025</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">Rp 3,500,000</div>
                      <div className="text-xs text-muted-foreground">Travel & Accommodation</div>
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Taxi to Client Office</div>
                    <div className="text-sm text-muted-foreground">Claim #EXP-2025-087 • Dec 8, 2025</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">Rp 125,000</div>
                      <div className="text-xs text-muted-foreground">Transportation</div>
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Paid
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Office Supplies Purchase</div>
                    <div className="text-sm text-muted-foreground">Claim #EXP-2025-086 • Dec 5, 2025</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">Rp 450,000</div>
                      <div className="text-xs text-muted-foreground">Other</div>
                    </div>
                    <Badge variant="secondary" className="bg-danger/20 text-danger">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-claims" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Employee Claims</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">Sarah Johnson - Conference Attendance</div>
                    <div className="text-sm text-muted-foreground">Claim #EXP-2025-090 • Dec 15, 2025 • Marketing</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">Rp 5,500,000</div>
                      <div className="text-xs text-muted-foreground">Travel & Registration</div>
                    </div>
                    <Badge variant="secondary" className="bg-warning/20 text-warning">
                      Pending Approval
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Claim Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Daily Limits</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Meal allowance: Rp 150,000 per day</li>
                  <li>• Transportation: Actual (with receipt)</li>
                  <li>• Accommodation: Max Rp 1,500,000 per night</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Required Documentation</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• All claims must include original receipts</li>
                  <li>• Business purpose must be clearly stated</li>
                  <li>• Claims must be submitted within 30 days</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Approval Process</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Claims below Rp 1,000,000: Manager approval</li>
                  <li>• Claims above Rp 1,000,000: CFO approval required</li>
                  <li>• Expected processing time: 3-5 business days</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
