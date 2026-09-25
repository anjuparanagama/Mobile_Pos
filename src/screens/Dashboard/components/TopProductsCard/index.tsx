import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Package } from 'lucide-react-native';
import { TopProductItem } from '../../../../interface/dashboard';
import { THEME_COLORS, TOP_PRODUCTS_DATA } from '../../../../constants/dashboardConstants';

interface TopProductsCardProps {
  products?: TopProductItem[];
}

export default function TopProductsCard({ products = TOP_PRODUCTS_DATA }: TopProductsCardProps) {
  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return { label: '🥇 #1', bg: '#FEF3C7', color: '#D97706' };
      case 1:
        return { label: '🥈 #2', bg: '#F1F5F9', color: '#64748B' };
      case 2:
        return { label: '🥉 #3', bg: '#FFEDD5', color: '#C2410C' };
      default:
        return { label: `#${index + 1}`, bg: '#F8FAFC', color: '#94A3B8' };
    }
  };

  const maxSold = Math.max(...products.map((p) => p.soldUnits), 1);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Flame size={18} color="#F59E0B" />
          <Text style={styles.title}>Top Selling Products</Text>
        </View>
        <Text style={styles.subtitle}>Best sellers by quantity sold</Text>
      </View>

      {/* List */}
      <View style={styles.list}>
        {products.map((item, index) => {
          const rank = getRankBadge(index);
          const fillWidthPercent = Math.round((item.soldUnits / maxSold) * 100);

          return (
            <View key={item.id} style={styles.productRow}>
              {/* Rank + Details */}
              <View style={styles.topInfo}>
                <View style={styles.leftInfo}>
                  <View style={[styles.rankBadge, { backgroundColor: rank.bg }]}>
                    <Text style={[styles.rankText, { color: rank.color }]}>{rank.label}</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.categoryTag}>{item.category}</Text>
                      <Text style={styles.dot}>•</Text>
                      <View style={styles.stockBadge}>
                        <Package size={10} color={THEME_COLORS.textMuted} />
                        <Text style={styles.stockText}>{item.stockLeft} left</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.rightInfo}>
                  <Text style={styles.revenueText}>{item.revenue}</Text>
                  <Text style={styles.soldUnitsText}>{item.soldUnits} units sold</Text>
                </View>
              </View>

              {/* Popularity bar */}
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${fillWidthPercent}%`,
                      backgroundColor:
                        index === 0 ? THEME_COLORS.primary : THEME_COLORS.primaryLight,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
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
  productRow: {
    gap: 8,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '800',
  },
  nameContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  categoryTag: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    fontWeight: '500',
  },
  dot: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  stockText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  rightInfo: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  revenueText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
  soldUnitsText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    marginTop: 2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
