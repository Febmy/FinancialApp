"use client"

// Export utilities for generating reports in various formats

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    alert("No data to export")
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Escape values that contain commas or quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(reportName: string, reportData: any) {
  // In production, this would generate actual PDF using libraries like jsPDF or pdfmake
  // For now, we'll create a printable HTML version

  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Please allow pop-ups to download PDF")
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${reportName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
          }
          h1 {
            color: #1e40af;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #1e40af;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .header-info {
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header-info">
          <h1>${reportName}</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleString("id-ID")}</p>
          <p><strong>Company:</strong> FinanceHub Management System</p>
        </div>
        
        <div id="content">
          ${JSON.stringify(reportData, null, 2)}
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} FinanceHub - Confidential Report</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}

export function exportToExcel(data: any[], filename: string) {
  // For production, use libraries like xlsx or exceljs
  // For now, export as CSV which Excel can open
  exportToCSV(data, filename)
  alert("File exported as CSV format (compatible with Excel)")
}

export function exportToXML(reportName: string, data: any) {
  if (!data) {
    alert("No data to export")
    return
  }

  // Simple XML conversion
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Report>
  <Name>${reportName}</Name>
  <GeneratedDate>${new Date().toISOString()}</GeneratedDate>
  <Data>${JSON.stringify(data)}</Data>
</Report>`

  const blob = new Blob([xmlContent], { type: "application/xml" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${reportName.replace(/\s+/g, "_")}.xml`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Report generation helpers
export function generateFinancialReport(reportType: string, period: string) {
  const reportData = {
    reportType,
    period,
    generatedAt: new Date().toISOString(),
    status: "Generated successfully",
  }

  return reportData
}

// Additional export utility for JSON format
export function exportToJson(data: any, filename: string) {
  if (!data) {
    alert("No data to export")
    return
  }

  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: "application/json" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.json`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
