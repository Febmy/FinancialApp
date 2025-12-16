import { PettyCashContent } from "@/components/petty-cash-content"

export default function PettyCashPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <PettyCashContent />
        </main>
      </div>
    </div>
  )
}
