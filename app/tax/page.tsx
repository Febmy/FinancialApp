import { Sidebar } from "@/components/sidebar"
import { TaxContent } from "@/components/tax-content"

export default function TaxPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <TaxContent />
      </main>
    </div>
  )
}
