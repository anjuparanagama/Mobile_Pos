import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Database, FileText, BarChart2 } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SidemenuParams } from '../../../../interface/sidemenu';
import { THEME_COLORS } from '../../../../constants/dashboardConstants';

export default function QuickActionsHub() {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();

  const actions = [
    {
      id: 'newSale',
      title: 'New Sale',
      icon: <Plus size={20} color="#FFFFFF" />,
      bg: THEME_COLORS.primary,
      textColor: '#FFFFFF',
      isPrimary: true,
      onPress: () => navigation.navigate('Sales'),
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: <Database size={18} color={THEME_COLORS.primary} />,
      bg: THEME_COLORS.primaryLight,
      textColor: THEME_COLORS.primary,
      isPrimary: false,
      onPress: () => navigation.navigate('Inventory'),
    },
    {
      id: 'salesHistory',
      title: 'Sales Log',
      icon: <FileText size={18} color={THEME_COLORS.primary} />,
      bg: THEME_COLORS.primaryLight,
      textColor: THEME_COLORS.primary,
      isPrimary: false,
      onPress: () => navigation.navigate('Sales'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <BarChart2 size={18} color={THEME_COLORS.primary} />,
      bg: THEME_COLORS.primaryLight,
      textColor: THEME_COLORS.primary,
      isPrimary: false,
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            activeOpacity={0.7}
            style={[
              styles.actionBtn,
              { backgroundColor: action.bg },
              action.isPrimary && styles.primaryActionBtn,
            ]}
            onPress={action.onPress}
          >
            <View style={styles.iconWrapper}>{action.icon}</View>
            <Text
              style={[
                styles.actionLabel,
                { color: action.textColor },
                action.isPrimary && styles.primaryActionLabel,
              ]}
              numberOfLines={1}
            >
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7D5EE',
    shadowColor: '#7B468C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryActionBtn: {
    borderColor: THEME_COLORS.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  iconWrapper: {
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryActionLabel: {
    fontWeight: '700',
  },
});
