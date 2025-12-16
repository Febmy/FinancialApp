"use client"

import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { TransactionModal } from "@/components/transaction-modal"

export function DashboardHeader() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)] backdrop-blur-sm bg-opacity-95">
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                placeholder="Cari transaksi, invoice, atau laporan..."
                className="pl-10 bg-[var(--color-surface-elevated)] border-[var(--color-border)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              className="gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
              onClick={() => setShowModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Transaksi Baru</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[var(--color-danger)] rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <TransactionModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
