import { Sidebar } from "@/components/sidebar"
import { ReceivablesContent } from "@/components/receivables-content"

export default function ReceivablesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ReceivablesContent />
      </main>
    </div>
  )
}
