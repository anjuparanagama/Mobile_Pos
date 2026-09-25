import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Package, AlertTriangle, XCircle, TrendingUp } from 'lucide-react-native';
import { InventorySummary } from '../../../../interface/inventory';

interface Props {
  summary: InventorySummary;
}

const PRIMARY = '#7B468C';

export default function InventorySummaryCards({ summary }: Props) {
  const formatValue = (val: number) => {
    return `Rs. ${val.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <View style={styles.container}>
      {/* Top Main Hero Row */}
      <View style={styles.row}>
        {/* Total Products */}
        <View style={[styles.card, styles.primaryBg]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleWhite}>
              <Package size={18} color={PRIMARY} />
            </View>
            <Text style={styles.heroTag}>Products</Text>
          </View>
          <Text style={styles.heroValue}>{summary.totalItems}</Text>
          <Text style={styles.heroSubText}>
            Valuation: {formatValue(summary.totalValue)}
          </Text>
        </View>

        {/* Low & Out of Stock Grid */}
        <View style={styles.rightGrid}>
          {/* Low Stock Card */}
          <View style={[styles.subCard, summary.lowStockCount > 0 && styles.lowStockBorder]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
              <AlertTriangle size={15} color="#D97706" />
            </View>
            <View style={styles.subContent}>
              <Text style={styles.subLabel}>Low Stock</Text>
              <Text style={[styles.subValue, { color: '#D97706' }]}>
                {summary.lowStockCount} Items
              </Text>
            </View>
          </View>

          {/* Out of Stock Card */}
          <View style={[styles.subCard, summary.outOfStockCount > 0 && styles.outStockBorder]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
              <XCircle size={15} color="#DC2626" />
            </View>
            <View style={styles.subContent}>
              <Text style={styles.subLabel}>Out of Stock</Text>
              <Text style={[styles.subValue, { color: '#DC2626' }]}>
                {summary.outOfStockCount} Items
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  card: {
    borderRadius: 16,
    padding: 14,
    shadowColor: '#7B468C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  primaryBg: {
    flex: 1.2,
    backgroundColor: PRIMARY,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#E9D5FF',
  },

  heroValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },

  heroSubText: {
    fontSize: 11,
    color: '#F3E8FF',
    fontWeight: '500',
  },

  rightGrid: {
    flex: 1,
    gap: 8,
    justifyContent: 'space-between',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  lowStockBorder: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },

  outStockBorder: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },

  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subContent: {
    flex: 1,
  },

  subLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },

  subValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
  },
});
