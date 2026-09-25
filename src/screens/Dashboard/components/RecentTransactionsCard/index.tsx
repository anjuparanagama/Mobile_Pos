import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { History, Banknote, CreditCard, QrCode, Globe, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RecentTransactionItem } from '../../../../interface/dashboard';
import { SidemenuParams } from '../../../../interface/sidemenu';
import { THEME_COLORS, RECENT_TRANSACTIONS_DATA } from '../../../../constants/dashboardConstants';

interface RecentTransactionsCardProps {
  transactions?: RecentTransactionItem[];
}

export default function RecentTransactionsCard({
  transactions = RECENT_TRANSACTIONS_DATA,
}: RecentTransactionsCardProps) {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();

  const getPaymentIcon = (method: string) => {
    const size = 14;
    const color = THEME_COLORS.textSecondary;
    switch (method) {
      case 'Cash':
        return <Banknote size={size} color={color} />;
      case 'Card':
        return <CreditCard size={size} color={color} />;
      case 'QR':
        return <QrCode size={size} color={color} />;
      case 'Online':
        return <Globe size={size} color={color} />;
      default:
        return <Banknote size={size} color={color} />;
    }
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <History size={18} color={THEME_COLORS.primary} />
          <Text style={styles.title}>Recent Sales Activity</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewAllBtn}
          onPress={() => navigation.navigate('Sales')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={14} color={THEME_COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.list}>
        {transactions.map((tx) => (
          <View key={tx.id} style={styles.txRow}>
            {/* Left: Icon + Invoice + Time + Items */}
            <View style={styles.leftContent}>
              <View style={styles.paymentIconBg}>{getPaymentIcon(tx.paymentMethod)}</View>

              <View style={styles.txDetails}>
                <View style={styles.invoiceHeaderRow}>
                  <Text style={styles.invoiceNo}>{tx.invoiceNo}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.timeAgo}>{tx.timeAgo}</Text>
                </View>

                <Text style={styles.itemSummary} numberOfLines={1}>
                  {tx.itemSummary}
                </Text>
              </View>
            </View>

            {/* Right: Amount + Status */}
            <View style={styles.rightContent}>
              <Text style={styles.amountText}>{tx.amount}</Text>
              <View style={styles.statusBadge}>
                <CheckCircle2 size={10} color={THEME_COLORS.success} />
                <Text style={styles.statusText}>{tx.paymentMethod}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME_COLORS.primary,
  },
  list: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  paymentIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txDetails: {
    flex: 1,
  },
  invoiceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  invoiceNo: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  dot: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  timeAgo: {
    fontSize: 11,
    color: THEME_COLORS.textMuted,
  },
  itemSummary: {
    fontSize: 11,
    color: THEME_COLORS.textSecondary,
    marginTop: 2,
  },
  rightContent: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME_COLORS.textMuted,
  },
});
