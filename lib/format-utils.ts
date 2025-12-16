// Utility functions for formatting data

export function formatCurrency(amount: number, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string, format: "short" | "long" = "short"): string {
  const date = new Date(dateString)

  if (format === "long") {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value)
}

export function getDaysDifference(startDate: string, endDate: string = new Date().toISOString()): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function getAgingCategory(days: number): "current" | "30" | "60" | "90+" {
  if (days <= 30) return "current"
  if (days <= 60) return "30"
  if (days <= 90) return "60"
  return "90+"
}

export function getStatusColor(status: string): "default" | "secondary" | "destructive" | "outline" | "success" {
  const statusMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "success"> = {
    completed: "default",
    paid: "default",
    active: "default",
    pending: "secondary",
    unpaid: "secondary",
    cancelled: "destructive",
    overdue: "destructive",
    inactive: "outline",
    partial: "outline",
  }

  return statusMap[status.toLowerCase()] || "default"
}
