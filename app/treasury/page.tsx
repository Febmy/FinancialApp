import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { TreasuryContent } from "@/components/treasury-content"

export default function TreasuryPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <TreasuryContent />
      </main>
    </div>
  )
}
