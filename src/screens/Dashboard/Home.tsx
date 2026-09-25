import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';

import Header from '../../component/header';
import MenuBar from '../../component/menuBar';

import { TimeframeFilter } from '../../interface/dashboard';
import {
  THEME_COLORS,
  INITIAL_KPI_DATA,
} from '../../constants/dashboardConstants';

import StoreStatusBanner from './components/StoreStatusBanner';
import QuickTimeframeSelector from './components/QuickTimeframeSelector';
import KpiCards from './components/KpiCards';
import QuickActionsHub from './components/QuickActionsHub';
import SalesOverviewChart from './components/SalesOverviewChart';
import PaymentBreakdownCard from './components/PaymentBreakdownCard';
import TopProductsCard from './components/TopProductsCard';
import LowStockAlerts from './components/LowStockAlerts';
import RecentTransactionsCard from './components/RecentTransactionsCard';

const AnalyticsScreen = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeFilter>('Today');
  const [refreshing, setRefreshing] = useState(false);

  const kpiItems = INITIAL_KPI_DATA[selectedTimeframe] || INITIAL_KPI_DATA['Today'];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate real-time data sync/refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* App Header */}
      <Header />

      {/* Dashboard Body Scroll view */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={THEME_COLORS.primary}
            colors={[THEME_COLORS.primary]}
          />
        }
      >
        {/* Live Store Status & Daily Goal Banner */}
        <StoreStatusBanner />

        {/* Timeframe Filter Pills */}
        <QuickTimeframeSelector
          selectedTimeframe={selectedTimeframe}
          onSelectTimeframe={setSelectedTimeframe}
        />

        {/* Executive KPI Metric Cards */}
        <KpiCards items={kpiItems} />

        {/* Quick POS Action Shortcuts */}
        <QuickActionsHub />

        {/* Sales Trend Chart & Analytics */}
        <SalesOverviewChart selectedTimeframe={selectedTimeframe} />

        {/* Payment Channels Split */}
        <PaymentBreakdownCard />

        {/* Leaderboard - Top Selling Products */}
        <TopProductsCard />

        {/* Inventory Stock Warning Alerts */}
        <LowStockAlerts />

        {/* Recent Transaction Activity Feed */}
        <RecentTransactionsCard />
      </ScrollView>

      {/* Navigation Bottom Bar */}
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.bgLight,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 90, // Spacing for bottom floating MenuBar
  },
});

export default AnalyticsScreen;
