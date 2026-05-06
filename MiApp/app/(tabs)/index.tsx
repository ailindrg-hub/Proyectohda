import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import RefugioScreenShell from '@/components/RefugioScreenShell';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setEmail: saveSessionEmail } = useSession();

  return (
    <SafeAreaView style={styles.safeArea}>
      <RefugioScreenShell>
        <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="person" size={72} color="#1F6829" />
          </View>
          <Text style={styles.title}>Inicio de sesión</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#8DAF8B"
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
            placeholderTextColor="#8DAF8B"
            style={styles.input}
          />
        </View>

        <View style={styles.actionsRow}>
          <Pressable 
            style={[styles.button, styles.leftButton]}
            onPress={() => router.push('/register')}
          >
            <Text style={[styles.buttonText, styles.leftButtonText]}>Crear cuenta</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.rightButton]}
            onPress={() => {
              const e = email.trim();
              if (!e) {
                alert('Ingresa tu correo electrónico');
                return;
              }
              if (!password) {
                alert('Ingresa tu contraseña');
                return;
              }
              saveSessionEmail(e);
              router.replace('/(main)' as Href);
            }}
          >
            <Text style={[styles.buttonText, styles.rightButtonText]}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
      </RefugioScreenShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9C4', // Amarillo suave
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FBC02D', // Borde amarillo
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F6829',
  },
  form: {
    gap: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E5D39',
    marginBottom: 8,
  },
  input: {
    height: 54,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    color: '#233627',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
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
