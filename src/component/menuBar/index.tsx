import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import type { SidemenuParams } from '../../interface/sidemenu';

export default function MobileBottomNavbar() {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="home" size={22} color="#9CA3AF" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Saved */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Saved')}
      >
        <Feather name="bookmark" size={22} color="#9CA3AF" />
        <Text style={styles.label}>Saved</Text>
      </TouchableOpacity>

      {/* Floating Plus Button */}
      <View style={styles.plusWrapper}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate('PostAd')}
        >
          <Feather name="plus" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.label}>Post Ad</Text>
      </View>
      <View style={{ width: 30 }} />

      {/* Settings */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Settings')}
      >
        <Feather name="settings" size={22} color="#9CA3AF" />
        <Text style={styles.label}>Settings</Text>
      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Account')}
      >
        <Feather name="user" size={22} color="#9CA3AF" />
        <Text style={styles.label}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  plusWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -30 }],
    bottom: 20,
    alignItems: 'center',
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffb703',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f3f3f3',
  },
});
