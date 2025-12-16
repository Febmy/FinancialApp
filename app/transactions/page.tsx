import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionsContent } from "@/components/transactions-content"

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <TransactionsContent />
      </main>
    </div>
  )
}
