import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RefugioScreenShell from '@/components/RefugioScreenShell';

export default function ModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFEF5' }}>
      <RefugioScreenShell>
        <View style={styles.center}>
          <Text style={styles.title}>Ventana modal</Text>
          <Link href="/" dismissTo style={styles.link}>
            <Text style={styles.linkText}>Volver al inicio</Text>
          </Link>
        </View>
      </RefugioScreenShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 16,
  },
  link: {
    marginTop: 8,
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#57A145',
  },
});
