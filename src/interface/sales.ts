export type PaymentMethod = 'Cash' | 'Card' | 'QR' | 'Online';
export type SaleStatus = 'Completed' | 'Refunded' | 'Pending';

export type DateFilterPreset =
  | 'Today'
  | 'Yesterday'
  | 'Last 7 Days'
  | 'This Month'
  | 'Last Month'
  | 'All Time';

export interface SaleItem {
  id: string | number;
  name: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SaleTransaction {
  id: string;
  invoiceNo: string;
  date: string; // ISO date string or YYYY-MM-DD THH:mm:ss
  customerName?: string;
  cashierName?: string;
  paymentMethod: PaymentMethod;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: SaleStatus;
}

export interface SalesFilterState {
  datePreset: DateFilterPreset;
  paymentMethod: string; // 'All' or PaymentMethod
  searchQuery: string;
}

export interface SalesSummary {
  totalRevenue: number;
  totalCount: number;
  avgOrderValue: number;
  cashTotal: number;
  cardTotal: number;
  qrTotal: number;
  onlineTotal: number;
}
