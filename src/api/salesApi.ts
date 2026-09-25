import {
  DateFilterPreset,
  SalesFilterState,
  SalesSummary,
  SaleTransaction,
} from '../interface/sales';

/**
 * Filter sales list based on Date Preset, Payment Method, and Search Query
 */
export const filterSalesData = (
  sales: SaleTransaction[],
  filter: SalesFilterState,
): SaleTransaction[] => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const yesterdayEnd = new Date(todayStart);

  const sevenDaysAgoStart = new Date(todayStart);
  sevenDaysAgoStart.setDate(sevenDaysAgoStart.getDate() - 6);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  return sales.filter(sale => {
    const saleDate = new Date(sale.date);

    // 1. Date Filter logic
    let matchesDate = true;
    switch (filter.datePreset) {
      case 'Today':
        matchesDate = saleDate >= todayStart;
        break;
      case 'Yesterday':
        matchesDate = saleDate >= yesterdayStart && saleDate < yesterdayEnd;
        break;
      case 'Last 7 Days':
        matchesDate = saleDate >= sevenDaysAgoStart;
        break;
      case 'This Month':
        matchesDate = saleDate >= thisMonthStart;
        break;
      case 'Last Month':
        matchesDate = saleDate >= lastMonthStart && saleDate <= lastMonthEnd;
        break;
      case 'All Time':
      default:
        matchesDate = true;
        break;
    }

    if (!matchesDate) return false;

    // 2. Payment Method Filter
    if (
      filter.paymentMethod &&
      filter.paymentMethod !== 'All' &&
      sale.paymentMethod.toLowerCase() !== filter.paymentMethod.toLowerCase()
    ) {
      return false;
    }

    // 3. Search Query Filter (Invoice No, Customer Name, Item Name)
    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.trim().toLowerCase();
      const matchInvoice = sale.invoiceNo.toLowerCase().includes(q);
      const matchCustomer = (sale.customerName || '').toLowerCase().includes(q);
      const matchCashier = (sale.cashierName || '').toLowerCase().includes(q);
      const matchItem = sale.items.some(i => i.name.toLowerCase().includes(q));

      if (!matchInvoice && !matchCustomer && !matchCashier && !matchItem) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Compute summary totals from a filtered sales list
 */
export const calculateSalesSummary = (sales: SaleTransaction[]): SalesSummary => {
  let totalRevenue = 0;
  let cashTotal = 0;
  let cardTotal = 0;
  let qrTotal = 0;
  let onlineTotal = 0;

  sales.forEach(sale => {
    if (sale.status !== 'Refunded') {
      totalRevenue += sale.totalAmount;

      switch (sale.paymentMethod) {
        case 'Cash':
          cashTotal += sale.totalAmount;
          break;
        case 'Card':
          cardTotal += sale.totalAmount;
          break;
        case 'QR':
          qrTotal += sale.totalAmount;
          break;
        case 'Online':
          onlineTotal += sale.totalAmount;
          break;
      }
    }
  });

  const totalCount = sales.length;
  const avgOrderValue = totalCount > 0 ? totalRevenue / totalCount : 0;

  return {
    totalRevenue,
    totalCount,
    avgOrderValue,
    cashTotal,
    cardTotal,
    qrTotal,
    onlineTotal,
  };
};

/**
 * Format currency string: e.g. Rs. 1,500.00
 */
export const formatCurrency = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format date for display: e.g. Sep 25, 2026, 10:15 AM
 */
export const formatSalesDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
