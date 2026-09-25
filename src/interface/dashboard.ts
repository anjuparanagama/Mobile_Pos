export type TimeframeFilter = 'Today' | 'Yesterday' | 'This Week' | 'This Month';

export type DashboardChartTab = 'revenue' | 'orders';

export interface KpiItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  changePercent?: string;
  isPositive?: boolean;
  iconName: 'dollar' | 'shopping-cart' | 'trending-up' | 'alert-triangle' | 'package' | 'percent';
  accentColor: string;
  bgTint: string;
}

export interface PaymentBreakdownItem {
  method: 'Cash' | 'Card' | 'QR' | 'Online';
  amount: number;
  formattedAmount: string;
  percentage: number;
  count: number;
  color: string;
}

export interface TopProductItem {
  id: string;
  name: string;
  category: string;
  soldUnits: number;
  revenue: string;
  stockLeft: number;
  trend: string;
}

export interface LowStockAlertItem {
  id: string;
  name: string;
  sku: string;
  stockLeft: number;
  minThreshold: number;
  category: string;
  urgency: 'critical' | 'warning';
}

export interface RecentTransactionItem {
  id: string;
  invoiceNo: string;
  customerName?: string;
  timeAgo: string;
  itemSummary: string;
  paymentMethod: 'Cash' | 'Card' | 'QR' | 'Online';
  amount: string;
  status: 'Completed' | 'Pending' | 'Refunded';
}

export interface DashboardMetrics {
  totalRevenue: string;
  totalSalesCount: number;
  netProfit: string;
  avgOrderValue: string;
  peakHour: string;
  lowStockCount: number;
}
