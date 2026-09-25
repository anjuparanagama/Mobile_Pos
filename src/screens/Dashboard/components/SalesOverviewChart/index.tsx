import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TrendingUp, Clock, ShoppingBag } from 'lucide-react-native';
import { TimeframeFilter, DashboardChartTab } from '../../../../interface/dashboard';
import { THEME_COLORS, CHART_DATA_BY_TIMEFRAME } from '../../../../constants/dashboardConstants';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

interface SalesOverviewChartProps {
  selectedTimeframe: TimeframeFilter;
}

export default function SalesOverviewChart({ selectedTimeframe }: SalesOverviewChartProps) {
  const [activeTab, setActiveTab] = useState<DashboardChartTab>('revenue');

  const rawData = CHART_DATA_BY_TIMEFRAME[selectedTimeframe] || CHART_DATA_BY_TIMEFRAME['Today'];
  const datasetValues = activeTab === 'revenue' ? rawData.revenue : rawData.orders;

  const chartData = {
    labels: rawData.labels,
    datasets: [
      {
        data: datasetValues,
        color: (opacity = 1) => `rgba(123, 70, 140, ${opacity})`,
        strokeWidth: 2.5,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(123, 70, 140, ${opacity})`,
    labelColor: () => THEME_COLORS.textSecondary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: THEME_COLORS.primary,
      fill: '#FFFFFF',
    },
    propsForBackgroundLines: {
      strokeDasharray: '5',
      stroke: '#F1F5F9',
    },
    propsForLabels: {
      fontSize: 10,
      fontWeight: '600',
    },
  };

  return (
    <View style={styles.card}>
      {/* Header with Title & Tab Switcher */}
      <View style={styles.headerRow}>
        <View>
          <View style={styles.titleWithIcon}>
            <TrendingUp size={18} color={THEME_COLORS.primary} />
            <Text style={styles.cardTitle}>Sales Performance</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            {activeTab === 'revenue' ? 'Revenue breakdown' : 'Transaction volume'} ({selectedTimeframe})
          </Text>
        </View>

        {/* Tab Switcher Pills */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.tabBtn, activeTab === 'revenue' && styles.activeTabBtn]}
            onPress={() => setActiveTab('revenue')}
          >
            <Text style={[styles.tabText, activeTab === 'revenue' && styles.activeTabText]}>
              Revenue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.tabBtn, activeTab === 'orders' && styles.activeTabBtn]}
            onPress={() => setActiveTab('orders')}
          >
            <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>
              Orders
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chart Canvas */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={chartWidth - 24}
          height={200}
          chartConfig={chartConfig}
          bezier
          withInnerLines={true}
          withOuterLines={false}
          withDots={true}
          withShadow={true}
          style={styles.chartStyle}
          formatYLabel={(value) => {
            const num = parseFloat(value);
            if (activeTab === 'revenue') {
              if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
              if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
            }
            return value;
          }}
        />
      </View>

      {/* Insights Row below chart */}
      <View style={styles.insightsRow}>
        <View style={styles.insightItem}>
          <View style={[styles.insightIcon, { backgroundColor: THEME_COLORS.primaryLight }]}>
            <Clock size={14} color={THEME_COLORS.primary} />
          </View>
          <View>
            <Text style={styles.insightLabel}>Peak Sales Period</Text>
            <Text style={styles.insightValue}>{rawData.peakPeriod}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.insightItem}>
          <View style={[styles.insightIcon, { backgroundColor: THEME_COLORS.successBg }]}>
            <ShoppingBag size={14} color={THEME_COLORS.success} />
          </View>
          <View>
            <Text style={styles.insightLabel}>Avg. Order Ticket</Text>
            <Text style={styles.insightValue}>{rawData.avgTicket}</Text>
          </View>
        </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 11,
    color: THEME_COLORS.textMuted,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
  },
  tabBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeTabBtn: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  activeTabText: {
    color: THEME_COLORS.primary,
    fontWeight: '700',
  },
  chartWrapper: {
    alignItems: 'center',
    marginHorizontal: -8,
  },
  chartStyle: {
    borderRadius: 16,
    paddingRight: 16,
  },
  insightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightLabel: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    fontWeight: '500',
  },
  insightValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
});
