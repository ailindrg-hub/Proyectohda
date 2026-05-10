import React from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';

interface LedAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function LedAlert({ visible, message, onClose }: LedAlertProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Pressable>
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
  },
  alertContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    borderWidth: 4,
    borderColor: '#4CAF50', // Verde brillante
    alignItems: 'center',
    // Efecto LED (Resplandor verde)
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 25,
  },
  message: {
    fontSize: 18,
    color: '#1F6829',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  }
});
