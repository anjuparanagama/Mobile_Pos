import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {
  Plus,
  Package,
  ChevronDown,
  Download,
  Tag,
  Check,
  X,
  RotateCcw,
} from 'lucide-react-native';

import SearchBar from '../../component/searchBar';
import Title from '../../component/Title';
import MenuBar from '../../component/menuBar';

import ItemCard from './components/ItemCard';
import InventorySummaryCards from './components/InventorySummaryCards';
import AddItemModal from './components/AddItemModal';
import ExportInventoryModal from './components/ExportInventoryModal';

import { InventoryItem, InventorySummary } from '../../interface/inventory';
import {
  INITIAL_INVENTORY_DATA,
  INVENTORY_CATEGORIES,
} from '../../constants/inventoryConstants';

const PRIMARY = '#7B468C';

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Add Item Handler
  const handleAddItem = (newItemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...newItemData,
      id: Date.now(),
    };
    setItems(prev => [newItem, ...prev]);
  };

  // Delete Item Handler
  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Update Item Handler
  const handleUpdate = (updatedItem: InventoryItem) => {
    setItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // Filtered Items Memoized
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Inventory Summary Metrics Memoized
  const summary: InventorySummary = useMemo(() => {
    let totalValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    items.forEach(item => {
      totalValue += item.quantity * (item.price || 0);
      const minStock = item.minStockLevel || 5;

      if (item.quantity === 0) {
        outOfStockCount++;
      } else if (item.quantity <= minStock) {
        lowStockCount++;
      }
    });

    return {
      totalItems: items.length,
      totalValue,
      lowStockCount,
      outOfStockCount,
    };
  }, [items]);

  const isFiltered = selectedCategory !== 'All' || searchQuery !== '';

  return (
    <View style={styles.container}>
      {/* Top Header Row with Title & Add Product Button */}
      <View style={styles.headerRow}>
        <Title
          title="Inventory"
          tooltip="View and manage product stock, prices, and low-stock alerts"
          isTooltipVisible={true}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setIsAddModalOpen(true)}
          activeOpacity={0.8}
        >
          <Plus size={16} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 95 }}
      >
        {/* Metric Summary Cards */}
        <InventorySummaryCards summary={summary} />

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            placeholder="Search products by name, category, SKU..."
            onScanPress={() => {
              console.log('Open Barcode Scanner');
            }}
          />
        </View>

        {/* Single Row containing Category Dropdown & Export Dropdown */}
        <View style={styles.dropdownRow}>
          {/* Category Dropdown */}
          <View style={styles.dropdownCol}>
            <Text style={styles.dropdownLabel}>Category</Text>
            <TouchableOpacity
              style={[
                styles.dropdownBtn,
                selectedCategory !== 'All' && styles.activeDropdownBtn,
              ]}
              onPress={() => setIsCategoryModalOpen(true)}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownLeft}>
                <Tag
                  size={14}
                  color={selectedCategory !== 'All' ? PRIMARY : '#6B7280'}
                />
                <Text
                  style={[
                    styles.dropdownValText,
                    selectedCategory !== 'All' && styles.activeValText,
                  ]}
                  numberOfLines={1}
                >
                  {selectedCategory}
                </Text>
              </View>
              <ChevronDown size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Export Dropdown / Action */}
          <View style={styles.dropdownCol}>
            <Text style={styles.dropdownLabel}>Export Report</Text>
            <TouchableOpacity
              style={[styles.dropdownBtn, styles.exportDropdownBtn]}
              onPress={() => setIsExportModalOpen(true)}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownLeft}>
                <Download size={14} color="#FFFFFF" />
                <Text style={styles.exportDropdownText} numberOfLines={1}>
                  PDF / CSV
                </Text>
              </View>
              <ChevronDown size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Filter Action Row if active */}
        {isFiltered && (
          <View style={styles.resetRow}>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={styles.resetBtn}
            >
              <RotateCcw size={12} color={PRIMARY} />
              <Text style={styles.resetText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Products List Section */}
        <View style={styles.listSection}>
          <View style={styles.listHeaderRow}>
            <Text style={styles.listHeaderTitle}>
              Products ({filteredItems.length})
            </Text>
            {selectedCategory !== 'All' && (
              <Text style={styles.activeCatBadge}>{selectedCategory}</Text>
            )}
          </View>

          {filteredItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Package size={32} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No Products Found</Text>
              <Text style={styles.emptySubText}>
                No products match your search query or selected category filter.
              </Text>
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                <Text style={styles.resetFilterText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Category Dropdown Selection Modal */}
      <Modal
        visible={isCategoryModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCategoryModalOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsCategoryModalOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Tag size={18} color={PRIMARY} />
                <Text style={styles.modalTitle}>Select Category</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsCategoryModalOpen(false)}
                style={styles.closeBtn}
              >
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {INVENTORY_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.optionItem,
                      isSelected && styles.selectedOptionItem,
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setIsCategoryModalOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {cat}
                    </Text>
                    {isSelected && <Check size={18} color={PRIMARY} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Add Item Modal */}
      <AddItemModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Export Inventory Modal (PDF & CSV) */}
      <ExportInventoryModal
        visible={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        filteredItems={filteredItems}
        summary={summary}
        selectedCategory={selectedCategory}
      />

      {/* Bottom Navigation */}
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
  },

  addBtn: {
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

  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  searchSection: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 4,
  },

  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 10,
  },

  dropdownCol: {
    flex: 1,
  },

  dropdownLabel: {
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

  exportDropdownBtn: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  dropdownValText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },

  activeValText: {
    color: PRIMARY,
    fontWeight: '700',
  },

  exportDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },

  resetRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
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

  listSection: {
    paddingHorizontal: 16,
    marginTop: 8,
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

  activeCatBadge: {
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

  resetFilterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: PRIMARY,
    borderRadius: 20,
  },

  resetFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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

export default Inventory;
