import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../../component/searchBar';
import Title from '../../component/Title';
import MenuBar from '../../component/menuBar';

const Inventory = () => {
  return (
    <View style={styles.container}>
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
        <Title
          title="Inventory"
          tooltip="View and manage your product inventory"
        />
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

  searchbar: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default Inventory;
