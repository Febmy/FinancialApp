import { IntegrationsContent } from "@/components/integrations-content"

export default function IntegrationsPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <IntegrationsContent />
        </main>
      </div>
    </div>
  )
}
