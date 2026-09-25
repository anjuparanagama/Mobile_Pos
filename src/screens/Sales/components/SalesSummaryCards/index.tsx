import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  Banknote,
  QrCode,
  Globe,
} from 'lucide-react-native';
import { SalesSummary } from '../../../../interface/sales';
import { formatCurrency } from '../../../../api/salesApi';

interface SalesSummaryCardsProps {
  summary: SalesSummary;
}

const PRIMARY = '#7B468C';
const ACCENT = '#9A6AB2';

export default function SalesSummaryCards({ summary }: SalesSummaryCardsProps) {
  return (
    <View style={styles.container}>
      {/* Main Top 2 Hero Cards */}
      <View style={styles.row}>
        {/* Total Revenue Card */}
        <View style={[styles.heroCard, styles.primaryBg]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleWhite}>
              <DollarSign size={20} color={PRIMARY} />
            </View>
            <Text style={styles.heroTag}>Total Revenue</Text>
          </View>
          <Text style={styles.heroValue}>
            {formatCurrency(summary.totalRevenue)}
          </Text>
          <Text style={styles.heroSubText}>
            {summary.totalCount}{' '}
            {summary.totalCount === 1 ? 'Transaction' : 'Transactions'}
          </Text>
        </View>

        {/* Avg Order Value & Orders Count */}
        <View style={styles.rightColumn}>
          <View style={styles.subCard}>
            <View style={styles.iconCircleSmall}>
              <ShoppingBag size={16} color={PRIMARY} />
            </View>
            <View style={styles.subCardContent}>
              <Text style={styles.subCardTitle}>Total Orders</Text>
              <Text style={styles.subCardValue}>{summary.totalCount}</Text>
            </View>
          </View>

          <View style={styles.subCard}>
            <View style={styles.iconCircleSmall}>
              <TrendingUp size={16} color={PRIMARY} />
            </View>
            <View style={styles.subCardContent}>
              <Text style={styles.subCardTitle}>Avg. Sale</Text>
              <Text style={styles.subCardValue}>
                {formatCurrency(summary.avgOrderValue)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  heroCard: {
    flex: 1.2,
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  primaryBg: {
    backgroundColor: PRIMARY,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconCircleWhite: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTag: {
    color: '#E9D5FF',
    fontSize: 12,
    fontWeight: '600',
  },

  heroValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 6,
  },

  heroSubText: {
    color: '#F3E8FF',
    fontSize: 11,
    fontWeight: '500',
  },

  rightColumn: {
    flex: 1,
    gap: 10,
  },

  subCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  iconCircleSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subCardContent: {
    flex: 1,
  },

  subCardTitle: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  subCardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },

  paymentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1,
  },

  paymentTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },

  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  paymentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  pillLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  pillValue: {
    fontSize: 11,
    color: '#111827',
    fontWeight: '700',
  },
});
