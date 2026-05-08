import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/** Mismo fondo decorativo (huellas) que registro e inicio de sesión */
export default function RefugioBackground() {
  return (
    <View style={styles.layer} pointerEvents="none">
      <Ionicons name="paw" size={320} color="rgba(71, 170, 87, 0.14)" style={styles.pawTopLeft} />
      <Ionicons name="paw" size={260} color="rgba(253, 214, 69, 0.2)" style={styles.pawMiddleRight} />
      <Ionicons name="paw" size={220} color="rgba(255, 235, 59, 0.16)" style={styles.pawBottomLeft} />
      <Ionicons name="paw" size={180} color="rgba(71, 170, 87, 0.12)" style={styles.pawBottomRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  pawTopLeft: {
    position: 'absolute',
    top: -50,
    left: -60,
    transform: [{ rotate: '-15deg' }],
  },
  pawMiddleRight: {
    position: 'absolute',
    top: '25%',
    right: -80,
    transform: [{ rotate: '20deg' }],
  },
  pawBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    transform: [{ rotate: '10deg' }],
  },
  pawBottomRight: {
    position: 'absolute',
    bottom: 80,
    right: -30,
    transform: [{ rotate: '-20deg' }],
  },
});
