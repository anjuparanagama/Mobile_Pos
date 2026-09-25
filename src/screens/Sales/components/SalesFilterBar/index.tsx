import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import {
  Search,
  X,
  Calendar,
  Filter,
  ChevronDown,
  Check,
  RotateCcw,
} from 'lucide-react-native';
import { DateFilterPreset, SalesFilterState } from '../../../../interface/sales';
import {
  DATE_FILTER_PRESETS,
  PAYMENT_METHODS_OPTIONS,
} from '../../../../constants/salesConstants';

interface SalesFilterBarProps {
  filterState: SalesFilterState;
  onUpdateFilter: (updated: Partial<SalesFilterState>) => void;
  onResetFilter: () => void;
}

const PRIMARY = '#7B468C';

export default function SalesFilterBar({
  filterState,
  onUpdateFilter,
  onResetFilter,
}: SalesFilterBarProps) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const isFiltered =
    filterState.datePreset !== 'Today' ||
    filterState.paymentMethod !== 'All' ||
    filterState.searchQuery !== '';

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by invoice #, customer, item..."
          placeholderTextColor="#9CA3AF"
          value={filterState.searchQuery}
          onChangeText={text => onUpdateFilter({ searchQuery: text })}
        />
        {filterState.searchQuery !== '' && (
          <TouchableOpacity
            onPress={() => onUpdateFilter({ searchQuery: '' })}
            style={styles.clearBtn}
          >
            <X size={16} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Single Row containing Date Filter Dropdown & Payment Method Dropdown */}
      <View style={styles.filterRow}>
        {/* Date Filter Dropdown */}
        <View style={styles.dropdownCol}>
          <Text style={styles.dropdownHeaderLabel}>Date Filter</Text>
          <TouchableOpacity
            style={[
              styles.dropdownBtn,
              filterState.datePreset !== 'Today' && styles.activeDropdownBtn,
            ]}
            onPress={() => setDateModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.dropdownContentLeft}>
              <Calendar
                size={14}
                color={filterState.datePreset !== 'Today' ? PRIMARY : '#6B7280'}
              />
              <Text
                style={[
                  styles.dropdownValueText,
                  filterState.datePreset !== 'Today' && styles.activeValueText,
                ]}
                numberOfLines={1}
              >
                {filterState.datePreset}
              </Text>
            </View>
            <ChevronDown size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Payment Method Dropdown */}
        <View style={styles.dropdownCol}>
          <Text style={styles.dropdownHeaderLabel}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.dropdownBtn,
              filterState.paymentMethod !== 'All' && styles.activeDropdownBtn,
            ]}
            onPress={() => setPaymentModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.dropdownContentLeft}>
              <Filter
                size={14}
                color={filterState.paymentMethod !== 'All' ? PRIMARY : '#6B7280'}
              />
              <Text
                style={[
                  styles.dropdownValueText,
                  filterState.paymentMethod !== 'All' && styles.activeValueText,
                ]}
                numberOfLines={1}
              >
                {filterState.paymentMethod}
              </Text>
            </View>
            <ChevronDown size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reset Filter Button Row if active */}
      {isFiltered && (
        <View style={styles.resetRow}>
          <TouchableOpacity onPress={onResetFilter} style={styles.resetBtn}>
            <RotateCcw size={12} color={PRIMARY} />
            <Text style={styles.resetText}>Reset All Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Date Filter Selection Modal Dropdown */}
      <Modal
        visible={dateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDateModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Calendar size={18} color={PRIMARY} />
                <Text style={styles.modalTitle}>Select Date Filter</Text>
              </View>
              <TouchableOpacity
                onPress={() => setDateModalVisible(false)}
                style={styles.closeBtn}
              >
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {DATE_FILTER_PRESETS.map((preset: DateFilterPreset) => {
                const isSelected = filterState.datePreset === preset;
                return (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.optionItem,
                      isSelected && styles.selectedOptionItem,
                    ]}
                    onPress={() => {
                      onUpdateFilter({ datePreset: preset });
                      setDateModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {preset}
                    </Text>
                    {isSelected && <Check size={18} color={PRIMARY} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Payment Method Selection Modal Dropdown */}
      <Modal
        visible={paymentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPaymentModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Filter size={18} color={PRIMARY} />
                <Text style={styles.modalTitle}>Select Payment Method</Text>
              </View>
              <TouchableOpacity
                onPress={() => setPaymentModalVisible(false)}
                style={styles.closeBtn}
              >
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {PAYMENT_METHODS_OPTIONS.map((method: string) => {
                const isSelected = filterState.paymentMethod === method;
                return (
                  <TouchableOpacity
                    key={method}
                    style={[
                      styles.optionItem,
                      isSelected && styles.selectedOptionItem,
                    ]}
                    onPress={() => {
                      onUpdateFilter({ paymentMethod: method });
                      setPaymentModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {method}
                    </Text>
                    {isSelected && <Check size={18} color={PRIMARY} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
    paddingVertical: 0,
  },

  clearBtn: {
    padding: 4,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  dropdownCol: {
    flex: 1,
  },

  dropdownHeaderLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 4,
  },

  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },

  activeDropdownBtn: {
    borderColor: PRIMARY,
    backgroundColor: '#FBF8FC',
  },

  dropdownContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  dropdownValueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },

  activeValueText: {
    color: PRIMARY,
    fontWeight: '700',
  },

  resetRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },

  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  resetText: {
    fontSize: 11,
    color: PRIMARY,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
    marginBottom: 8,
  },

  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  closeBtn: {
    padding: 4,
  },

  optionsList: {
    marginTop: 4,
  },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 2,
  },

  selectedOptionItem: {
    backgroundColor: '#F3E8FF',
  },

  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  selectedOptionText: {
    color: PRIMARY,
    fontWeight: '700',
  },
});
