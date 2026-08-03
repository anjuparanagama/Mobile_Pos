import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import { Info } from 'lucide-react-native';

interface TitleProps {
  title: string;
  tooltip?: string;
}

export default function Title({ title, tooltip }: TitleProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {tooltip && (
        <>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.infoBtn}
          >
            <Info size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setVisible(false)}
            >
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{tooltip}</Text>
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
  },

  infoBtn: {
    padding: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tooltip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    maxWidth: 280,
  },

  tooltipText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
});
