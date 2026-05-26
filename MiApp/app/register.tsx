import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import { isValidEmail, looksLikeEmail, isPhoneNumber } from '@/lib/validation';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contacto, setContacto] = useState('');
  const [banner, setBanner] = useState('');
  const bannerTimerRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  function showBanner(msg: string) {
    setBanner(msg);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    // @ts-ignore - window.setTimeout returns number in browsers
    bannerTimerRef.current = setTimeout(() => setBanner(''), 4000) as unknown as number;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <RefugioScreenShell>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {banner ? (
            <View style={styles.banner} pointerEvents="none">
              <Text style={styles.bannerText}>{banner}</Text>
            </View>
          ) : null}
          <View style={styles.container}>
            {/* Encabezado con Icono */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Ionicons name="person-add" size={72} color="#1F6829" />
              </View>
              <Text style={styles.title}>Registro</Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                value={nombre}
                onChangeText={(t) => {
                  setNombre(t);
                  if (banner) setBanner('');
                }}
                placeholder="Tu nombre"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />

              <Text style={styles.label}>Apellido</Text>
              <TextInput
                value={apellido}
                onChangeText={(t) => {
                  setApellido(t);
                  if (banner) setBanner('');
                }}
                placeholder="Tu apellido"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />

              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                value={contacto}
                onChangeText={setContacto}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />
            </View>

            {/* Botones de Acción */}
            <View style={styles.actionsRow}>
              <Pressable 
                style={[styles.button, styles.leftButton]}
                onPress={() => router.back()}
              >
                <Text style={[styles.buttonText, styles.leftButtonText]}>Volver</Text>
              </Pressable>
              <Pressable 
                style={[styles.button, styles.rightButton]}
                onPress={() => {
                  const n = nombre.trim();
                  const a = apellido.trim();
                  const c = contacto.trim();

                  if (n.length < 3) {
                    showBanner('Muy corto — debe ser de 3 a 25 caracteres');
                    return;
                  }
                  if (n.length > 25) {
                    showBanner('Muy largo — debe ser de 3 a 25 caracteres');
                    return;
                  }
                  if (a.length < 3) {
                    showBanner('Muy corto — debe ser de 3 a 25 caracteres');
                    return;
                  }
                  if (a.length > 25) {
                    showBanner('Muy largo — debe ser de 3 a 25 caracteres');
                    return;
                  }

                  if (!c) {
                    showBanner('Ingresa tu correo electrónico');
                    return;
                  }
                  if (!looksLikeEmail(c)) {
                    if (isPhoneNumber(c)) {
                      showBanner(
                        'Para registrarte necesitas un correo electrónico. El teléfono lo puedes agregar en tu perfil.'
                      );
                    } else {
                      showBanner('Ingresa un correo válido (ej: usuario@dominio.com)');
                    }
                    return;
                  }
                  if (!isValidEmail(c)) {
                    showBanner('Ingresa un correo válido (ej: usuario@dominio.com)');
                    return;
                  }
                  router.push({
                    pathname: '/create-password',
                    params: { contacto: c, nombre: n, apellido: a },
                  });
                }}
              >
                <Text style={[styles.buttonText, styles.rightButtonText]}>Siguiente</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </RefugioScreenShell>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFEF5', // Fondo con toque amarillento
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
  banner: {
    backgroundColor: '#FDECEA',
    borderColor: '#F5A6A6',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 14,
  },
  bannerText: {
    color: '#B00020',
    fontWeight: '700',
    textAlign: 'center',
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
