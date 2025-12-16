import { Sidebar } from "@/components/sidebar"
import { JournalContent } from "@/components/journal-content"

export default function JournalPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <JournalContent />
      </div>
    </div>
  )
}
