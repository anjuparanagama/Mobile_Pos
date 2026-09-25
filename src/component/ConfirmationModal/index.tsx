import React from 'react';

import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmationModalProps {
  visible: boolean;

  icon?: React.ReactNode;

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;

  confirmColor?: string;

  cancelColor?: string;

  onConfirm: () => void;

  onCancel: () => void;
}

export default function ConfirmationModal({
  visible,

  icon,

  title,

  message,

  confirmText = 'Confirm',

  cancelText = 'Cancel',

  confirmColor = '#7b468c',

  cancelColor = '#666',

  onConfirm,

  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {icon && <View style={styles.icon}>{icon}</View>}

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: cancelColor,
                },
              ]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: confirmColor,
                },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
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

    backgroundColor: 'rgba(0,0,0,0.45)',

    justifyContent: 'center',

    alignItems: 'center',
  },

  container: {
    width: '85%',

    backgroundColor: '#fff',

    borderRadius: 20,

    padding: 25,

    alignItems: 'center',
  },

  icon: {
    marginBottom: 15,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    color: '#222',

    marginBottom: 10,
  },

  message: {
    fontSize: 15,

    color: '#666',

    textAlign: 'center',

    marginBottom: 25,
  },

  actions: {
    flexDirection: 'row',

    gap: 12,

    width: '100%',
  },

  button: {
    flex: 1,

    paddingVertical: 13,

    borderRadius: 10,

    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',

    fontWeight: '700',
  },
});
