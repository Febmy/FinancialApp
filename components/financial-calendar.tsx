"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

const upcomingEvents = [
  {
    title: "Pembayaran Gaji",
    date: "25 Des 2024",
    time: "09:00",
    type: "payment",
    amount: "Rp 125.000.000",
  },
  {
    title: "Laporan SPT Masa PPN",
    date: "30 Des 2024",
    time: "16:00",
    type: "tax",
    description: "Deadline pelaporan",
  },
  {
    title: "Tutup Buku Bulan Desember",
    date: "31 Des 2024",
    time: "17:00",
    type: "closing",
    description: "Month-end closing",
  },
  {
    title: "Pembayaran PPh 21",
    date: "10 Jan 2025",
    time: "10:00",
    type: "tax",
    amount: "Rp 45.600.000",
  },
]

export function FinancialCalendar() {
  return (
    <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Kalender Keuangan</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">Jadwal pembayaran dan pelaporan</p>
        </div>
        <Calendar className="h-5 w-5 text-[var(--color-muted-foreground)]" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-hover)] transition-colors border border-[var(--color-border)]"
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  event.type === "payment"
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : event.type === "tax"
                      ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                      : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                }`}
              >
                {event.type === "payment" ? "Pembayaran" : event.type === "tax" ? "Pajak" : "Tutup Buku"}
              </span>
            </div>

            <h4 className="font-semibold text-sm mb-2 text-balance">{event.title}</h4>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
            </div>

            {event.amount && <p className="mt-3 text-sm font-semibold text-[var(--color-primary)]">{event.amount}</p>}
            {event.description && (
              <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">{event.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
