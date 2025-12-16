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
import { Search, Plus, Package, Download, Calendar } from "lucide-react"

export function AssetsContent() {
  const [showAssetDialog, setShowAssetDialog] = useState(false)

  const assets = [
    {
      id: "AST-001",
      name: "Office Building - Jakarta",
      category: "Property",
      cost: 5000000000,
      date: "2020-01-15",
      depreciation: "20 years",
      bookValue: 4000000000,
    },
    {
      id: "AST-002",
      name: "Company Vehicle - Toyota",
      category: "Vehicle",
      cost: 500000000,
      date: "2022-06-10",
      depreciation: "5 years",
      bookValue: 350000000,
    },
    {
      id: "AST-003",
      name: "Computer Equipment",
      category: "Equipment",
      cost: 150000000,
      date: "2023-03-20",
      depreciation: "3 years",
      bookValue: 100000000,
    },
    {
      id: "AST-004",
      name: "Furniture & Fixtures",
      category: "Furniture",
      cost: 75000000,
      date: "2023-08-05",
      depreciation: "5 years",
      bookValue: 65000000,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
          <p className="text-muted-foreground">Track and manage company fixed assets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showAssetDialog} onOpenChange={setShowAssetDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>Register a new fixed asset for tracking and depreciation</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset-id">Asset ID</Label>
                    <Input id="asset-id" placeholder="AST-XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisition-date">Acquisition Date</Label>
                    <Input id="acquisition-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input id="asset-name" placeholder="e.g., Office Building" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Acquisition Cost</Label>
                    <Input id="cost" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="useful-life">Useful Life (years)</Label>
                    <Input id="useful-life" type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salvage-value">Salvage Value</Label>
                    <Input id="salvage-value" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depreciation-method">Depreciation Method</Label>
                  <Select>
                    <SelectTrigger id="depreciation-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="straight-line">Straight Line</SelectItem>
                      <SelectItem value="declining-balance">Declining Balance</SelectItem>
                      <SelectItem value="sum-of-years">Sum of Years Digits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Head Office - Jakarta" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAssetDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAssetDialog(false)}>Add Asset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 5.72B</div>
            <p className="text-xs text-muted-foreground">Original cost</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Book Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 4.52B</div>
            <p className="text-xs text-muted-foreground">After depreciation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Registered assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Year Depreciation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 520M</div>
            <p className="text-xs text-muted-foreground">Annual expense</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assets">All Assets</TabsTrigger>
          <TabsTrigger value="depreciation">Depreciation Schedule</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Log</TabsTrigger>
          <TabsTrigger value="disposal">Disposal History</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assets..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assets Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Asset ID</th>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Acquisition Cost</th>
                      <th className="text-left p-4 font-medium">Book Value</th>
                      <th className="text-left p-4 font-medium">Acquisition Date</th>
                      <th className="text-left p-4 font-medium">Depreciation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {assets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">{asset.id}</td>
                        <td className="p-4">{asset.name}</td>
                        <td className="p-4">
                          <Badge variant="outline">{asset.category}</Badge>
                        </td>
                        <td className="p-4">Rp {asset.cost.toLocaleString()}</td>
                        <td className="p-4 font-semibold">Rp {asset.bookValue.toLocaleString()}</td>
                        <td className="p-4">{asset.date}</td>
                        <td className="p-4 text-muted-foreground text-sm">{asset.depreciation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depreciation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Depreciation Schedule</CardTitle>
              <CardDescription>Monthly and annual depreciation tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Depreciation schedule coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Log</CardTitle>
              <CardDescription>Asset maintenance and repair history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Maintenance log coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disposal">
          <Card>
            <CardHeader>
              <CardTitle>Disposal History</CardTitle>
              <CardDescription>Disposed and retired assets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Disposal history coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
