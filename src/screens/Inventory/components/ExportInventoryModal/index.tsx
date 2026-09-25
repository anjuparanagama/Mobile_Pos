import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Download, FileSpreadsheet, FileText, X, Check } from 'lucide-react-native';
import { InventoryItem, InventorySummary } from '../../../../interface/inventory';
import { handleExportInventory } from '../../../../api/exportInventory';

interface ExportInventoryModalProps {
  visible: boolean;
  onClose: () => void;
  filteredItems: InventoryItem[];
  summary: InventorySummary;
  selectedCategory: string;
}

const PRIMARY = '#7B468C';

export default function ExportInventoryModal({
  visible,
  onClose,
  filteredItems,
  summary,
  selectedCategory,
}: ExportInventoryModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'CSV'>('PDF');
  const [isExporting, setIsExporting] = useState(false);

  const formatRs = (val: number) => {
    return `Rs. ${val.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const onTriggerExport = async () => {
    setIsExporting(true);
    await handleExportInventory(
      filteredItems,
      summary,
      selectedCategory,
      selectedFormat,
    );
    setIsExporting(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Download size={20} color={PRIMARY} />
              <Text style={styles.headerTitle}>Export Inventory Report</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {/* Filter Summary Banner */}
            <View style={styles.summaryBanner}>
              <Text style={styles.summaryTitle}>
                Category Filter: {selectedCategory}
              </Text>
              <View style={styles.summaryDetailsRow}>
                <View style={styles.summaryDetail}>
                  <Text style={styles.detailLabel}>Products</Text>
                  <Text style={styles.detailValue}>
                    {filteredItems.length} Items
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryDetail}>
                  <Text style={styles.detailLabel}>Stock Valuation</Text>
                  <Text style={styles.detailValue}>
                    {formatRs(summary.totalValue)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Select Export Format */}
            <Text style={styles.sectionLabel}>Select Export Format</Text>

            <View style={styles.formatOptionsRow}>
              {/* PDF Option */}
              <TouchableOpacity
                style={[
                  styles.formatCard,
                  selectedFormat === 'PDF' && styles.selectedFormatCard,
                ]}
                onPress={() => setSelectedFormat('PDF')}
              >
                <View style={styles.formatIconBox}>
                  <FileText
                    size={28}
                    color={selectedFormat === 'PDF' ? PRIMARY : '#6B7280'}
                  />
                </View>
                <Text
                  style={[
                    styles.formatTitle,
                    selectedFormat === 'PDF' && styles.selectedFormatTitle,
                  ]}
                >
                  PDF Document
                </Text>
                <Text style={styles.formatSub}>
                  Print-ready visual report with stock valuation & status badges
                </Text>
                {selectedFormat === 'PDF' && (
                  <View style={styles.checkBadge}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>

              {/* CSV Option */}
              <TouchableOpacity
                style={[
                  styles.formatCard,
                  selectedFormat === 'CSV' && styles.selectedFormatCard,
                ]}
                onPress={() => setSelectedFormat('CSV')}
              >
                <View style={styles.formatIconBox}>
                  <FileSpreadsheet
                    size={28}
                    color={selectedFormat === 'CSV' ? '#16A34A' : '#6B7280'}
                  />
                </View>
                <Text
                  style={[
                    styles.formatTitle,
                    selectedFormat === 'CSV' && styles.selectedFormatTitle,
                  ]}
                >
                  CSV Spreadsheet
                </Text>
                <Text style={styles.formatSub}>
                  Raw table export compatible with Excel, Sheets, & ERP
                </Text>
                {selectedFormat === 'CSV' && (
                  <View style={[styles.checkBadge, { backgroundColor: '#16A34A' }]}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              disabled={isExporting}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exportBtn}
              onPress={onTriggerExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Download size={16} color="#FFFFFF" />
                  <Text style={styles.exportBtnText}>
                    Export {selectedFormat}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  closeBtn: {
    padding: 4,
  },

  body: {
    padding: 16,
  },

  summaryBanner: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: 6,
  },

  summaryDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  summaryDetail: {
    alignItems: 'center',
  },

  detailLabel: {
    fontSize: 10,
    color: '#6B7280',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#D8B4FE',
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
  },

  formatOptionsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  formatCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    position: 'relative',
  },

  selectedFormatCard: {
    borderColor: PRIMARY,
    backgroundColor: '#FFFFFF',
  },

  formatIconBox: {
    marginBottom: 8,
  },

  formatTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
    textAlign: 'center',
  },

  selectedFormatTitle: {
    color: PRIMARY,
  },

  formatSub: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 13,
  },

  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  cancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },

  exportBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingVertical: 10,
  },

  exportBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
