"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Receipt,
  FileText,
  TrendingUp,
  Wallet,
  CreditCard,
  Building2,
  Calculator,
  Users,
  Settings,
  Menu,
  X,
  Target,
  CheckSquare,
  FolderOpen,
  BookOpen,
  FileEdit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Transaksi", icon: Receipt, href: "/transactions" },
  { name: "Laporan", icon: FileText, href: "/reports" },
  { name: "Analytics", icon: TrendingUp, href: "/analytics" },
  { name: "Kas & Bank", icon: Wallet, href: "/treasury" },
  { name: "Piutang", icon: CreditCard, href: "/receivables" },
  { name: "Utang", icon: CreditCard, href: "/payables" },
  { name: "Aset Tetap", icon: Building2, href: "/assets" },
  { name: "Pajak", icon: Calculator, href: "/tax" },
  { name: "Budgeting", icon: Target, href: "/budgeting" },
  { name: "Petty Cash", icon: Wallet, href: "/petty-cash" },
  { name: "Expense Claims", icon: Receipt, href: "/expense-claims" },
  { name: "Approvals", icon: CheckSquare, href: "/approvals" },
  { name: "Documents", icon: FolderOpen, href: "/documents" },
  { name: "Chart of Accounts", icon: BookOpen, href: "/chart-of-accounts" },
  { name: "Journal", icon: FileEdit, href: "/journal" },
  { name: "Integrations", icon: Settings, href: "/integrations" },
  { name: "Users", icon: Users, href: "/users" },
  { name: "Pengaturan", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)]
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-balance">FinanceAys</h1>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">Management System</p>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-white"
                  }
                `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3 px-2">
              <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold">
                CF
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">CFO Admin</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">cfo@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
