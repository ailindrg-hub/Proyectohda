<<<<<<< Updated upstream
import { useState, useRef, useEffect } from 'react';
import {
=======
﻿import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
>>>>>>> Stashed changes
  StyleSheet,
  Text,
  TextInput,
  View,
<<<<<<< Updated upstream
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
=======
} from 'react-native';
>>>>>>> Stashed changes
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import { isValidEmail } from '@/lib/validation';
import { getSupabase, SUPABASE_SETUP_MESSAGE } from '@/lib/supabase';
import { formatAuthError } from '@/lib/auth-errors';
import RefugioScreenShell from '@/components/RefugioScreenShell';

import { useAuth } from '@/hooks/use-auth';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< Updated upstream
  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const { setEmail: saveSessionEmail, setName: saveSessionName, setPhone: saveSessionPhone } = useSession();

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  function showBanner(msg: string) {
    setBanner(msg);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => setBanner(''), 4000);
  }

  async function handleSignIn() {
    const e = email.trim();
    if (!e) {
      showBanner('Ingresa tu correo electrónico');
      return;
    }
    if (!isValidEmail(e)) {
      showBanner('Ingresa un correo válido (ej: usuario@dominio.com)');
      return;
    }
    if (!password) {
      showBanner('Ingresa tu contraseña');
      return;
    }

    setLoading(true);
    let supabase;
    try {
      supabase = getSupabase();
    } catch (err) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : SUPABASE_SETUP_MESSAGE;
      showBanner(msg);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: e,
      password,
    });
    setLoading(false);

    if (error) {
      showBanner(formatAuthError(error.message));
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log('[sign-in] getUser error', userError);
    }

    const user = userData?.user;
    if (user?.email) {
      saveSessionEmail(user.email);
    }
    const metadata = user?.user_metadata as { nombre?: string; apellido?: string; phone?: string } | null;
    const fullName = [metadata?.nombre, metadata?.apellido].filter(Boolean).join(' ').trim();
    if (fullName) {
      saveSessionName(fullName);
    }
    if (metadata?.phone) {
      saveSessionPhone(metadata.phone);
    }

    router.replace('/(main)' as Href);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <RefugioScreenShell>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
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
                  onChangeText={(t) => {
                    setEmail(t);
                    if (banner) setBanner('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="#8DAF8B"
                  style={styles.input}
                  editable={!loading}
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="********"
                  placeholderTextColor="#8DAF8B"
                  style={styles.input}
                  editable={!loading}
                />
              </View>

              <View style={styles.actionsRow}>
                <Pressable
                  style={[styles.button, styles.leftButton]}
                  onPress={() => router.push('/register')}
                  disabled={loading}
                >
                  <Text style={[styles.buttonText, styles.leftButtonText]}>Crear cuenta</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.rightButton, loading && styles.buttonDisabled]}
                  onPress={handleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.buttonText, styles.rightButtonText]}>Iniciar sesión</Text>
                  )}
                </Pressable>
              </View>

              <Pressable
                style={styles.guestButton}
                onPress={() => {
                  saveSessionEmail('Invitado');
                  router.replace('/(main)' as Href);
                }}
                disabled={loading}
              >
                <Text style={styles.guestText}>Continuar como invitado</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </RefugioScreenShell>
=======
  const [busySignUp, setBusySignUp] = useState(false);
  const [busySignIn, setBusySignIn] = useState(false);
  const { signIn, signUp } = useAuth();
  const busy = busySignUp || busySignIn;

  const onSignUp = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Datos incompletos', 'Introduce correo y contraseña.');
      return;
    }
    setBusySignUp(true);
    const { error } = await signUp(email, password);
    setBusySignUp(false);
    if (error) {
      Alert.alert('Error al crear cuenta', error.message);
      return;
    }
    Alert.alert(
      'Cuenta creada',
      'Si tu proyecto exige confirmar el correo, revisa tu bandeja de entrada antes de iniciar sesión.'
    );
  };

  const onSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Datos incompletos', 'Introduce correo y contraseña.');
      return;
    }
    setBusySignIn(true);
    const { error } = await signIn(email, password);
    setBusySignIn(false);
    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

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
            style={[styles.button, styles.leftButton, busy && styles.buttonDisabled]}
            onPress={onSignUp}
            disabled={busy}>
            {busySignUp ? (
              <ActivityIndicator color="#57A145" />
            ) : (
              <Text style={[styles.buttonText, styles.leftButtonText]}>Crear cuenta</Text>
            )}
          </Pressable>
          <Pressable
            style={[styles.button, styles.rightButton, busy && styles.buttonDisabled]}
            onPress={onSignIn}
            disabled={busy}>
            {busySignIn ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.buttonText, styles.rightButtonText]}>Siguiente</Text>
            )}
          </Pressable>
        </View>
      </View>
>>>>>>> Stashed changes
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
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
    marginBottom: 18,
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
    marginBottom: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  leftButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6BB55A',
    marginRight: 12,
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
  rightButton: {
    backgroundColor: '#57A145',
  },
  buttonDisabled: {
    opacity: 0.7,
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
<<<<<<< Updated upstream
  guestButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 10,
  },
  guestText: {
    color: '#8DAF8B',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
=======
  buttonDisabled: {
    opacity: 0.65,
>>>>>>> Stashed changes
  },
});
