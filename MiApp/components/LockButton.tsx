import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LockButtonProps = {
  onPress: () => void;
  size?: number;
};

export default function LockButton({ onPress, size = 20 }: LockButtonProps) {
  return (
    <Pressable
      style={styles.lockButton}
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Requiere iniciar sesión"
    >
      <Ionicons name="lock-closed" size={size} color="#57A145" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  lockButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF8EC',
    borderWidth: 1,
    borderColor: '#D8EBD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
