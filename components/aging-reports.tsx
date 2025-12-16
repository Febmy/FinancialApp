"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const agingData = {
  piutang: [
    { range: "< 7 hari", amount: 456000000, count: 12 },
    { range: "7-30 hari", amount: 1234500000, count: 28 },
    { range: "> 30 hari", amount: 1157000000, count: 18 },
  ],
  utang: [
    { range: "< 7 hari", amount: 234800000, count: 8 },
    { range: "7-30 hari", amount: 789400000, count: 15 },
    { range: "> 30 hari", amount: 210600000, count: 5 },
  ],
}

export function AgingReports() {
  return (
    <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Aging Report</h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">Status piutang & utang</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
            <h4 className="text-sm font-semibold">Piutang</h4>
          </div>
          <div className="space-y-2">
            {agingData.piutang.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-[var(--color-surface-elevated)]"
              >
                <div>
                  <p className="text-sm font-medium">{item.range}</p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{item.count} invoice</p>
                </div>
                <p className="text-sm font-semibold">Rp {(item.amount / 1000000).toFixed(0)}jt</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-[var(--color-danger)]" />
            <h4 className="text-sm font-semibold">Utang</h4>
          </div>
          <div className="space-y-2">
            {agingData.utang.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-[var(--color-surface-elevated)]"
              >
                <div>
                  <p className="text-sm font-medium">{item.range}</p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{item.count} invoice</p>
                </div>
                <p className="text-sm font-semibold">Rp {(item.amount / 1000000).toFixed(0)}jt</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--color-warning)]/10">
            <AlertCircle className="h-4 w-4 text-[var(--color-warning)] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[var(--color-warning)]">15 Invoice Jatuh Tempo</p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-1">Dalam 7 hari ke depan</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
