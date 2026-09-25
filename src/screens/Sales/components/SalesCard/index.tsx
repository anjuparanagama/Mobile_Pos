import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  Banknote,
  CreditCard,
  QrCode,
  Globe,
  Share2,
} from 'lucide-react-native';
import { SaleTransaction } from '../../../../interface/sales';
import { formatCurrency, formatSalesDate } from '../../../../api/salesApi';

interface SalesCardProps {
  sale: SaleTransaction;
  onPressDetails: (sale: SaleTransaction) => void;
  onShareSale: (sale: SaleTransaction) => void;
}

const PRIMARY = '#7B468C';

export default function SalesCard({
  sale,
  onPressDetails,
  onShareSale,
}: SalesCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getPaymentIcon = () => {
    switch (sale.paymentMethod) {
      case 'Cash':
        return <Banknote size={14} color="#16A34A" />;
      case 'Card':
        return <CreditCard size={14} color="#2563EB" />;
      case 'QR':
        return <QrCode size={14} color="#D97706" />;
      case 'Online':
        return <Globe size={14} color="#DC2626" />;
      default:
        return <CreditCard size={14} color="#6B7280" />;
    }
  };

  const getPaymentBadgeStyle = () => {
    switch (sale.paymentMethod) {
      case 'Cash':
        return { bg: '#DCFCE7', text: '#15803D' };
      case 'Card':
        return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'QR':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'Online':
        return { bg: '#FEE2E2', text: '#B91C1C' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const badgeStyle = getPaymentBadgeStyle();

  return (
    <View style={styles.card}>
      {/* Top Header: Invoice No & Date */}
      <View style={styles.headerRow}>
        <View style={styles.invoiceBox}>
          <FileText size={16} color={PRIMARY} />
          <Text style={styles.invoiceNo}>{sale.invoiceNo}</Text>
        </View>

        <View style={styles.dateBox}>
          <Clock size={12} color="#9CA3AF" />
          <Text style={styles.dateText}>{formatSalesDate(sale.date)}</Text>
        </View>
      </View>

      {/* Info Row: Customer & Payment Badge */}
      <View style={styles.infoRow}>
        <View style={styles.customerBox}>
          <User size={13} color="#6B7280" />
          <Text style={styles.customerText} numberOfLines={1}>
            {sale.customerName || 'Walk-in Customer'}
          </Text>
        </View>

        <View style={[styles.paymentBadge, { backgroundColor: badgeStyle.bg }]}>
          {getPaymentIcon()}
          <Text style={[styles.paymentText, { color: badgeStyle.text }]}>
            {sale.paymentMethod}
          </Text>
        </View>
      </View>

      {/* Summary Footer: Items count & Total Amount */}
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.itemsCount}>
            {sale.items.length} {sale.items.length === 1 ? 'item' : 'items'}
          </Text>
          <TouchableOpacity
            style={styles.expandBtn}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.expandText}>
              {expanded ? 'Hide items' : 'View items'}
            </Text>
            {expanded ? (
              <ChevronUp size={14} color={PRIMARY} />
            ) : (
              <ChevronDown size={14} color={PRIMARY} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{formatCurrency(sale.totalAmount)}</Text>
        </View>
      </View>

      {/* Expandable Items Preview */}
      {expanded && (
        <View style={styles.itemsContainer}>
          {sale.items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.qty}x {item.name}
              </Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(item.totalPrice)}
              </Text>
            </View>
          ))}

          {sale.discount > 0 && (
            <View style={styles.itemRow}>
              <Text style={styles.discountText}>Discount</Text>
              <Text style={styles.discountText}>
                -{formatCurrency(sale.discount)}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => onPressDetails(sale)}
        >
          <FileText size={14} color={PRIMARY} />
          <Text style={styles.receiptBtnText}>View Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => onShareSale(sale)}
        >
          <Share2 size={14} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  invoiceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  invoiceNo: {
    fontSize: 14,
    fontWeight: '700',
    color: PRIMARY,
  },

  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  dateText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  customerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  customerText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },

  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  paymentText: {
    fontSize: 11,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
  },

  itemsCount: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },

  expandText: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '600',
  },

  totalBox: {
    alignItems: 'flex-end',
  },

  totalLabel: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '600',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },

  itemsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },

  itemName: {
    fontSize: 12,
    color: '#4B5563',
  },

  itemPrice: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },

  discountText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },

  receiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F3E8FF',
  },

  receiptBtnText: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '700',
  },

  shareBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
});
