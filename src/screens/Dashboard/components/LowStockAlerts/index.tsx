import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LowStockAlertItem } from '../../../../interface/dashboard';
import { SidemenuParams } from '../../../../interface/sidemenu';
import { THEME_COLORS, LOW_STOCK_ALERTS_DATA } from '../../../../constants/dashboardConstants';

interface LowStockAlertsProps {
  alerts?: LowStockAlertItem[];
}

export default function LowStockAlerts({ alerts = LOW_STOCK_ALERTS_DATA }: LowStockAlertsProps) {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.warningIconBg}>
            <AlertTriangle size={16} color={THEME_COLORS.danger} />
          </View>
          <Text style={styles.title}>Low Stock Alerts</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{alerts.length}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.viewAllBtn}
          onPress={() => navigation.navigate('Inventory')}
        >
          <Text style={styles.viewAllText}>Manage</Text>
          <ChevronRight size={14} color={THEME_COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Alert List */}
      <View style={styles.list}>
        {alerts.map((item) => {
          const isCritical = item.urgency === 'critical';

          return (
            <View
              key={item.id}
              style={[
                styles.itemCard,
                isCritical ? styles.criticalBorder : styles.warningBorder,
              ]}
            >
              {/* Left Info */}
              <View style={styles.itemInfo}>
                <View style={styles.titleWithUrgency}>
                  {isCritical ? (
                    <AlertTriangle size={14} color={THEME_COLORS.danger} />
                  ) : (
                    <AlertCircle size={14} color={THEME_COLORS.warning} />
                  )}
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>

                <View style={styles.skuRow}>
                  <Text style={styles.skuText}>{item.sku}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              {/* Right Stock Badge & Action */}
              <View style={styles.rightContainer}>
                <View
                  style={[
                    styles.stockBadge,
                    { backgroundColor: isCritical ? THEME_COLORS.dangerBg : THEME_COLORS.warningBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.stockText,
                      { color: isCritical ? THEME_COLORS.danger : THEME_COLORS.warning },
                    ]}
                  >
                    {item.stockLeft} left
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.restockBtn}
                  onPress={() => navigation.navigate('Inventory')}
                >
                  <RefreshCw size={12} color={THEME_COLORS.primary} />
                  <Text style={styles.restockText}>Restock</Text>
                </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warningIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.dangerBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  countBadge: {
    backgroundColor: THEME_COLORS.dangerBg,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME_COLORS.danger,
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
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderLeftWidth: 4,
  },
  criticalBorder: {
    borderLeftColor: THEME_COLORS.danger,
  },
  warningBorder: {
    borderLeftColor: THEME_COLORS.warning,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  titleWithUrgency: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.textPrimary,
    flex: 1,
  },
  skuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  skuText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    fontWeight: '500',
  },
  dot: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  categoryText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
  },
  rightContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '700',
  },
  restockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: THEME_COLORS.primaryLight,
    borderRadius: 6,
  },
  restockText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME_COLORS.primary,
  },
});
