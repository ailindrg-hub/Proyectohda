import { useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import { useSession } from '@/contexts/SessionContext';
import { formatAuthError } from '@/lib/auth-errors';
import { resendSignupVerification, verifyEmailOtp } from '@/lib/email-verification';
import { LOGIN_ROUTE } from '@/lib/logout';
import { updateProfile } from '@/lib/profile';
import { getEmailValidationError } from '@/lib/validation';

export default function ConfirmIdentityScreen() {
  const { contacto } = useLocalSearchParams<{ contacto?: string }>();
  const router = useRouter();
  const {
    pendingRegistration,
    setEmail: saveSessionEmail,
    setName: saveSessionName,
    setPhone: saveSessionPhone,
    clearRegistrationFlow,
  } = useSession();

  const email = useMemo(() => {
    const fromParams = String(contacto ?? '').trim();
    if (fromParams) return fromParams.toLowerCase();
    return (pendingRegistration?.contact ?? '').trim().toLowerCase();
  }, [contacto, pendingRegistration?.contact]);

  const [code, setCode] = useState('');
  const [banner, setBanner] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const destination = email || 'tu correo electrónico';

  function showBanner(msg: string) {
    setBanner(msg);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => setBanner(''), 5000);
  }

  async function finishRegistration(sessionUserId: string) {
    const pending = pendingRegistration;
    const nombre = pending?.nombre ?? '';
    const apellido = pending?.apellido ?? '';
    const fullName = [nombre, apellido].filter(Boolean).join(' ').trim();

    if (nombre || apellido) {
      const profileResult = await updateProfile(sessionUserId, {
        nombre: nombre || null,
        apellido: apellido || null,
        phone: null,
      });
      if (profileResult.error) {
        console.warn('[confirm-identity] updateProfile', profileResult.error);
      }
    }

    if (email) saveSessionEmail(email);
    if (fullName) saveSessionName(fullName);
    saveSessionPhone('');
    clearRegistrationFlow();
    router.replace('/(main)' as Href);
  }

  async function handleVerify() {
    const emailError = getEmailValidationError(email);
    if (emailError) {
      showBanner(emailError);
      return;
    }

    const trimmedCode = code.replace(/\D/g, '');
    if (trimmedCode.length < 6) {
      showBanner('Ingresa el código de 6 dígitos que enviamos a tu correo.');
      return;
    }

    setVerifying(true);
    const result = await verifyEmailOtp(email, trimmedCode);
    setVerifying(false);

    if (!result.ok) {
      showBanner(formatAuthError(result.error));
      return;
    }

    const userId = result.session.user.id;
    await finishRegistration(userId);
  }

  async function handleResend() {
    const emailError = getEmailValidationError(email);
    if (emailError) {
      showBanner(emailError);
      return;
    }

    setResending(true);
    const { error } = await resendSignupVerification(email);
    setResending(false);

    if (error) {
      showBanner(formatAuthError(error));
      return;
    }

    showBanner('Te enviamos un nuevo código. Revisa tu correo (y la carpeta de spam).');
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
                <Text style={styles.title}>Confirmar identidad</Text>
              </View>

              <View style={styles.messageBox}>
                <Text style={styles.messageTitle}>Revisa {destination}</Text>
                <Text style={styles.messageText}>
                  Enviamos un código de verificación a tu correo. Escríbelo aquí para completar tu
                  registro. Si prefieres, también puedes abrir el enlace del mismo correo.
                </Text>
              </View>

              <View style={styles.codeSection}>
                <Text style={styles.codeLabel}>Código de verificación</Text>
                <TextInput
                  value={code}
                  onChangeText={(text) => setCode(text.replace(/\D/g, '').slice(0, 8))}
                  placeholder="000000"
                  placeholderTextColor="#8DAF8B"
                  keyboardType="number-pad"
                  maxLength={8}
                  style={styles.codeInput}
                  editable={!verifying}
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                />
              </View>

              <Pressable
                style={[styles.verifyButton, verifying && styles.buttonDisabled]}
                onPress={handleVerify}
                disabled={verifying}
              >
                {verifying ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.verifyButtonText}>Verificar código</Text>
                )}
              </Pressable>

              <Pressable
                style={[styles.resendButton, resending && styles.buttonDisabled]}
                onPress={handleResend}
                disabled={resending}
              >
                {resending ? (
                  <ActivityIndicator color="#1F6829" />
                ) : (
                  <Text style={styles.resendButtonText}>Reenviar código</Text>
                )}
              </Pressable>

              <View style={styles.hintBox}>
                <Text style={styles.hintText}>
                  Si no recibes el código, revisa spam o espera unos minutos antes de reenviar.
                </Text>
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
                  onPress={() => router.replace(LOGIN_ROUTE)}
                >
                  <Text style={[styles.buttonText, styles.rightButtonText]}>Iniciar sesión</Text>
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
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#F7FFF4',
    borderColor: '#CDE7B1',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#3E5D39',
    lineHeight: 24,
  },
  codeSection: {
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#556D52',
    marginBottom: 8,
    marginLeft: 4,
  },
  codeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D8EBD2',
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: '800',
    color: '#1F6829',
    textAlign: 'center',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: '#1F6829',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  resendButton: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D8EBD2',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  resendButtonText: {
    color: '#1F6829',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  hintBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  hintText: {
    fontSize: 14,
    color: '#5E5D45',
    lineHeight: 22,
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 15,
    fontWeight: '700',
  },
  leftButtonText: {
    color: '#57A145',
  },
  rightButtonText: {
    color: '#FFFFFF',
  },
});
