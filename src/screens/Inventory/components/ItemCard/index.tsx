import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import Modal from '../../../../component/Modal';
import ConfirmationModal from '../../../../component/ConfirmationModal';

import { InventoryItem } from '../../../../interface/inventory';
import { unitTypes, UnitType } from '../../../../constants/unitTypes';

import { Trash2, Pencil, AlertTriangle } from 'lucide-react-native';

interface Props {
  item: InventoryItem;
  onDelete: (id: number) => void;
  onUpdate: (item: InventoryItem) => void;
}

export default function ItemCard({ item, onDelete, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.qty}>
            Qty : {item.quantity} {item.unit}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Pencil size={20} color="#7b468c" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDelete(true)}>
            <Trash2 size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Modal */}

      <Modal visible={open} title="Edit Item" onClose={() => setOpen(false)}>
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
        icon={<AlertTriangle size={45} color="red" />}
        title="Delete Item"
        message={`Are you sure you want to delete ${item.name}?`}
        cancelText="Cancel"
        confirmText="Delete"
        cancelColor="#777"
        confirmColor="#ef4444"
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

  const units = unitTypes;

  return (
    <View>
      <Text style={styles.label}>Item Name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
        style={styles.input}
      />

      <Text style={styles.label}>Quantity</Text>

      <View style={styles.quantityBox}>
        <TouchableOpacity onPress={() => setQty(q => Math.max(0, q - 1))}>
          <Text style={styles.btn}>-</Text>
        </TouchableOpacity>

        <TextInput
          value={String(qty)}
          keyboardType="numeric"
          onChangeText={value => {
            const number = Number(value);

            if (!isNaN(number)) {
              setQty(number);
            }
          }}
          style={styles.quantityInput}
        />

        <TouchableOpacity onPress={() => setQty(q => q + 1)}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Unit</Text>

      <View style={styles.unitContainer}>
        {units.map(itemUnit => (
          <TouchableOpacity
            key={itemUnit}
            onPress={() => setUnit(itemUnit)}
            style={[styles.unitButton, unit === itemUnit && styles.activeUnit]}
          >
            <Text
              style={[
                styles.unitText,

                unit === itemUnit && styles.activeUnitText,
              ]}
            >
              {itemUnit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.save}
        onPress={() =>
          onSave({
            ...item,

            name,

            quantity: qty,

            unit,
          })
        }
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',

    padding: 16,

    borderRadius: 14,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 10,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 5,

    elevation: 3,
  },

  info: {},

  name: {
    fontSize: 16,

    fontWeight: '700',
  },

  qty: {
    marginTop: 5,

    color: '#666',
  },

  actions: {
    flexDirection: 'row',

    gap: 18,
  },

  label: {
    fontSize: 14,

    fontWeight: '600',

    marginBottom: 8,

    marginTop: 12,
  },

  input: {
    borderWidth: 1,

    borderColor: '#ddd',

    borderRadius: 10,

    padding: 12,

    fontSize: 16,
  },

  quantityBox: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 25,

    marginVertical: 15,
  },

  quantityInput: {
    borderWidth: 1,

    borderColor: '#ddd',

    width: 90,

    textAlign: 'center',

    borderRadius: 10,

    padding: 8,

    fontSize: 18,
  },

  btn: {
    fontSize: 30,

    fontWeight: '700',
  },

  unitContainer: {
    flexDirection: 'row',

    gap: 10,

    marginVertical: 15,
  },

  unitButton: {
    borderWidth: 1,

    borderColor: '#ddd',

    paddingHorizontal: 18,

    paddingVertical: 8,

    borderRadius: 20,
  },

  activeUnit: {
    backgroundColor: '#7b468c',

    borderColor: '#7b468c',
  },

  unitText: {
    color: '#555',
  },

  activeUnitText: {
    color: '#fff',
  },

  save: {
    backgroundColor: '#7b468c',

    padding: 14,

    borderRadius: 10,

    alignItems: 'center',

    marginTop: 15,
  },

  saveText: {
    color: '#fff',

    fontWeight: '600',
  },
});
