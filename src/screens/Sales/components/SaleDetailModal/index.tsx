import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X, FileText, Share2, CheckCircle2 } from 'lucide-react-native';
import { SaleTransaction } from '../../../../interface/sales';
import { formatCurrency, formatSalesDate } from '../../../../api/salesApi';

interface SaleDetailModalProps {
  visible: boolean;
  sale: SaleTransaction | null;
  onClose: () => void;
  onShare: (sale: SaleTransaction) => void;
}

const PRIMARY = '#7B468C';

export default function SaleDetailModal({
  visible,
  sale,
  onClose,
  onShare,
}: SaleDetailModalProps) {
  if (!sale) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <FileText size={20} color={PRIMARY} />
              <Text style={styles.headerTitle}>Sales Invoice</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            {/* Store & Receipt Banner */}
            <View style={styles.banner}>
              <Text style={styles.storeName}>BIZLK POS STORE</Text>
              <Text style={styles.invoiceNo}>{sale.invoiceNo}</Text>
              <View style={styles.statusBadge}>
                <CheckCircle2 size={12} color="#16A34A" />
                <Text style={styles.statusText}>{sale.status}</Text>
              </View>
            </View>

            {/* Receipt Meta info */}
            <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Date & Time</Text>
                <Text style={styles.metaValue}>{formatSalesDate(sale.date)}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Payment Method</Text>
                <Text style={styles.metaValue}>{sale.paymentMethod}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Customer</Text>
                <Text style={styles.metaValue}>{sale.customerName || 'Walk-in'}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Cashier</Text>
                <Text style={styles.metaValue}>{sale.cashierName || 'System'}</Text>
              </View>
            </View>

            {/* Line Items Table */}
            <Text style={styles.sectionHeader}>Purchased Items</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Item</Text>
                <Text style={[styles.th, { flex: 0.8, textAlign: 'center' }]}>
                  Qty
                </Text>
                <Text style={[styles.th, { flex: 1.2, textAlign: 'right' }]}>
                  Price
                </Text>
                <Text style={[styles.th, { flex: 1.2, textAlign: 'right' }]}>
                  Total
                </Text>
              </View>

              {sale.items.map((item, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.td, { flex: 2, fontWeight: '600' }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.td, { flex: 0.8, textAlign: 'center' }]}>
                    {item.qty}
                  </Text>
                  <Text style={[styles.td, { flex: 1.2, textAlign: 'right' }]}>
                    {formatCurrency(item.unitPrice)}
                  </Text>
                  <Text style={[styles.td, { flex: 1.2, textAlign: 'right', fontWeight: '700' }]}>
                    {formatCurrency(item.totalPrice)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calculation Totals */}
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalVal}>{formatCurrency(sale.subtotal)}</Text>
              </View>

              {sale.discount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.discountLabel}>Discount</Text>
                  <Text style={styles.discountVal}>
                    -{formatCurrency(sale.discount)}
                  </Text>
                </View>
              )}

              {sale.tax > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax</Text>
                  <Text style={styles.totalVal}>{formatCurrency(sale.tax)}</Text>
                </View>
              )}

              <View style={[styles.totalRow, styles.grandTotalRow]}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalVal}>
                  {formatCurrency(sale.totalAmount)}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={() => onShare(sale)}
            >
              <Share2 size={16} color="#FFFFFF" />
              <Text style={styles.shareBtnText}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalBtn} onPress={onClose}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  closeBtn: {
    padding: 4,
  },

  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  banner: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  storeName: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
    letterSpacing: 1,
  },

  invoiceNo: {
    fontSize: 20,
    fontWeight: '800',
    color: PRIMARY,
    marginVertical: 4,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
  },

  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 10,
  },

  metaItem: {
    width: '46%',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
  },

  metaLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },

  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginTop: 10,
    marginBottom: 6,
  },

  table: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 8,
  },

  th: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '700',
  },

  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  td: {
    fontSize: 11,
    color: '#1F2937',
  },

  totalsBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },

  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  totalVal: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },

  discountLabel: {
    fontSize: 12,
    color: '#DC2626',
  },

  discountVal: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },

  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 6,
  },

  grandTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  grandTotalVal: {
    fontSize: 16,
    fontWeight: '800',
    color: PRIMARY,
  },

  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
  },

  shareBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  closeModalBtn: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },

  closeModalText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
});
