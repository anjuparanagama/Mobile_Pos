import React, { useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../../component/searchBar';
import Title from '../../component/Title';
import MenuBar from '../../component/menuBar';
import ItemCard from './components/ItemCard';

import { InventoryItem } from '../../interface/inventory';

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Rice',
      quantity: 25,
      unit: 'kg',
    },
    {
      id: 2,
      name: 'Milk',
      quantity: 500,
      unit: 'ml',
    },
  ]);

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdate = (updatedItem: InventoryItem) => {
    setItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title
          title="Inventory"
          tooltip="View and manage your product inventory"
        />
      </View>
      <View style={styles.searchbar}>
        <SearchBar
          placeholder="Search products..."
          onScanPress={() => {
            console.log('Open Barcode Scanner');
          }}
        />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90,
        }}
      >
        <View style={styles.items}>
          {items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </View>
      </ScrollView>

      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },

  title: {
    paddingHorizontal: 20,
  },

  searchbar: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },

  items: {
    marginTop: 10,
  },
});

export default Inventory;
