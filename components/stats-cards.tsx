"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getCashFlowSummary, getReceivablesSummary, getPayablesSummary } from "@/lib/data-store"

export function StatsCards() {
  const [stats, setStats] = useState({
    cashFlow: { income: 0, expense: 0, netCashFlow: 0 },
    receivables: { total: 0, unpaid: 0 },
    payables: { total: 0, unpaid: 0 },
  })

  useEffect(() => {
    const updateStats = () => {
      const cashFlow = getCashFlowSummary()
      const receivables = getReceivablesSummary()
      const payables = getPayablesSummary()

      setStats({ cashFlow, receivables, payables })
    }

    updateStats()
    const interval = setInterval(updateStats, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const cardData = [
    {
      label: "Total Cash Balance",
      value: formatCurrency(stats.cashFlow.netCashFlow + 8000000000),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Cash Flow Net",
      value: formatCurrency(stats.cashFlow.netCashFlow),
      change: stats.cashFlow.income > stats.cashFlow.expense ? "+8.2%" : "-3.1%",
      trend: stats.cashFlow.income > stats.cashFlow.expense ? "up" : "down",
      icon: TrendingUp,
    },
    {
      label: "Piutang Outstanding",
      value: formatCurrency(stats.receivables.total),
      change: `${stats.receivables.unpaid} Invoice`,
      trend: "neutral",
      icon: AlertCircle,
    },
    {
      label: "Utang Outstanding",
      value: formatCurrency(stats.payables.total),
      change: `${stats.payables.unpaid} Bill`,
      trend: "neutral",
      icon: AlertCircle,
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((stat) => (
        <Card key={stat.label} className="p-4 bg-[var(--color-surface)] border-[var(--color-border)]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-[var(--color-muted-foreground)] mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-balance">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-[var(--color-success)]" />}
                {stat.trend === "down" && <TrendingDown className="h-4 w-4 text-[var(--color-danger)]" />}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-[var(--color-success)]"
                      : stat.trend === "down"
                        ? "text-[var(--color-danger)]"
                        : "text-[var(--color-muted-foreground)]"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center">
              <stat.icon className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
