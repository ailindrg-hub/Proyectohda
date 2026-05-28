import { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import { useSession } from '@/contexts/SessionContext';
import { getSupabase, SUPABASE_SETUP_MESSAGE } from '@/lib/supabase';
import { formatAuthError } from '@/lib/auth-errors';
import { getEmailValidationError } from '@/lib/validation';

export default function VerificacionCuentaScreen() {
  const { contacto } = useLocalSearchParams<{ contacto?: string }>();
  const router = useRouter();
  const { pendingRegistration } = useSession();
  const [banner, setBanner] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [verifying, setVerifying] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const email = useMemo(() => {
    const fromParams = String(contacto ?? '').trim().toLowerCase();
    if (fromParams) return fromParams;
    return (pendingRegistration?.contact ?? '').trim().toLowerCase();
  }, [contacto, pendingRegistration?.contact]);

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [countdown]);

  function showBanner(msg: string) {
    setBanner(msg);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => setBanner(''), 5000);
  }

  async function sendVerificationCode() {
    const trimmedEmail = email.trim();
    const emailError = getEmailValidationError(trimmedEmail);
    if (emailError) {
      showBanner(emailError);
      return;
    }
    if (!trimmedEmail) {
      showBanner('No hay correo válido para enviar la verificación. Regresa al paso anterior.');
      return;
    }

    setSending(true);
    setSent(false);

    let supabase;
    try {
      supabase = getSupabase();
    } catch (err) {
      setSending(false);
      const msg = err instanceof Error ? err.message : SUPABASE_SETUP_MESSAGE;
      showBanner(msg);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
    });

    setSending(false);
    if (error) {
      showBanner(formatAuthError(error.message));
      return;
    }

    setSent(true);
    showBanner('Se envió un código al correo. Revisa tu bandeja de entrada.');
    setCountdown(120);
  }

  async function handleResend() {
    setResending(true);
    await sendVerificationCode();
    setResending(false);
  }

  useEffect(() => {
    if (email) {
      sendVerificationCode();
    }
  }, [email]);

  function goToConfirmIdentity() {
    router.replace('/(main)' as Href);
  }

  async function handleVerifyCode() {
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      showBanner('Ingresa el código de verificación.');
      return;
    }

    setVerifying(true);
    let supabase;
    try {
      supabase = getSupabase();
    } catch (err) {
      setVerifying(false);
      const msg = err instanceof Error ? err.message : SUPABASE_SETUP_MESSAGE;
      showBanner(msg);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: trimmedCode,
      type: 'email',
    });

    setVerifying(false);
    if (error) {
      showBanner('El código es incorrecto. Verifica e intenta nuevamente.');
      return;
    }

    showBanner('¡Código verificado! Bienvenido.');
    router.replace('/(main)' as Href);
  }

  function goBackToRegister() {
    router.push('/register');
  }

  function goToInicio() {
    router.replace('/(tabs)' as Href);
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
            keyboardShouldPersistTaps="handled"
          >
            {banner ? (
              <View style={styles.banner}>
                <Text style={styles.bannerText}>{banner}</Text>
              </View>
            ) : null}

            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.iconCircle}>
                  <Ionicons name="shield-checkmark" size={72} color="#1F6829" />
                </View>
                <Text style={styles.title}>Verifica tu cuenta</Text>
                <Text style={styles.subtitle}>Te enviaremos solo un código a tu correo.</Text>
              </View>

              <View style={styles.messageBox}>
                <Text style={styles.messageTitle}>Revisa {email || 'tu correo'}.</Text>
                <Text style={styles.messageText}>
                  Abre el código que te enviamos para completar el registro.
                </Text>
              </View>

              <View style={styles.codeSection}>
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdownLabel}>Tiempo restante</Text>
                  <Text style={styles.countdownText}>
                    {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                  </Text>
                </View>
                <Text style={styles.codeLabel}>Código de verificación</Text>
                <TextInput
                  value={code}
                  onChangeText={(text) => setCode(text.replace(/\D/g, '').slice(0, 8))}
                  placeholder="000000"
                  placeholderTextColor="#8DAF8B"
                  keyboardType="number-pad"
                  maxLength={8}
                  style={styles.codeInput}
                  editable={countdown > 0}
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                />
              </View>

              <Pressable
                style={[styles.resendButton, (sending || resending || countdown > 0) && styles.buttonDisabled]}
                onPress={handleResend}
                disabled={sending || resending || !email || countdown > 0}
              >
                {resending ? (
                  <ActivityIndicator color="#1F6829" />
                ) : (
                  <Text style={styles.resendButtonText}>Reenviar código</Text>
                )}
              </Pressable>

              <View style={styles.actionsRow}> 
                <Pressable style={[styles.button, styles.leftButton]} onPress={goBackToRegister}>
                  <Text style={[styles.buttonText, styles.leftButtonText]}>Editar datos</Text>
                </Pressable>
                <Pressable 
                  style={[styles.button, styles.rightButton, (verifying || !code.trim()) && styles.buttonDisabled]} 
                  onPress={handleVerifyCode}
                  disabled={verifying || !code.trim()}
                >
                  {verifying ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.buttonText, styles.rightButtonText]}>Verificar código</Text>
                  )}
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
    backgroundColor: '#FFFEF5',
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 32,
  },
  banner: {
    marginHorizontal: 24,
    marginBottom: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  bannerText: {
    color: '#B71C1C',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
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
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#233627',
    textAlign: 'center',
    maxWidth: '90%',
    lineHeight: 22,
  },
  messageBox: {
    marginBottom: 24,
    padding: 18,
    backgroundColor: '#F8FFF7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F6829',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#233627',
  },
  infoBox: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B8B5C',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 16,
    color: '#233627',
  },
  codeSection: {
    marginBottom: 24,
    gap: 12,
  },
  countdownContainer: {
    backgroundColor: '#FFF9E5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0C261',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8A6F19',
    marginBottom: 6,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F6829',
    fontFamily: 'Courier New',
  },
  newCodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F6829',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 12,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F6829',
    marginLeft: 4,
  },
  codeInput: {
    backgroundColor: '#F8FFF7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    fontSize: 20,
    fontWeight: '700',
    color: '#233627',
    textAlign: 'center',
    letterSpacing: 4,
    fontFamily: 'Courier New',
  },
  sendButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1F6829',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  verifyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    borderWidth: 1,
    borderColor: '#1F6829',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  verifyButtonText: {
    color: '#1F6829',
    fontWeight: '700',
    fontSize: 16,
  },
  verifyButtonTextDisabled: {
    color: '#8DAF8B',
  },
  resendButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFF9E5',
    borderWidth: 1,
    borderColor: '#F0C261',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resendButtonText: {
    color: '#8A6F19',
    fontWeight: '700',
    fontSize: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 56,
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
  linkButton: {
    marginTop: 12,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    borderWidth: 1,
    borderColor: '#1F6829',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButtonText: {
    color: '#1F6829',
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
  buttonDisabled: {
    opacity: 0.7,
  },
});
