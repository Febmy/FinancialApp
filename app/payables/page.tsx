import { Sidebar } from "@/components/sidebar"
import { PayablesContent } from "@/components/payables-content"

export default function PayablesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <PayablesContent />
      </main>
    </div>
  )
}
