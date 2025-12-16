"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "COGS", value: 35, color: "#3b82f6" },
  { name: "Gaji", value: 28, color: "#10b981" },
  { name: "Operasional", value: 18, color: "#f59e0b" },
  { name: "Marketing", value: 12, color: "#ef4444" },
  { name: "Lainnya", value: 7, color: "#8b5cf6" },
]

export function ExpenseBreakdown() {
  return (
    <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Breakdown Pengeluaran Bulan Ini</h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">Distribusi pengeluaran berdasarkan kategori</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface-elevated)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[var(--color-muted-foreground)]">{item.name}</span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
