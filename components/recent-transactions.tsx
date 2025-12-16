"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { getTransactions, type Transaction } from "@/lib/data-store"

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const updateTransactions = () => {
      const allTransactions = getTransactions()
      setTransactions(allTransactions.slice(0, 5))
    }

    updateTransactions()
    const interval = setInterval(updateTransactions, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Transaksi Terbaru</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{transactions.length} transaksi terakhir</p>
        </div>
        <Link href="/transactions" className="text-sm text-[var(--color-primary)] hover:underline">
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-[var(--color-muted-foreground)] py-8">Belum ada transaksi</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    transaction.type === "income" ? "bg-[var(--color-success)]/10" : "bg-[var(--color-danger)]/10"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-5 w-5 text-[var(--color-success)]" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-[var(--color-danger)]" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[var(--color-muted-foreground)]">{transaction.category}</span>
                    <span className="text-xs text-[var(--color-muted-foreground)]">•</span>
                    <span className="text-xs text-[var(--color-muted-foreground)]">{transaction.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "income" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}Rp {transaction.amount.toLocaleString("id-ID")}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === "completed"
                      ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                      : "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                  }`}
                >
                  {transaction.status === "completed" ? "Selesai" : "Pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
