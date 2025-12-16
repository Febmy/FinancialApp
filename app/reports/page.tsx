import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportsContent } from "@/components/reports-content"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <ReportsContent />
      </main>
    </div>
  )
}
