import { Share, Alert, Platform } from 'react-native';
import { SalesSummary, SaleTransaction } from '../interface/sales';
import { formatCurrency, formatSalesDate } from './salesApi';

/**
 * Generate CSV text content for sales report
 */
export const generateCSVReport = (
  sales: SaleTransaction[],
  summary: SalesSummary,
  filterPreset: string,
): string => {
  const exportDate = new Date().toLocaleString();

  let csv = `BIZLK POS - SALES REPORT\n`;
  csv += `Exported On,${exportDate}\n`;
  csv += `Filter Period,${filterPreset}\n`;
  csv += `Total Revenue,${summary.totalRevenue}\n`;
  csv += `Total Transactions,${summary.totalCount}\n`;
  csv += `Average Order Value,${summary.avgOrderValue.toFixed(2)}\n`;
  csv += `Cash Revenue,${summary.cashTotal}\n`;
  csv += `Card Revenue,${summary.cardTotal}\n`;
  csv += `QR Revenue,${summary.qrTotal}\n`;
  csv += `Online Revenue,${summary.onlineTotal}\n\n`;

  // Headers
  csv += `Invoice No,Date & Time,Customer,Cashier,Payment Method,Status,Items Count,Subtotal,Discount,Tax,Total Amount\n`;

  // Data rows
  sales.forEach(s => {
    const customer = (s.customerName || 'Walk-in').replace(/,/g, ' ');
    const cashier = (s.cashierName || '-').replace(/,/g, ' ');
    const dateFormatted = formatSalesDate(s.date).replace(/,/g, ' ');

    csv += `"${s.invoiceNo}","${dateFormatted}","${customer}","${cashier}","${s.paymentMethod}","${s.status}",${s.items.length},${s.subtotal},${s.discount},${s.tax},${s.totalAmount}\n`;
  });

  // Summary Row
  csv += `\nSUMMARY TOTALS,,,,,,${summary.totalCount},,,${summary.totalRevenue}\n`;

  return csv;
};

/**
 * Generate HTML string for PDF report export / print view
 */
export const generatePDFReportHTML = (
  sales: SaleTransaction[],
  summary: SalesSummary,
  filterPreset: string,
): string => {
  const exportDate = new Date().toLocaleString();

  const rowsHtml = sales
    .map(
      (s, idx) => `
      <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
        <td><strong>${s.invoiceNo}</strong></td>
        <td>${formatSalesDate(s.date)}</td>
        <td>${s.customerName || 'Walk-in'}</td>
        <td><span class="badge ${s.paymentMethod.toLowerCase()}">${s.paymentMethod}</span></td>
        <td>${s.items.length} items</td>
        <td class="num">${formatCurrency(s.totalAmount)}</td>
      </tr>
    `,
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sales Report - BizLk POS</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 20px; color: #333; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7B468C; padding-bottom: 15px; margin-bottom: 20px; }
    .title { color: #7B468C; font-size: 24px; font-weight: bold; margin: 0; }
    .subtitle { color: #666; font-size: 13px; margin-top: 4px; }
    .badge-period { background: #7B468C; color: #fff; padding: 5px 12px; border-radius: 15px; font-weight: bold; font-size: 12px; }
    
    .stats-grid { display: flex; gap: 15px; margin-bottom: 25px; }
    .stat-box { flex: 1; background: #F8F4FA; border-left: 4px solid #7B468C; padding: 12px 15px; border-radius: 6px; }
    .stat-label { font-size: 11px; text-transform: uppercase; color: #666; font-weight: 600; }
    .stat-val { font-size: 18px; font-weight: bold; color: #7B468C; margin-top: 4px; }
    
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
    th { background: #7B468C; color: white; text-align: left; padding: 10px; font-weight: 600; }
    td { padding: 10px; border-bottom: 1px solid #eee; }
    tr.even { background: #fafafa; }
    .num { text-align: right; font-weight: bold; }
    
    .badge { padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
    .badge.cash { background: #E6F4EA; color: #137333; }
    .badge.card { background: #E8F0FE; color: #1A73E8; }
    .badge.qr { background: #FEF7E0; color: #B06000; }
    .badge.online { background: #FCE8E6; color: #C5221F; }

    .total-row { background: #F8F4FA; font-weight: bold; font-size: 14px; }
    .footer { margin-top: 30px; text-align: center; color: #999; font-size: 11px; border-top: 1px solid #eee; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">BizLk POS - Sales Report</div>
      <div class="subtitle">Generated on ${exportDate}</div>
    </div>
    <div class="badge-period">${filterPreset}</div>
  </div>

  <div class="stats-grid">
    <div class="stat-box">
      <div class="stat-label">Total Revenue</div>
      <div class="stat-val">${formatCurrency(summary.totalRevenue)}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Total Sales</div>
      <div class="stat-val">${summary.totalCount} Orders</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Avg Order Value</div>
      <div class="stat-val">${formatCurrency(summary.avgOrderValue)}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Invoice No</th>
        <th>Date & Time</th>
        <th>Customer</th>
        <th>Payment</th>
        <th>Items</th>
        <th style="text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
      <tr class="total-row">
        <td colspan="5">GRAND TOTAL (${summary.totalCount} Orders)</td>
        <td class="num">${formatCurrency(summary.totalRevenue)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    End of Report &bull; Powered by BizLk Mobile POS
  </div>
</body>
</html>
  `;
};

/**
 * Handle CSV or PDF Report Export via RN Share
 */
export const handleExportSales = async (
  sales: SaleTransaction[],
  summary: SalesSummary,
  filterPreset: string,
  format: 'CSV' | 'PDF',
) => {
  try {
    if (sales.length === 0) {
      Alert.alert('No Sales Data', 'There are no sales transactions to export for the selected filter.');
      return;
    }

    if (format === 'CSV') {
      const csvData = generateCSVReport(sales, summary, filterPreset);
      await Share.share({
        title: `Sales_Report_${filterPreset.replace(/\s+/g, '_')}.csv`,
        message: csvData,
      });
    } else {
      const pdfHtml = generatePDFReportHTML(sales, summary, filterPreset);
      await Share.share({
        title: `Sales_Report_${filterPreset.replace(/\s+/g, '_')}.html`,
        message: pdfHtml,
      });
    }
  } catch (error: any) {
    Alert.alert('Export Error', error?.message || 'Failed to export sales report.');
  }
};
