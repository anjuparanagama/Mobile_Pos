import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Search, ScanBarcode } from 'lucide-react-native';

const PRIMARY = '#7B468C';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
  onScanPress?: () => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSearch,
  onScanPress,
}: SearchBarProps) {
  return (
    <View style={styles.row}>
      {/* Search Input */}
      <View style={styles.container}>
        <Search size={18} color="#9CA3AF" style={styles.icon} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />

        {onSearch && (
          <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
            <Search size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Barcode Scanner */}
      {onScanPress && (
        <TouchableOpacity style={styles.scanBtn} onPress={onScanPress}>
          <ScanBarcode size={23} color={PRIMARY} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#7B468C',
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    height: '100%',
  },

  searchBtn: {
    backgroundColor: PRIMARY,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
