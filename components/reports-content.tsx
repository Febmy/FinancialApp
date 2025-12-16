"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart } from "lucide-react"
import { exportToPDF, exportToCSV, exportToExcel, exportToXML } from "@/lib/export-utils"

const reportCategories = [
  {
    title: "Laporan Harian",
    icon: Calendar,
    color: "var(--color-primary)",
    reports: [
      { name: "Daily Cash Position", description: "Posisi kas harian dengan breakdown" },
      { name: "Daily Sales Report", description: "Laporan penjualan harian per channel" },
      { name: "Bank Transaction Summary", description: "Ringkasan transaksi bank harian" },
    ],
  },
  {
    title: "Laporan Mingguan",
    icon: BarChart3,
    color: "var(--color-success)",
    reports: [
      { name: "Weekly Cash Flow Forecast", description: "Proyeksi cash flow 7 hari" },
      { name: "Weekly Aging Report", description: "Aging piutang dan utang mingguan" },
      { name: "Performance Dashboard", description: "Actual vs Budget week-to-date" },
    ],
  },
  {
    title: "Laporan Bulanan",
    icon: PieChart,
    color: "var(--color-warning)",
    reports: [
      { name: "Profit & Loss Statement", description: "Laporan laba rugi komparatif" },
      { name: "Balance Sheet", description: "Neraca posisi keuangan" },
      { name: "Cash Flow Statement", description: "Laporan arus kas metode tidak langsung" },
      { name: "Budget Variance Analysis", description: "Analisis selisih budget vs actual" },
      { name: "Tax Report", description: "Laporan PPN & PPh lengkap" },
    ],
  },
  {
    title: "Laporan Tahunan",
    icon: TrendingUp,
    color: "var(--color-danger)",
    reports: [
      { name: "Annual Financial Statements", description: "Laporan keuangan tahunan lengkap" },
      { name: "Management Report Package", description: "Paket laporan untuk manajemen" },
      { name: "Tax Annual Report", description: "SPT Tahunan dan rekonsiliasi fiskal" },
      { name: "Trend Analysis", description: "Analisis tren 12 bulan" },
    ],
  },
]

const quickReports = [
  {
    name: "Profit & Loss",
    period: "Januari 2024",
    revenue: 245000000,
    expense: 189000000,
    profit: 56000000,
    margin: 22.9,
  },
  {
    name: "Cash Flow",
    period: "Januari 2024",
    inflow: 312000000,
    outflow: 267000000,
    net: 45000000,
    change: 16.9,
  },
  {
    name: "Balance Sheet",
    period: "31 Jan 2024",
    assets: 1250000000,
    liabilities: 450000000,
    equity: 800000000,
    ratio: 2.78,
  },
]

export function ReportsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const handleExport = (reportName: string, format: string) => {
    console.log(`[v0] Exporting ${reportName} as ${format}`)

    // Mock report data
    const reportData = {
      reportName,
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      data: quickReports,
    }

    // Call appropriate export function based on format
    switch (format.toLowerCase()) {
      case "pdf":
        exportToPDF(reportName, reportData)
        break
      case "excel":
        exportToExcel(quickReports, reportName)
        break
      case "csv":
        exportToCSV(quickReports, reportName)
        break
      case "xml":
        exportToXML(reportName, reportData)
        break
      default:
        alert(`Export format ${format} not supported yet`)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">Laporan Keuangan</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Generate dan download laporan keuangan lengkap
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="this-week">Minggu Ini</SelectItem>
              <SelectItem value="this-month">Bulan Ini</SelectItem>
              <SelectItem value="last-month">Bulan Lalu</SelectItem>
              <SelectItem value="this-year">Tahun Ini</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Reports Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {quickReports.map((report, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm text-[var(--color-muted-foreground)]">{report.name}</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{report.period}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5"
                onClick={() => handleExport(report.name, selectedFormat)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>

            {report.name === "Profit & Loss" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Revenue</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.revenue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Expense</span>
                  <span className="font-medium text-[var(--color-danger)]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.expense)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[var(--color-border)] flex justify-between">
                  <span className="font-semibold text-sm">Net Profit</span>
                  <div className="text-right">
                    <div className="font-bold text-[var(--color-success)]">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(report.profit)}
                    </div>
                    <div className="text-xs text-[var(--color-success)] flex items-center gap-1 justify-end">
                      <TrendingUp className="h-3 w-3" />
                      {report.margin}% margin
                    </div>
                  </div>
                </div>
              </div>
            )}

            {report.name === "Cash Flow" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Inflow</span>
                  <span className="font-medium text-[var(--color-success)]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.inflow)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Outflow</span>
                  <span className="font-medium text-[var(--color-danger)]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.outflow)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[var(--color-border)] flex justify-between">
                  <span className="font-semibold text-sm">Net Flow</span>
                  <div className="text-right">
                    <div className="font-bold text-[var(--color-success)]">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(report.net)}
                    </div>
                    <div className="text-xs text-[var(--color-success)] flex items-center gap-1 justify-end">
                      <TrendingUp className="h-3 w-3" />+{report.change}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {report.name === "Balance Sheet" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Assets</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.assets)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]">Liabilities</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(report.liabilities)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[var(--color-border)] flex justify-between">
                  <span className="font-semibold text-sm">Equity</span>
                  <div className="text-right">
                    <div className="font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(report.equity)}
                    </div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">Ratio: {report.ratio}x</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {reportCategories.map((category, catIndex) => (
          <Card key={catIndex} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <category.icon className="h-5 w-5" style={{ color: category.color }} />
              </div>
              <h3 className="font-semibold text-lg">{category.title}</h3>
            </div>

            <div className="space-y-2">
              {category.reports.map((report, repIndex) => (
                <div
                  key={repIndex}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-surface-hover)] cursor-pointer transition-colors group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                      <span className="text-sm font-medium">{report.name}</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-1 ml-6">{report.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity gap-1.5"
                    onClick={() => handleExport(report.name, selectedFormat)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="text-xs">Download</span>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
