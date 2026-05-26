import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import { isValidEmail } from '@/lib/validation';

export default function ConfirmIdentityScreen() {
  const { contacto } = useLocalSearchParams<{ contacto?: string }>();
  const router = useRouter();

  const destination = useMemo(() => {
    const contact = String(contacto ?? '').trim();
    if (!contact) return 'tu correo electrónico o número';
    return isValidEmail(contact)
      ? `tu correo ${contact}`
      : `tu número ${contact}`;
  }, [contacto]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RefugioScreenShell>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Ionicons name="shield-checkmark" size={72} color="#1F6829" />
              </View>
              <Text style={styles.title}>Confirmar identidad</Text>
            </View>

            <View style={styles.messageBox}>
              <Text style={styles.messageTitle}>Revisa {destination}</Text>
              <Text style={styles.messageText}>
                Hemos enviado un mensaje con un código de verificación. Usa ese código para
                confirmar tu identidad y completar tu registro.
              </Text>
            </View>

            <View style={styles.hintBox}>
              <Text style={styles.hintText}>Si no recibes el código, revisa la carpeta de spam o espera unos minutos.</Text>
            </View>

            <View style={styles.actionsRow}>
              <Pressable
                style={[styles.button, styles.leftButton]}
                onPress={() => router.push('/register')}
              >
                <Text style={[styles.buttonText, styles.leftButtonText]}>Editar datos</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.rightButton]}
                onPress={() => router.replace('/(tabs)' as Href)}
              >
                <Text style={[styles.buttonText, styles.rightButtonText]}>Ir a iniciar sesión</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </RefugioScreenShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FBC02D',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F6829',
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#F7FFF4',
    borderColor: '#CDE7B1',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#3E5D39',
    lineHeight: 24,
  },
  hintBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 18,
    marginBottom: 32,
  },
  hintText: {
    fontSize: 15,
    color: '#5E5D45',
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  leftButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6BB55A',
  },
  rightButton: {
    backgroundColor: '#57A145',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  leftButtonText: {
    color: '#57A145',
  },
  rightButtonText: {
    color: '#FFFFFF',
  },
});
