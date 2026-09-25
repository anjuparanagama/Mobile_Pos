import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Banknote, CreditCard, QrCode, Globe, PieChart as PieIcon } from 'lucide-react-native';
import { PaymentBreakdownItem } from '../../../../interface/dashboard';
import { THEME_COLORS, PAYMENT_BREAKDOWN_DATA } from '../../../../constants/dashboardConstants';

interface PaymentBreakdownCardProps {
  data?: PaymentBreakdownItem[];
}

export default function PaymentBreakdownCard({ data = PAYMENT_BREAKDOWN_DATA }: PaymentBreakdownCardProps) {
  const getMethodIcon = (method: string, color: string) => {
    const size = 16;
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
          <PieIcon size={18} color={THEME_COLORS.primary} />
          <Text style={styles.title}>Payment Method Split</Text>
        </View>
        <Text style={styles.subtitle}>Revenue breakdown by channel</Text>
      </View>

      {/* Payment Items */}
      <View style={styles.list}>
        {data.map((item) => (
          <View key={item.method} style={styles.itemContainer}>
            {/* Top row of item: Icon + Name + Percentage + Amount */}
            <View style={styles.itemHeader}>
              <View style={styles.methodInfo}>
                <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                  {getMethodIcon(item.method, item.color)}
                </View>
                <View>
                  <Text style={styles.methodName}>{item.method}</Text>
                  <Text style={styles.countText}>{item.count} transactions</Text>
                </View>
              </View>

              <View style={styles.amountInfo}>
                <Text style={styles.amountText}>{item.formattedAmount}</Text>
                <Text style={[styles.percentageBadge, { color: item.color }]}>
                  {item.percentage}% share
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.percentage}%`, backgroundColor: item.color },
                ]}
              />
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
    marginBottom: 16,
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
  subtitle: {
    fontSize: 11,
    color: THEME_COLORS.textMuted,
    marginTop: 2,
  },
  list: {
    gap: 14,
  },
  itemContainer: {
    gap: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.textPrimary,
  },
  countText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  amountInfo: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  percentageBadge: {
    fontSize: 10,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
