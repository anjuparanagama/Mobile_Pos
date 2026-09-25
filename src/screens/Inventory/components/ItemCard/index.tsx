import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from '../../../../component/Modal';
import ConfirmationModal from '../../../../component/ConfirmationModal';
import { InventoryItem } from '../../../../interface/inventory';
import { unitTypes, UnitType } from '../../../../constants/unitTypes';
import { INVENTORY_CATEGORIES } from '../../../../constants/inventoryConstants';
import {
  Trash2,
  Pencil,
  AlertTriangle,
  Plus,
  Minus,
  Package,
  CheckCircle2,
  XCircle,
  Tag,
} from 'lucide-react-native';

interface Props {
  item: InventoryItem;
  onDelete: (id: number) => void;
  onUpdate: (item: InventoryItem) => void;
}

const PRIMARY = '#7B468C';

export default function ItemCard({ item, onDelete, onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const minStock = item.minStockLevel || 5;
  const isOutOfStock = item.quantity === 0;
  const isLowStock = item.quantity > 0 && item.quantity <= minStock;

  // Format currency
  const formattedPrice = `Rs. ${(item.price || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  // Quick stock adjustment helper
  const handleQuickQtyChange = (delta: number) => {
    const newQty = Math.max(0, item.quantity + delta);
    onUpdate({ ...item, quantity: newQty });
  };

  return (
    <>
      <View
        style={[
          styles.card,
          isOutOfStock && styles.outOfStockCard,
          isLowStock && styles.lowStockCard,
        ]}
      >
        {/* Top Header inside Card */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.categoryBadge}>
            <Tag size={10} color={PRIMARY} />
            <Text style={styles.categoryBadgeText}>{item.category || 'General'}</Text>
          </View>

          {/* Status Pill */}
          {isOutOfStock ? (
            <View style={[styles.statusPill, styles.outOfStockPill]}>
              <XCircle size={12} color="#DC2626" />
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          ) : isLowStock ? (
            <View style={[styles.statusPill, styles.lowStockPill]}>
              <AlertTriangle size={12} color="#D97706" />
              <Text style={styles.lowStockText}>Low Stock ({item.quantity})</Text>
            </View>
          ) : (
            <View style={[styles.statusPill, styles.inStockPill]}>
              <CheckCircle2 size={12} color="#16A34A" />
              <Text style={styles.inStockText}>In Stock</Text>
            </View>
          )}
        </View>

        {/* Main Info Row */}
        <View style={styles.mainInfoRow}>
          <View style={styles.iconBox}>
            <Package size={22} color={PRIMARY} />
          </View>

          <View style={styles.detailsCol}>
            <Text style={styles.name}>{item.name}</Text>
            {item.sku && <Text style={styles.skuText}>{item.sku}</Text>}
            <Text style={styles.priceText}>{formattedPrice}</Text>
          </View>
        </View>

        {/* Bottom Action Row: Quick Qty Controller & Action Icons */}
        <View style={styles.cardFooter}>
          {/* Quick Qty Controller */}
          <View style={styles.qtyControlContainer}>
            <Text style={styles.qtyLabel}>Stock:</Text>
            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuickQtyChange(-1)}
                disabled={item.quantity === 0}
              >
                <Minus size={14} color={item.quantity === 0 ? '#9CA3AF' : '#374151'} />
              </TouchableOpacity>

              <Text style={styles.qtyValueText}>
                {item.quantity} {item.unit}
              </Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuickQtyChange(1)}
              >
                <Plus size={14} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Icons */}
          <View style={styles.actionsGroup}>
            <TouchableOpacity
              style={styles.actionIconBtn}
              onPress={() => setOpen(true)}
            >
              <Pencil size={16} color={PRIMARY} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionIconBtn, styles.deleteIconBtn]}
              onPress={() => setShowDelete(true)}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal visible={open} title="Edit Product" onClose={() => setOpen(false)}>
        <ItemEditForm
          item={item}
          onSave={updated => {
            onUpdate(updated);
            setOpen(false);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={showDelete}
        icon={<AlertTriangle size={45} color="#EF4444" />}
        title="Delete Product"
        message={`Are you sure you want to delete "${item.name}" from your inventory?`}
        cancelText="Cancel"
        confirmText="Delete Product"
        cancelColor="#6B7280"
        confirmColor="#EF4444"
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          onDelete(item.id);
          setShowDelete(false);
        }}
      />
    </>
  );
}

function ItemEditForm({
  item,
  onSave,
}: {
  item: InventoryItem;
  onSave: (item: InventoryItem) => void;
}) {
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.quantity);
  const [unit, setUnit] = useState<UnitType>(item.unit);
  const [price, setPrice] = useState((item.price || 0).toString());
  const [category, setCategory] = useState(item.category || 'Groceries');
  const [minStock, setMinStock] = useState((item.minStockLevel || 5).toString());

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.formLabel}>Item Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
        style={styles.formInput}
      />

      <Text style={styles.formLabel}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, marginVertical: 4 }}
      >
        {INVENTORY_CATEGORIES.filter(c => c !== 'All').map((cat: string) => {
          const isSel = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.formChip, isSel && styles.activeFormChip]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.formChipText, isSel && styles.activeFormChipText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.formLabel}>Selling Price (Rs.)</Text>
      <TextInput
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        placeholder="0.00"
        style={styles.formInput}
      />

      <Text style={styles.formLabel}>Stock Quantity</Text>
      <View style={styles.quantityBox}>
        <TouchableOpacity
          style={styles.qtyControlBtn}
          onPress={() => setQty(q => Math.max(0, q - 1))}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>

        <TextInput
          value={String(qty)}
          keyboardType="numeric"
          onChangeText={value => {
            const number = Number(value);
            if (!isNaN(number)) setQty(number);
          }}
          style={styles.quantityInput}
        />

        <TouchableOpacity
          style={styles.qtyControlBtn}
          onPress={() => setQty(q => q + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.formLabel}>Unit Type</Text>
      <View style={styles.unitContainer}>
        {unitTypes.map(itemUnit => (
          <TouchableOpacity
            key={itemUnit}
            onPress={() => setUnit(itemUnit)}
            style={[styles.unitButton, unit === itemUnit && styles.activeUnit]}
          >
            <Text style={[styles.unitText, unit === itemUnit && styles.activeUnitText]}>
              {itemUnit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.formLabel}>Low Stock Alert Level</Text>
      <TextInput
        value={minStock}
        keyboardType="numeric"
        onChangeText={setMinStock}
        style={styles.formInput}
      />

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() =>
          onSave({
            ...item,
            name,
            quantity: qty,
            unit,
            price: parseFloat(price) || 0,
            category,
            minStockLevel: parseFloat(minStock) || 5,
          })
        }
      >
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  lowStockCard: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFEFA',
  },

  outOfStockCard: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFFDFD',
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  inStockPill: {
    backgroundColor: '#DCFCE7',
  },

  inStockText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  lowStockPill: {
    backgroundColor: '#FEF3C7',
  },

  lowStockText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },

  outOfStockPill: {
    backgroundColor: '#FEE2E2',
  },

  outOfStockText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B91C1C',
  },

  mainInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsCol: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  skuText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1,
  },

  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: PRIMARY,
    marginTop: 3,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },

  qtyControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  qtyLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 6,
  },

  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  qtyValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 4,
  },

  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  actionIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteIconBtn: {
    backgroundColor: '#FEE2E2',
  },

  // Edit Form Styles
  formLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 6,
  },

  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },

  formChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  activeFormChip: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  formChipText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
  },

  activeFormChipText: {
    color: '#FFFFFF',
  },

  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 10,
  },

  quantityInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },

  qtyControlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },

  unitContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },

  unitButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  activeUnit: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  unitText: {
    fontSize: 12,
    color: '#4B5563',
  },

  activeUnitText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  saveBtn: {
    backgroundColor: PRIMARY,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
