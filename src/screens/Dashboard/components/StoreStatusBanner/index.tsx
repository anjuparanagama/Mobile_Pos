import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Store, ShieldCheck, Zap } from 'lucide-react-native';
import { THEME_COLORS } from '../../../../constants/dashboardConstants';

export default function StoreStatusBanner() {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Left: Store status pill */}
        <View style={styles.leftBox}>
          <View style={styles.storeIconBg}>
            <Store size={18} color={THEME_COLORS.primary} />
          </View>
          <View>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.storeStatusText}>Store Open • Main Terminal</Text>
            </View>
            <Text style={styles.targetText}>Daily Goal: 75% Achieved (Rs. 245k / 320k)</Text>
          </View>
        </View>

        {/* Right Badge */}
        <View style={styles.syncBadge}>
          <ShieldCheck size={12} color={THEME_COLORS.success} />
          <Text style={styles.syncText}>Online</Text>
        </View>
      </View>

      {/* Progress Track for Daily Target */}
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME_COLORS.primaryBorder,
    shadowColor: THEME_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  storeIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: THEME_COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME_COLORS.success,
  },
  storeStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME_COLORS.textPrimary,
  },
  targetText: {
    fontSize: 10,
    color: THEME_COLORS.textMuted,
    marginTop: 2,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: THEME_COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME_COLORS.success,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '76.8%',
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 2,
  },
});
