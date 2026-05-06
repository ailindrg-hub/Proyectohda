import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/** Mismo fondo decorativo (huellas) que registro e inicio de sesión */
export default function RefugioBackground() {
  return (
    <View style={styles.layer} pointerEvents="none">
      <Ionicons name="paw" size={300} color="rgba(71, 170, 87, 0.08)" style={styles.pawTopLeft} />
      <Ionicons name="paw" size={240} color="rgba(253, 214, 69, 0.12)" style={styles.pawMiddleRight} />
      <Ionicons name="paw" size={200} color="rgba(255, 235, 59, 0.1)" style={styles.pawBottomLeft} />
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
});
