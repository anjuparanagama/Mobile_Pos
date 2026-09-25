import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Download, ShoppingBag } from 'lucide-react-native';

import Header from '../../component/header';
import Title from '../../component/Title';
import MenuBar from '../../component/menuBar';

import SalesSummaryCards from './components/SalesSummaryCards';
import SalesFilterBar from './components/SalesFilterBar';
import SalesCard from './components/SalesCard';
import SaleDetailModal from './components/SaleDetailModal';
import ExportModal from './components/ExportModal';

import { SaleTransaction, SalesFilterState } from '../../interface/sales';
import { INITIAL_SALES_DATA } from '../../constants/salesConstants';
import {
  filterSalesData,
  calculateSalesSummary,
  formatCurrency,
  formatSalesDate,
} from '../../api/salesApi';

const PRIMARY = '#7B468C';

const SalesScreen = () => {
  const [salesList] = useState<SaleTransaction[]>(INITIAL_SALES_DATA);

  // Filter state
  const [filterState, setFilterState] = useState<SalesFilterState>({
    datePreset: 'Today',
    paymentMethod: 'All',
    searchQuery: '',
  });

  // Modals state
  const [selectedSale, setSelectedSale] = useState<SaleTransaction | null>(
    null,
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  // Update filter helper
  const handleUpdateFilter = (updated: Partial<SalesFilterState>) => {
    setFilterState(prev => ({ ...prev, ...updated }));
  };

  // Reset filters
  const handleResetFilter = () => {
    setFilterState({
      datePreset: 'Today',
      paymentMethod: 'All',
      searchQuery: '',
    });
  };

  // Filtered sales memoized
  const filteredSales = useMemo(() => {
    return filterSalesData(salesList, filterState);
  }, [salesList, filterState]);

  // Summary memoized
  const summary = useMemo(() => {
    return calculateSalesSummary(filteredSales);
  }, [filteredSales]);

  // Open sale detail modal
  const handlePressDetails = (sale: SaleTransaction) => {
    setSelectedSale(sale);
    setIsDetailModalVisible(true);
  };

  // Share single sale receipt
  const handleShareSale = async (sale: SaleTransaction) => {
    try {
      const itemsListStr = sale.items
        .map(i => `${i.qty}x ${i.name} - ${formatCurrency(i.totalPrice)}`)
        .join('\n');

      const message = `
*BIZLK POS RECEIPT*
Invoice: ${sale.invoiceNo}
Date: ${formatSalesDate(sale.date)}
Customer: ${sale.customerName || 'Walk-in'}
Payment: ${sale.paymentMethod}

*Items:*
${itemsListStr}

Subtotal: ${formatCurrency(sale.subtotal)}
Discount: ${formatCurrency(sale.discount)}
*Grand Total: ${formatCurrency(sale.totalAmount)}*

Thank you for shopping with us!
      `.trim();

      await Share.share({
        title: `Receipt_${sale.invoiceNo}`,
        message,
      });
    } catch (err: any) {
      Alert.alert('Share Error', err?.message || 'Failed to share receipt.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      {/* <Header /> */}

      {/* Title & Export Action Row */}
      <View style={styles.titleContainer}>
        <Title
          title="Sales"
          tooltip="View sales transactions, apply filters, and export PDF/CSV reports"
          isTooltipVisible={true}
        />

        <TouchableOpacity
          style={styles.exportHeaderBtn}
          onPress={() => setIsExportModalVisible(true)}
          activeOpacity={0.8}
        >
          <Download size={15} color="#FFFFFF" />
          <Text style={styles.exportHeaderBtnText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Summary Metrics */}
        <SalesSummaryCards summary={summary} />

        {/* Filter Controls (Date presets, payment methods, search) */}
        <SalesFilterBar
          filterState={filterState}
          onUpdateFilter={handleUpdateFilter}
          onResetFilter={handleResetFilter}
        />

        {/* Transactions List */}
        <View style={styles.listSection}>
          <View style={styles.listHeaderRow}>
            <Text style={styles.listHeaderTitle}>
              Transactions ({filteredSales.length})
            </Text>
            <Text style={styles.activePeriodBadge}>
              {filterState.datePreset}
            </Text>
          </View>

          {filteredSales.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <ShoppingBag size={32} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No Sales Found</Text>
              <Text style={styles.emptySubText}>
                There are no sales records for the selected period or search
                criteria.
              </Text>
              <TouchableOpacity
                style={styles.resetEmptyBtn}
                onPress={handleResetFilter}
              >
                <Text style={styles.resetEmptyText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredSales.map(sale => (
              <SalesCard
                key={sale.id}
                sale={sale}
                onPressDetails={handlePressDetails}
                onShareSale={handleShareSale}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Sale Detail Receipt Modal */}
      <SaleDetailModal
        visible={isDetailModalVisible}
        sale={selectedSale}
        onClose={() => setIsDetailModalVisible(false)}
        onShare={handleShareSale}
      />

      {/* PDF & CSV Export Modal */}
      <ExportModal
        visible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        filteredSales={filteredSales}
        summary={summary}
        datePresetLabel={filterState.datePreset}
      />

      {/* Bottom Menu Bar */}
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
  },

  exportHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PRIMARY,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  exportHeaderBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  listSection: {
    paddingHorizontal: 16,
    marginTop: 4,
  },

  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  listHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  activePeriodBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: PRIMARY,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 30,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },

  emptySubText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },

  resetEmptyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: PRIMARY,
    borderRadius: 20,
  },

  resetEmptyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default SalesScreen;
