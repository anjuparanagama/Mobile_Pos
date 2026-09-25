import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react-native';
import { KpiItem } from '../../../../interface/dashboard';
import { THEME_COLORS } from '../../../../constants/dashboardConstants';

const { width } = Dimensions.get('window');
const cardWidth = (width - 52) / 2;

interface KpiCardsProps {
  items: KpiItem[];
  onCardPress?: (item: KpiItem) => void;
}

export default function KpiCards({ items }: KpiCardsProps) {
  const getIcon = (iconName: string, color: string) => {
    const size = 20;
    switch (iconName) {
      case 'dollar':
        return <DollarSign size={size} color={color} />;
      case 'shopping-cart':
        return <ShoppingCart size={size} color={color} />;
      case 'trending-up':
        return <TrendingUp size={size} color={color} />;
      case 'alert-triangle':
        return <AlertTriangle size={size} color={color} />;
      default:
        return <DollarSign size={size} color={color} />;
    }
  };

  return (
    <View style={styles.grid}>
      {items.map((item) => {
        const isWarning = item.iconName === 'alert-triangle';
        return (
          <View key={item.id} style={styles.card}>
            {/* Top row: Icon box + Trend Badge */}
            <View style={styles.topRow}>
              <View style={[styles.iconBox, { backgroundColor: item.bgTint }]}>
                {getIcon(item.iconName, item.accentColor)}
              </View>

              {item.changePercent ? (
                <View
                  style={[
                    styles.badge,
                    isWarning
                      ? styles.warningBadge
                      : item.isPositive
                      ? styles.successBadge
                      : styles.neutralBadge,
                  ]}
                >
                  {isWarning ? (
                    <AlertTriangle size={10} color={THEME_COLORS.danger} />
                  ) : item.isPositive ? (
                    <ArrowUpRight size={12} color={THEME_COLORS.success} />
                  ) : (
                    <ArrowDownRight size={12} color={THEME_COLORS.danger} />
                  )}
                  <Text
                    style={[
                      styles.badgeText,
                      isWarning
                        ? styles.warningBadgeText
                        : item.isPositive
                        ? styles.successBadgeText
                        : styles.dangerBadgeText,
                    ]}
                  >
                    {item.changePercent}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Title */}
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            {/* Primary Value */}
            <Text style={styles.value} numberOfLines={1}>
              {item.value}
            </Text>

            {/* Subtext */}
            <Text style={styles.subtext} numberOfLines={1}>
              {item.subtext}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 2,
  },
  successBadge: {
    backgroundColor: THEME_COLORS.successBg,
  },
  warningBadge: {
    backgroundColor: THEME_COLORS.dangerBg,
  },
  neutralBadge: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  successBadgeText: {
    color: THEME_COLORS.success,
  },
  warningBadgeText: {
    color: THEME_COLORS.danger,
  },
  dangerBadgeText: {
    color: THEME_COLORS.danger,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME_COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: '800',
    color: THEME_COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  subtext: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
});
