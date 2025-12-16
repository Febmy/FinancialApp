import { Sidebar } from "@/components/sidebar"
import { BudgetingContent } from "@/components/budgeting-content"

export default function BudgetingPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <BudgetingContent />
      </div>
    </div>
  )
}
