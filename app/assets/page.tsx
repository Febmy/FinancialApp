import { Sidebar } from "@/components/sidebar"
import { AssetsContent } from "@/components/assets-content"

export default function AssetsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <AssetsContent />
      </main>
    </div>
  )
}
