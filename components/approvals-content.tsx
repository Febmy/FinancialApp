"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, CheckCircle2, XCircle, Search, DollarSign } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/format-utils"

export function ApprovalsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApproval, setSelectedApproval] = useState<any>(null)

  const pendingApprovals = [
    {
      id: "AP-001",
      type: "Payment",
      requester: "John Doe",
      amount: 15000000,
      description: "Vendor Payment - PT ABC",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: "AP-002",
      type: "Expense",
      requester: "Jane Smith",
      amount: 5000000,
      description: "Travel Expense - Jakarta",
      date: "2024-01-16",
      priority: "Medium",
    },
    {
      id: "AP-003",
      type: "Budget",
      requester: "Bob Wilson",
      amount: 50000000,
      description: "Q1 Marketing Budget Adjustment",
      date: "2024-01-17",
      priority: "High",
    },
    {
      id: "AP-004",
      type: "Payment",
      requester: "Alice Brown",
      amount: 3000000,
      description: "Office Supplies Purchase",
      date: "2024-01-18",
      priority: "Low",
    },
  ]

  const approvedItems = [
    {
      id: "AP-005",
      type: "Payment",
      approver: "You",
      amount: 12000000,
      description: "Salary Payment - Dec 2024",
      date: "2024-01-10",
      approvedDate: "2024-01-14",
    },
    {
      id: "AP-006",
      type: "Expense",
      approver: "You",
      amount: 8000000,
      description: "Marketing Event",
      date: "2024-01-08",
      approvedDate: "2024-01-12",
    },
  ]

  const rejectedItems = [
    {
      id: "AP-007",
      type: "Budget",
      approver: "You",
      amount: 25000000,
      description: "Additional IT Budget",
      date: "2024-01-05",
      rejectedDate: "2024-01-09",
      reason: "Insufficient justification",
    },
  ]

  const handleApprove = (approval: any) => {
    console.log("Approved:", approval)
  }

  const handleReject = (approval: any, reason: string) => {
    console.log("Rejected:", approval, "Reason:", reason)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and manage approval requests</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Requires your action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedItems.length}</div>
            <p className="text-xs text-muted-foreground">Total approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedItems.length}</div>
            <p className="text-xs text-muted-foreground">Declined requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(pendingApprovals.reduce((sum, item) => sum + item.amount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search approvals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingApprovals.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedItems.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Items waiting for your approval decision</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{approval.type}</Badge>
                      </TableCell>
                      <TableCell>{approval.requester}</TableCell>
                      <TableCell>{approval.description}</TableCell>
                      <TableCell>{formatCurrency(approval.amount)}</TableCell>
                      <TableCell>{formatDate(approval.date)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            approval.priority === "High"
                              ? "destructive"
                              : approval.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {approval.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApproval(approval)}>
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Approval Request</DialogTitle>
                              <DialogDescription>
                                Review the details and approve or reject this request
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApproval && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Request ID</Label>
                                    <p className="text-sm font-medium">{selectedApproval.id}</p>
                                  </div>
                                  <div>
                                    <Label>Type</Label>
                                    <p className="text-sm font-medium">{selectedApproval.type}</p>
                                  </div>
                                  <div>
                                    <Label>Requester</Label>
                                    <p className="text-sm font-medium">{selectedApproval.requester}</p>
                                  </div>
                                  <div>
                                    <Label>Amount</Label>
                                    <p className="text-sm font-medium">{formatCurrency(selectedApproval.amount)}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label>Description</Label>
                                    <p className="text-sm font-medium">{selectedApproval.description}</p>
                                  </div>
                                  <div>
                                    <Label>Request Date</Label>
                                    <p className="text-sm font-medium">{formatDate(selectedApproval.date)}</p>
                                  </div>
                                  <div>
                                    <Label>Priority</Label>
                                    <Badge variant={selectedApproval.priority === "High" ? "destructive" : "default"}>
                                      {selectedApproval.priority}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Comments (Optional)</Label>
                                  <Textarea placeholder="Add your comments here..." className="mt-1" />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reject Request</DialogTitle>
                                    <DialogDescription>Please provide a reason for rejection</DialogDescription>
                                  </DialogHeader>
                                  <div>
                                    <Label>Rejection Reason</Label>
                                    <Textarea
                                      placeholder="Explain why this request is being rejected..."
                                      className="mt-2"
                                    />
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => selectedApproval && handleReject(selectedApproval, "")}
                                    >
                                      Confirm Rejection
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button onClick={() => selectedApproval && handleApprove(selectedApproval)}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Items</CardTitle>
              <CardDescription>Previously approved requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Approved Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{formatDate(item.approvedDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Items</CardTitle>
              <CardDescription>Previously rejected requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Rejected Date</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{formatDate(item.rejectedDate)}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
