import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.decorationLayer} pointerEvents="none">
        <Ionicons name="paw" size={300} color="rgba(71, 170, 87, 0.08)" style={styles.pawTopLeft} />
        <Ionicons name="paw" size={240} color="rgba(253, 214, 69, 0.12)" style={styles.pawMiddleRight} />
        <Ionicons name="paw" size={200} color="rgba(255, 235, 59, 0.1)" style={styles.pawBottomLeft} />
      </View>

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
              router.replace({ pathname: '/user-home', params: { email: e } });
            }}
          >
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
    backgroundColor: '#FFFEF5', // Fondo con toque amarillento
  },
  decorationLayer: {
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
