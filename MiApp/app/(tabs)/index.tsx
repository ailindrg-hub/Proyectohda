import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.decorationLayer} pointerEvents="none">
        <View style={styles.greenBubble} />
        <View style={styles.yellowGlow} />
        <View style={styles.softAccent} />
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="person" size={72} color="#266B2E" />
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
          <Pressable style={[styles.button, styles.rightButton]}>
            <Text style={[styles.buttonText, styles.rightButtonText]}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  decorationLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  greenBubble: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(71, 170, 87, 0.16)',
    top: -80,
    left: -90,
  },
  yellowGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(253, 214, 69, 0.18)',
    top: 120,
    right: -100,
  },
  softAccent: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(130, 194, 142, 0.12)',
    bottom: -60,
    right: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E7F6E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
