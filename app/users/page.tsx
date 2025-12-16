import { Sidebar } from "@/components/sidebar"
import { UsersContent } from "@/components/users-content"

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <UsersContent />
      </div>
    </div>
  )
}
