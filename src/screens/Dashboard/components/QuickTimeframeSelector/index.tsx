import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TimeframeFilter } from '../../../../interface/dashboard';
import { THEME_COLORS, TIMEFRAME_OPTIONS } from '../../../../constants/dashboardConstants';

interface QuickTimeframeSelectorProps {
  selectedTimeframe: TimeframeFilter;
  onSelectTimeframe: (timeframe: TimeframeFilter) => void;
}

export default function QuickTimeframeSelector({
  selectedTimeframe,
  onSelectTimeframe,
}: QuickTimeframeSelectorProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {TIMEFRAME_OPTIONS.map((timeframe: TimeframeFilter) => {
          const isActive = selectedTimeframe === timeframe;
          return (
            <TouchableOpacity
              key={timeframe}
              activeOpacity={0.7}
              style={[styles.chip, isActive && styles.activeChip]}
              onPress={() => onSelectTimeframe(timeframe)}
            >
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                {timeframe}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
  },
  activeChip: {
    backgroundColor: THEME_COLORS.primary,
    borderColor: THEME_COLORS.primary,
    shadowColor: THEME_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME_COLORS.textSecondary,
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
