import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import type { SidemenuParams } from '../../interface/sidemenu';

const PRIMARY = '#7B468C';

export default function MobileBottomNavbar() {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();

  const route = useRoute();

  const isActive = (name: string) => route.name === name;

  return (
    <View style={styles.container}>
      {/* Dashboard */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather
          name="grid"
          size={22}
          color={isActive('Home') ? PRIMARY : '#9CA3AF'}
        />
        <Text style={[styles.label, isActive('Home') && styles.activeLabel]}>
          Dashboard
        </Text>
      </TouchableOpacity>

      {/* Orders */}
      <TouchableOpacity
        style={styles.item}
        /* onPress={() => navigation.navigate('Orders')} */
      >
        <Feather
          name="database"
          size={22}
          color={isActive('Orders') ? PRIMARY : '#9CA3AF'}
        />
        <Text style={[styles.label, isActive('Orders') && styles.activeLabel]}>
          Inventory
        </Text>
      </TouchableOpacity>

      {/* New Sale - inline, same row, no overlay */}
      <TouchableOpacity
        style={styles.item}
        /* onPress={() => navigation.navigate('NewSale')} */
      >
        <View style={styles.saleCircle}>
          <Feather name="plus" size={20} color="#fff" />
        </View>
        <Text style={[styles.label, isActive('NewSale') && styles.activeLabel]}>
          POS
        </Text>
      </TouchableOpacity>

      {/* Products */}
      <TouchableOpacity
        style={styles.item}
        /* onPress={() => navigation.navigate('Products')} */
      >
        <Feather
          name="file-text"
          size={22}
          color={isActive('Products') ? PRIMARY : '#9CA3AF'}
        />
        <Text
          style={[styles.label, isActive('Products') && styles.activeLabel]}
        >
          Sales
        </Text>
      </TouchableOpacity>

      {/* Customers */}
      <TouchableOpacity
        style={styles.item}
        /* onPress={() => navigation.navigate('Customers')} */
      >
        <Feather
          name="more-horizontal"
          size={22}
          color={isActive('Customers') ? PRIMARY : '#9CA3AF'}
        />
        <Text
          style={[styles.label, isActive('Customers') && styles.activeLabel]}
        >
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  // all 5 items share equal width, same row, centered content
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  label: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },

  activeLabel: {
    color: PRIMARY,
    fontWeight: '700',
  },

  // plus icon just gets a colored circle background, still inline
  saleCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
