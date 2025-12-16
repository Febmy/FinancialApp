"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Download, Search, FolderOpen, File, ImageIcon, FileSpreadsheet } from "lucide-react"
import { formatDate } from "@/lib/format-utils"

export function DocumentsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const documents = [
    {
      id: "DOC-001",
      name: "Invoice_PT_ABC_Jan2024.pdf",
      type: "Invoice",
      category: "AR",
      size: "245 KB",
      uploadedBy: "John Doe",
      uploadDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "DOC-002",
      name: "Bank_Statement_BCA_Dec2023.pdf",
      type: "Bank Statement",
      category: "Bank",
      size: "1.2 MB",
      uploadedBy: "Jane Smith",
      uploadDate: "2024-01-10",
      status: "Active",
    },
    {
      id: "DOC-003",
      name: "Tax_SPT_2023.xlsx",
      type: "Tax Document",
      category: "Tax",
      size: "890 KB",
      uploadedBy: "Bob Wilson",
      uploadDate: "2024-01-08",
      status: "Active",
    },
    {
      id: "DOC-004",
      name: "Expense_Receipt_Travel.jpg",
      type: "Receipt",
      category: "Expense",
      size: "156 KB",
      uploadedBy: "Alice Brown",
      uploadDate: "2024-01-12",
      status: "Active",
    },
    {
      id: "DOC-005",
      name: "Contract_Vendor_XYZ.pdf",
      type: "Contract",
      category: "AP",
      size: "678 KB",
      uploadedBy: "John Doe",
      uploadDate: "2024-01-14",
      status: "Active",
    },
  ]

  const getFileIcon = (type: string) => {
    if (type.includes("Invoice") || type.includes("Contract") || type.includes("Tax")) return FileText
    if (type.includes("Statement")) return FileSpreadsheet
    if (type.includes("Receipt")) return ImageIcon
    return File
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground mt-1">Upload, organize, and manage financial documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Add a new document to the repository</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Document File</Label>
                <Input type="file" className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, Excel, Word, Images (Max 10MB)
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="receipt">Receipt</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="bank">Bank Statement</SelectItem>
                      <SelectItem value="tax">Tax Document</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">Accounts Receivable</SelectItem>
                      <SelectItem value="ap">Accounts Payable</SelectItem>
                      <SelectItem value="bank">Bank & Treasury</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="asset">Fixed Assets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Tags (Optional)</Label>
                <Input placeholder="e.g., urgent, q1-2024, vendor-abc" className="mt-1" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Upload Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FolderOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Upload className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Documents uploaded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents by name, type, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="ar">Accounts Receivable</SelectItem>
            <SelectItem value="ap">Accounts Payable</SelectItem>
            <SelectItem value="bank">Bank & Treasury</SelectItem>
            <SelectItem value="tax">Tax</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="tax">Tax Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>Complete list of uploaded financial documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => {
                    const FileIcon = getFileIcon(doc.type)
                    return (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
