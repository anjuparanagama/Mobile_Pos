import { DateFilterPreset, SaleTransaction } from '../interface/sales';

export const DATE_FILTER_PRESETS: DateFilterPreset[] = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'This Month',
  'Last Month',
  'All Time',
];

export const PAYMENT_METHODS_OPTIONS = ['All', 'Cash', 'Card', 'QR', 'Online'];

// Helper to format dates relative to current date for realistic mock testing
const now = new Date();
const formatDateIso = (daysAgo: number, hours: number, mins: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hours, mins, 0, 0);
  return d.toISOString();
};

// Helper for last month date
const getLastMonthIso = (dayOfMonth: number, hours: number, mins: number) => {
  const d = new Date(now);
  d.setMonth(d.getMonth() - 1);
  d.setDate(dayOfMonth);
  d.setHours(hours, mins, 0, 0);
  return d.toISOString();
};

export const INITIAL_SALES_DATA: SaleTransaction[] = [
  {
    id: 'SALE-101',
    invoiceNo: 'INV-2026-001',
    date: formatDateIso(0, 10, 15), // Today morning
    customerName: 'Walk-in Customer',
    cashierName: 'John Doe',
    paymentMethod: 'Cash',
    items: [
      { id: 1, name: 'Burger', qty: 2, unitPrice: 600, totalPrice: 1200 },
      { id: 2, name: 'Coca Cola 500ml', qty: 2, unitPrice: 180, totalPrice: 360 },
    ],
    subtotal: 1560,
    tax: 0,
    discount: 60,
    totalAmount: 1500,
    status: 'Completed',
  },
  {
    id: 'SALE-102',
    invoiceNo: 'INV-2026-002',
    date: formatDateIso(0, 11, 45), // Today
    customerName: 'Saman Perera',
    cashierName: 'John Doe',
    paymentMethod: 'Card',
    items: [
      { id: 3, name: 'Rice 5Kg', qty: 2, unitPrice: 1450, totalPrice: 2900 },
      { id: 4, name: 'Milk Powder 400g', qty: 1, unitPrice: 1100, totalPrice: 1100 },
    ],
    subtotal: 4000,
    tax: 0,
    discount: 0,
    totalAmount: 4000,
    status: 'Completed',
  },
  {
    id: 'SALE-103',
    invoiceNo: 'INV-2026-003',
    date: formatDateIso(0, 14, 20), // Today
    customerName: 'Kamal Silva',
    cashierName: 'Sarah Jenkins',
    paymentMethod: 'QR',
    items: [
      { id: 5, name: 'Coffee Regular', qty: 2, unitPrice: 350, totalPrice: 700 },
      { id: 6, name: 'Chocolate Muffin', qty: 2, unitPrice: 400, totalPrice: 800 },
    ],
    subtotal: 1500,
    tax: 0,
    discount: 50,
    totalAmount: 1450,
    status: 'Completed',
  },
  {
    id: 'SALE-104',
    invoiceNo: 'INV-2026-004',
    date: formatDateIso(1, 9, 30), // Yesterday
    customerName: 'Nimali Fernando',
    cashierName: 'John Doe',
    paymentMethod: 'Cash',
    items: [
      { id: 7, name: 'Sugar 1Kg', qty: 3, unitPrice: 280, totalPrice: 840 },
      { id: 8, name: 'Ceylon Tea Bags 100s', qty: 1, unitPrice: 950, totalPrice: 950 },
    ],
    subtotal: 1790,
    tax: 0,
    discount: 40,
    totalAmount: 1750,
    status: 'Completed',
  },
  {
    id: 'SALE-105',
    invoiceNo: 'INV-2026-005',
    date: formatDateIso(1, 16, 10), // Yesterday
    customerName: 'Walk-in Customer',
    cashierName: 'Sarah Jenkins',
    paymentMethod: 'Card',
    items: [
      { id: 9, name: 'Pizza Large Supreme', qty: 1, unitPrice: 3200, totalPrice: 3200 },
      { id: 10, name: 'Garlic Bread', qty: 1, unitPrice: 750, totalPrice: 750 },
    ],
    subtotal: 3950,
    tax: 0,
    discount: 150,
    totalAmount: 3800,
    status: 'Completed',
  },
  {
    id: 'SALE-106',
    invoiceNo: 'INV-2026-006',
    date: formatDateIso(3, 13, 0), // 3 days ago (Last 7 days)
    customerName: 'Ruwan Kumara',
    cashierName: 'John Doe',
    paymentMethod: 'Online',
    items: [
      { id: 11, name: 'Detergent Powder 1kg', qty: 2, unitPrice: 650, totalPrice: 1300 },
      { id: 12, name: 'Dishwash Liquid 500ml', qty: 1, unitPrice: 420, totalPrice: 420 },
    ],
    subtotal: 1720,
    tax: 0,
    discount: 20,
    totalAmount: 1700,
    status: 'Completed',
  },
  {
    id: 'SALE-107',
    invoiceNo: 'INV-2026-007',
    date: formatDateIso(5, 17, 45), // 5 days ago (Last 7 days)
    customerName: 'Anura Bandara',
    cashierName: 'Sarah Jenkins',
    paymentMethod: 'Cash',
    items: [
      { id: 13, name: 'Fresh Milk 1L', qty: 4, unitPrice: 480, totalPrice: 1920 },
      { id: 14, name: 'Butter 200g', qty: 2, unitPrice: 850, totalPrice: 1700 },
    ],
    subtotal: 3620,
    tax: 0,
    discount: 120,
    totalAmount: 3500,
    status: 'Completed',
  },
  {
    id: 'SALE-108',
    invoiceNo: 'INV-2026-008',
    date: getLastMonthIso(15, 11, 20), // Last month
    customerName: 'Chathuri Jayasinghe',
    cashierName: 'John Doe',
    paymentMethod: 'Card',
    items: [
      { id: 15, name: 'Olive Oil 500ml', qty: 1, unitPrice: 2450, totalPrice: 2450 },
      { id: 16, name: 'Pasta 500g', qty: 3, unitPrice: 380, totalPrice: 1140 },
    ],
    subtotal: 3590,
    tax: 0,
    discount: 90,
    totalAmount: 3500,
    status: 'Completed',
  },
  {
    id: 'SALE-109',
    invoiceNo: 'INV-2026-009',
    date: getLastMonthIso(22, 15, 30), // Last month
    customerName: 'Walk-in Customer',
    cashierName: 'Sarah Jenkins',
    paymentMethod: 'Cash',
    items: [
      { id: 17, name: 'Basmati Rice 5kg', qty: 1, unitPrice: 2800, totalPrice: 2800 },
      { id: 18, name: 'Cooking Oil 2L', qty: 1, unitPrice: 1950, totalPrice: 1950 },
    ],
    subtotal: 4750,
    tax: 0,
    discount: 250,
    totalAmount: 4500,
    status: 'Completed',
  },
  {
    id: 'SALE-110',
    invoiceNo: 'INV-2026-010',
    date: getLastMonthIso(28, 18, 10), // Last month
    customerName: 'Kasun Wickramasinghe',
    cashierName: 'John Doe',
    paymentMethod: 'QR',
    items: [
      { id: 19, name: 'Fruit Juice 1L', qty: 3, unitPrice: 620, totalPrice: 1860 },
      { id: 20, name: 'Biscuits Pack', qty: 4, unitPrice: 210, totalPrice: 840 },
    ],
    subtotal: 2700,
    tax: 0,
    discount: 100,
    totalAmount: 2600,
    status: 'Completed',
  },
];
