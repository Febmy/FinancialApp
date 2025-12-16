import { Sidebar } from "@/components/sidebar"
import { ChartOfAccountsContent } from "@/components/chart-of-accounts-content"

export default function ChartOfAccountsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ChartOfAccountsContent />
      </div>
    </div>
  )
}
