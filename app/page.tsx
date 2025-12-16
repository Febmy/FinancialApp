import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { CashFlowChart } from "@/components/cash-flow-chart"
import { ExpenseBreakdown } from "@/components/expense-breakdown"
import { RecentTransactions } from "@/components/recent-transactions"
import { AgingReports } from "@/components/aging-reports"
import { FinancialCalendar } from "@/components/financial-calendar"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          <StatsCards />

          <div className="grid lg:grid-cols-2 gap-6">
            <CashFlowChart />
            <ExpenseBreakdown />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>
            <div>
              <AgingReports />
            </div>
          </div>

          <FinancialCalendar />
        </div>
      </main>
    </div>
  )
}
