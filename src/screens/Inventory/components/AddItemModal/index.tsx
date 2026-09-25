import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from '../../../../component/Modal';
import { InventoryItem, InventoryCategory } from '../../../../interface/inventory';
import { unitTypes, UnitType } from '../../../../constants/unitTypes';
import { INVENTORY_CATEGORIES } from '../../../../constants/inventoryConstants';
import { Plus, Minus, Package, Tag, DollarSign, Layers } from 'lucide-react-native';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newItem: Omit<InventoryItem, 'id'>) => void;
}

const PRIMARY = '#7B468C';

export default function AddItemModal({
  visible,
  onClose,
  onAdd,
}: AddItemModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [unit, setUnit] = useState<UnitType>('pc');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string>('Groceries');
  const [minStockLevel, setMinStockLevel] = useState('5');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setErrorMsg('Please enter product name.');
      return;
    }
    const parsedQty = parseFloat(quantity) || 0;
    const parsedPrice = parseFloat(price) || 0;
    const parsedMinStock = parseFloat(minStockLevel) || 5;

    onAdd({
      name: name.trim(),
      quantity: parsedQty,
      unit,
      price: parsedPrice,
      category,
      minStockLevel: parsedMinStock,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    // Reset form
    setName('');
    setQuantity('10');
    setPrice('');
    setErrorMsg('');
    onClose();
  };

  return (
    <Modal visible={visible} title="Add New Product" onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
        {errorMsg !== '' && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}

        {/* Product Name */}
        <Text style={styles.label}>Product Name *</Text>
        <View style={styles.inputWrapper}>
          <Package size={16} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={t => {
              setName(t);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="e.g. Samba Rice 5Kg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Selector */}
        <Text style={styles.label}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          {INVENTORY_CATEGORIES.filter(c => c !== 'All').map((cat: string) => {
            const isSelected = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, isSelected && styles.activeChip]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Price & Unit */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>Selling Price (Rs.) *</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.currencyPrefix}>Rs.</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Quantity Controls */}
        <Text style={styles.label}>Initial Stock Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => {
              const current = parseFloat(quantity) || 0;
              setQuantity(Math.max(0, current - 1).toString());
            }}
          >
            <Minus size={18} color="#374151" />
          </TouchableOpacity>

          <TextInput
            style={styles.qtyInput}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => {
              const current = parseFloat(quantity) || 0;
              setQuantity((current + 1).toString());
            }}
          >
            <Plus size={18} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Unit Selector */}
        <Text style={styles.label}>Unit Type</Text>
        <View style={styles.unitGrid}>
          {unitTypes.map((u: UnitType) => {
            const isSelected = unit === u;
            return (
              <TouchableOpacity
                key={u}
                style={[styles.unitPill, isSelected && styles.activeUnitPill]}
                onPress={() => setUnit(u)}
              >
                <Text style={[styles.unitText, isSelected && styles.activeUnitText]}>
                  {u}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Min Stock Alert */}
        <Text style={styles.label}>Low Stock Alert Threshold</Text>
        <View style={styles.inputWrapper}>
          <Layers size={16} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={minStockLevel}
            onChangeText={setMinStockLevel}
            placeholder="5"
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>Add Product to Inventory</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 4,
  },

  errorBanner: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#FFFFFF',
  },

  inputIcon: {
    marginRight: 8,
  },

  currencyPrefix: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY,
    marginRight: 6,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 0,
  },

  chipScroll: {
    gap: 8,
    paddingVertical: 4,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  activeChip: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  chipText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
  },

  activeChipText: {
    color: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  flex1: {
    flex: 1,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },

  unitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  unitPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  activeUnitPill: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  unitText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
  },

  activeUnitText: {
    color: '#FFFFFF',
  },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
