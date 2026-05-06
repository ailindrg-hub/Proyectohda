import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import RefugioBackground from '@/components/RefugioBackground';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Mismo fondo crema (#FFFEF5) y huellas que el inicio de sesión; el contenido queda encima. */
export default function RefugioScreenShell({ children, style }: Props) {
  return (
    <View style={[styles.root, style]}>
      <RefugioBackground />
      <View style={styles.foreground}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  foreground: {
    flex: 1,
    zIndex: 1,
  },
});
