"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Sen", masuk: 185, keluar: 142 },
  { date: "Sel", masuk: 210, keluar: 165 },
  { date: "Rab", masuk: 195, keluar: 178 },
  { date: "Kam", masuk: 240, keluar: 145 },
  { date: "Jum", masuk: 225, keluar: 198 },
  { date: "Sab", masuk: 156, keluar: 125 },
  { date: "Min", masuk: 98, keluar: 87 },
]

export function CashFlowChart() {
  return (
    <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Cash Flow 7 Hari Terakhir</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Perbandingan Kas Masuk vs Kas Keluar (dalam jutaan)
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            stroke="var(--color-muted-foreground)"
            tick={{ fill: "var(--color-muted-foreground)" }}
          />
          <YAxis stroke="var(--color-muted-foreground)" tick={{ fill: "var(--color-muted-foreground)" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface-elevated)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-foreground)" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="masuk"
            stroke="var(--color-success)"
            strokeWidth={2}
            name="Kas Masuk"
            dot={{ fill: "var(--color-success)" }}
          />
          <Line
            type="monotone"
            dataKey="keluar"
            stroke="var(--color-danger)"
            strokeWidth={2}
            name="Kas Keluar"
            dot={{ fill: "var(--color-danger)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
