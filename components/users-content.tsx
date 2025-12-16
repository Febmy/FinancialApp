"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, UserPlus, Shield, Users, Crown, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UsersContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const userStats = [
    { label: "Total Users", value: "24", icon: Users, color: "text-blue-500" },
    { label: "Active Users", value: "18", icon: UserPlus, color: "text-green-500" },
    { label: "Admins", value: "3", icon: Crown, color: "text-yellow-500" },
    { label: "Pending", value: "2", icon: Shield, color: "text-orange-500" },
  ]

  const users = [
    {
      id: 1,
      name: "Ahmad Rizky",
      email: "ahmad.rizky@company.com",
      role: "Admin",
      department: "Finance",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.n@company.com",
      role: "Manager",
      department: "Accounting",
      status: "active",
      lastLogin: "5 hours ago",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.s@company.com",
      role: "Staff",
      department: "Finance",
      status: "active",
      lastLogin: "1 day ago",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi.l@company.com",
      role: "Analyst",
      department: "Treasury",
      status: "active",
      lastLogin: "3 hours ago",
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      email: "eko.p@company.com",
      role: "Staff",
      department: "Tax",
      status: "inactive",
      lastLogin: "2 weeks ago",
    },
  ]

  const roles = [
    {
      name: "Admin",
      description: "Full access to all modules and settings",
      permissions: ["All Modules", "User Management", "System Settings", "Data Export"],
      users: 3,
    },
    {
      name: "Manager",
      description: "Access to approve transactions and view reports",
      permissions: ["Dashboard", "Reports", "Approve Transactions", "Budget Management"],
      users: 5,
    },
    {
      name: "Staff",
      description: "Basic access to input and view data",
      permissions: ["Dashboard", "Input Transactions", "View Reports"],
      users: 12,
    },
    {
      name: "Analyst",
      description: "Read-only access with advanced analytics",
      permissions: ["Dashboard", "Analytics", "Advanced Reports", "Data Export"],
      users: 4,
    },
  ]

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Analyst":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="user@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="treasury">Treasury</SelectItem>
                        <SelectItem value="tax">Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Temporary password" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Add User</Button>
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
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 bg-surface rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User List</CardTitle>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Login</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-surface/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{user.department}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user.lastLogin}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{role.name}</CardTitle>
                    <Badge variant="outline">{role.users} users</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="secondary">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Ahmad Rizky",
                    action: "Created new transaction",
                    time: "2 hours ago",
                    type: "create",
                  },
                  {
                    user: "Siti Nurhaliza",
                    action: "Approved invoice #INV-2024-001",
                    time: "3 hours ago",
                    type: "approve",
                  },
                  {
                    user: "Budi Santoso",
                    action: "Generated monthly report",
                    time: "5 hours ago",
                    type: "report",
                  },
                  {
                    user: "Dewi Lestari",
                    action: "Updated budget allocation",
                    time: "1 day ago",
                    type: "update",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-surface rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(activity.user)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
