"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, LinkIcon, Database, CreditCard, ShoppingCart, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function IntegrationsContent() {
  const { toast } = useToast()
  const [integrations, setIntegrations] = useState([
    {
      id: "bank",
      name: "Bank Integration",
      description: "Auto-import bank statements from BCA, Mandiri, BRI",
      icon: Database,
      connected: true,
      autoSync: true,
      category: "banking",
    },
    {
      id: "payment",
      name: "Payment Gateway",
      description: "Integrate with Midtrans, Xendit, and Stripe",
      icon: CreditCard,
      connected: true,
      autoSync: true,
      category: "payments",
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Connect with Shopify, Tokopedia, Shopee",
      icon: ShoppingCart,
      connected: false,
      autoSync: false,
      category: "sales",
    },
    {
      id: "erp",
      name: "ERP System",
      description: "Sync with SAP, Oracle, Odoo",
      icon: FileText,
      connected: true,
      autoSync: true,
      category: "system",
    },
    {
      id: "tax",
      name: "Tax Authority",
      description: "Connect with DJP for e-Filing and e-Faktur",
      icon: FileText,
      connected: false,
      autoSync: false,
      category: "compliance",
    },
    {
      id: "storage",
      name: "Cloud Storage",
      description: "Backup to Google Drive, Dropbox, OneDrive",
      icon: Database,
      connected: false,
      autoSync: false,
      category: "storage",
    },
  ])

  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionForm, setConnectionForm] = useState({
    apiKey: "",
    apiSecret: "",
    accountId: "",
  })

  const handleToggleSync = (integrationId: string) => {
    setIntegrations(integrations.map((int) => (int.id === integrationId ? { ...int, autoSync: !int.autoSync } : int)))

    const integration = integrations.find((i) => i.id === integrationId)
    toast({
      title: `Auto-sync ${integration?.autoSync ? "Disabled" : "Enabled"}`,
      description: `${integration?.name} auto-sync telah ${integration?.autoSync ? "dinonaktifkan" : "diaktifkan"}`,
    })
  }

  const handleConnectClick = (integration: any) => {
    setSelectedIntegration(integration)
    setShowConnectDialog(true)
    setConnectionForm({ apiKey: "", apiSecret: "", accountId: "" })
  }

  const handleSubmitConnection = async () => {
    if (!connectionForm.apiKey || !connectionForm.apiSecret) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi API Key dan API Secret",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    console.log("[v0] Connecting integration:", selectedIntegration?.name, connectionForm)

    // Simulate API connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIntegrations(
      integrations.map((int) =>
        int.id === selectedIntegration?.id ? { ...int, connected: true, autoSync: true } : int,
      ),
    )

    setIsConnecting(false)
    setShowConnectDialog(false)

    toast({
      title: "Integration Connected",
      description: `${selectedIntegration?.name} berhasil terhubung`,
    })
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(
      integrations.map((int) => (int.id === integrationId ? { ...int, connected: false, autoSync: false } : int)),
    )

    const integration = integrations.find((i) => i.id === integrationId)
    toast({
      title: "Integration Disconnected",
      description: `${integration?.name} telah diputuskan`,
    })
  }

  const connectedIntegrations = integrations.filter((i) => i.connected)
  const availableIntegrations = integrations.filter((i) => !i.connected)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Connect your finance app with external services</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Integrations ({integrations.length})</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableIntegrations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <integration.icon className="h-8 w-8 text-primary" />
                    {integration.connected ? (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline">Available</Badge>
                    )}
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {integration.connected ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Auto-sync</span>
                        <Switch
                          checked={integration.autoSync}
                          onCheckedChange={() => handleToggleSync(integration.id)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleConnectClick(integration)}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <integration.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>Last synced: 2 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Auto-sync</span>
                      <Switch checked={integration.autoSync} onCheckedChange={() => handleToggleSync(integration.id)} />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <integration.icon className="h-8 w-8 text-primary" />
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleConnectClick(integration)}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Masukkan kredensial untuk menghubungkan {selectedIntegration?.name} dengan aplikasi
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="Enter your API key"
                value={connectionForm.apiKey}
                onChange={(e) => setConnectionForm({ ...connectionForm, apiKey: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                placeholder="Enter your API secret"
                value={connectionForm.apiSecret}
                onChange={(e) => setConnectionForm({ ...connectionForm, apiSecret: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accountId">Account ID (Optional)</Label>
              <Input
                id="accountId"
                placeholder="Enter your account ID"
                value={connectionForm.accountId}
                onChange={(e) => setConnectionForm({ ...connectionForm, accountId: e.target.value })}
              />
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Note:</p>
              <p className="text-muted-foreground">
                Your credentials are encrypted and stored securely. We never share your data with third parties.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)} disabled={isConnecting}>
              Cancel
            </Button>
            <Button onClick={handleSubmitConnection} disabled={isConnecting}>
              {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
