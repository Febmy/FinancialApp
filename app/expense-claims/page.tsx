import { ExpenseClaimsContent } from "@/components/expense-claims-content"

export default function ExpenseClaimsPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <ExpenseClaimsContent />
        </main>
      </div>
    </div>
  )
}
