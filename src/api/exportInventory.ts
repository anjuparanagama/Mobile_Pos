import { Share, Alert } from 'react-native';
import { InventoryItem, InventorySummary } from '../interface/inventory';

/**
 * Helper to format currency
 */
const formatRs = (val: number) => {
  return `Rs. ${val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Generate CSV string content for inventory items
 */
export const generateInventoryCSVReport = (
  items: InventoryItem[],
  summary: InventorySummary,
  selectedCategory: string,
): string => {
  const exportDate = new Date().toLocaleString();

  let csv = `BIZLK POS - INVENTORY STOCK REPORT\n`;
  csv += `Exported On,${exportDate}\n`;
  csv += `Category Filter,${selectedCategory}\n`;
  csv += `Total Products,${summary.totalItems}\n`;
  csv += `Total Stock Valuation,${summary.totalValue}\n`;
  csv += `Low Stock Count,${summary.lowStockCount}\n`;
  csv += `Out of Stock Count,${summary.outOfStockCount}\n\n`;

  // Table Headers
  csv += `ID,SKU,Product Name,Category,Unit Price (Rs),Quantity,Unit,Stock Status,Valuation (Rs)\n`;

  // Data rows
  items.forEach(item => {
    const name = item.name.replace(/,/g, ' ');
    const cat = (item.category || 'General').replace(/,/g, ' ');
    const sku = item.sku || '-';
    const minStock = item.minStockLevel || 5;

    let status = 'In Stock';
    if (item.quantity === 0) {
      status = 'Out of Stock';
    } else if (item.quantity <= minStock) {
      status = 'Low Stock';
    }

    const itemValuation = item.quantity * (item.price || 0);

    csv += `${item.id},"${sku}","${name}","${cat}",${item.price || 0},${item.quantity},"${item.unit}","${status}",${itemValuation}\n`;
  });

  // Summary footer
  csv += `\nSUMMARY TOTALS,,,TOTAL PRODUCTS: ${summary.totalItems},,,TOTAL VALUATION:,,${summary.totalValue}\n`;

  return csv;
};

/**
 * Generate HTML for print / PDF view of inventory
 */
export const generateInventoryPDFHTML = (
  items: InventoryItem[],
  summary: InventorySummary,
  selectedCategory: string,
): string => {
  const exportDate = new Date().toLocaleString();

  const rowsHtml = items
    .map((item, idx) => {
      const minStock = item.minStockLevel || 5;
      let statusClass = 'instock';
      let statusLabel = 'In Stock';

      if (item.quantity === 0) {
        statusClass = 'outstock';
        statusLabel = 'Out of Stock';
      } else if (item.quantity <= minStock) {
        statusClass = 'lowstock';
        statusLabel = `Low Stock (${item.quantity})`;
      }

      const itemValuation = item.quantity * (item.price || 0);

      return `
      <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
        <td><code>${item.sku || `SKU-${item.id}`}</code></td>
        <td><strong>${item.name}</strong></td>
        <td><span class="cat-pill">${item.category || 'General'}</span></td>
        <td>${formatRs(item.price || 0)}</td>
        <td><strong>${item.quantity}</strong> ${item.unit}</td>
        <td><span class="badge ${statusClass}">${statusLabel}</span></td>
        <td class="num">${formatRs(itemValuation)}</td>
      </tr>
    `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inventory Stock Report - BizLk POS</title>
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

    .cat-pill { background: #F3E8FF; color: #7B468C; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
    
    .badge { padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
    .badge.instock { background: #E6F4EA; color: #137333; }
    .badge.lowstock { background: #FEF7E0; color: #B06000; }
    .badge.outstock { background: #FCE8E6; color: #C5221F; }

    .total-row { background: #F8F4FA; font-weight: bold; font-size: 14px; }
    .footer { margin-top: 30px; text-align: center; color: #999; font-size: 11px; border-top: 1px solid #eee; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">BizLk POS - Inventory Report</div>
      <div class="subtitle">Generated on ${exportDate}</div>
    </div>
    <div class="badge-period">Category: ${selectedCategory}</div>
  </div>

  <div class="stats-grid">
    <div class="stat-box">
      <div class="stat-label">Total Products</div>
      <div class="stat-val">${summary.totalItems} Items</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Stock Valuation</div>
      <div class="stat-val">${formatRs(summary.totalValue)}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Low / Out of Stock</div>
      <div class="stat-val">${summary.lowStockCount} / ${summary.outOfStockCount}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>SKU</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>Unit Price</th>
        <th>Stock Qty</th>
        <th>Status</th>
        <th style="text-align: right;">Valuation</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
      <tr class="total-row">
        <td colspan="6">TOTAL INVENTORY VALUATION (${summary.totalItems} Products)</td>
        <td class="num">${formatRs(summary.totalValue)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    End of Inventory Report &bull; Powered by BizLk Mobile POS
  </div>
</body>
</html>
  `;
};

/**
 * Main export handler function
 */
export const handleExportInventory = async (
  items: InventoryItem[],
  summary: InventorySummary,
  selectedCategory: string,
  format: 'CSV' | 'PDF',
) => {
  try {
    if (items.length === 0) {
      Alert.alert(
        'No Inventory Data',
        'There are no inventory items to export for the selected filter.',
      );
      return;
    }

    if (format === 'CSV') {
      const csvData = generateInventoryCSVReport(items, summary, selectedCategory);
      await Share.share({
        title: `Inventory_Report_${selectedCategory.replace(/\s+/g, '_')}.csv`,
        message: csvData,
      });
    } else {
      const pdfHtml = generateInventoryPDFHTML(items, summary, selectedCategory);
      await Share.share({
        title: `Inventory_Report_${selectedCategory.replace(/\s+/g, '_')}.html`,
        message: pdfHtml,
      });
    }
  } catch (error: any) {
    Alert.alert(
      'Export Error',
      error?.message || 'Failed to export inventory report.',
    );
  }
};
