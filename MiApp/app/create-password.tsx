import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import { isValidEmail, looksLikeEmail, isPhoneNumber } from '@/lib/validation';
import RefugioScreenShell from '@/components/RefugioScreenShell';

export default function CreatePasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setEmail: saveSessionEmail } = useSession();
  const { contacto } = useLocalSearchParams<{ contacto?: string }>();

  const hasMinLength = password.length >= 8;
  const hasMaxLength = password.length <= 15 && password.length > 0;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

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
          <View style={styles.container}>
            {/* Encabezado con Icono */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed" size={72} color="#1F6829" />
              </View>
              <Text style={styles.title}>Crear Contraseña</Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#8DAF8B"
                  secureTextEntry={!showPassword}
                  style={styles.inputWithIcon}
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={24} 
                    color="#57A145" 
                  />
                </Pressable>
              </View>

              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#8DAF8B"
                secureTextEntry
                style={styles.input}
              />

              <View style={styles.passwordSpecs}>
                <View style={styles.specRow}>
                  <Ionicons
                    name={hasMinLength ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={hasMinLength ? '#28A745' : '#8DAF8B'}
                    style={styles.specIcon}
                  />
                  <Text style={[styles.specText, hasMinLength && styles.specTextValid]}>
                    Mínimo 8 caracteres
                  </Text>
                </View>
                <View style={styles.specRow}>
                  <Ionicons
                    name={hasMaxLength ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={hasMaxLength ? '#28A745' : '#8DAF8B'}
                    style={styles.specIcon}
                  />
                  <Text style={[styles.specText, hasMaxLength && styles.specTextValid]}>
                    Máximo 15 caracteres
                  </Text>
                </View>
                <View style={styles.specRow}>
                  <Ionicons
                    name={hasUppercase ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={hasUppercase ? '#28A745' : '#8DAF8B'}
                    style={styles.specIcon}
                  />
                  <Text style={[styles.specText, hasUppercase && styles.specTextValid]}>
                    Una mayúscula
                  </Text>
                </View>
                <View style={styles.specRow}>
                  <Ionicons
                    name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={hasNumber ? '#28A745' : '#8DAF8B'}
                    style={styles.specIcon}
                  />
                  <Text style={[styles.specText, hasNumber && styles.specTextValid]}>
                    Un número
                  </Text>
                </View>
              </View>
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
                  if (!contacto || !String(contacto).trim()) {
                    alert('Falta el correo o contacto. Vuelve al paso anterior.');
                    return;
                  }
                  const cStr = String(contacto).trim();
                  if (looksLikeEmail(cStr) && !isValidEmail(cStr)) {
                    alert('El correo proporcionado no es válido. Vuelve y corrígelo.');
                    return;
                  }
                  // Si es número, validar 10 dígitos
                  const onlyDigits = cStr.replace(/\D/g, '');
                  if (!looksLikeEmail(cStr) && onlyDigits.length > 0 && !isPhoneNumber(cStr)) {
                    alert('El número de contacto debe tener 10 dígitos.');
                    return;
                  }
                  if (!password.trim()) {
                    alert('Ingresa una contraseña');
                    return;
                  }
                  if (!hasMinLength || !hasMaxLength || !hasUppercase || !hasNumber) {
                    alert('La contraseña debe tener de 8 a 15 caracteres, una mayúscula y un número.');
                    return;
                  }
                  if (password !== confirmPassword) {
                    alert('Las contraseñas no coinciden');
                    return;
                  }
                  saveSessionEmail(String(contacto).trim());
                  router.replace('/(main)' as Href);
                }}
              >
                <Text style={[styles.buttonText, styles.rightButtonText]}>Registrarse</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8EBD2',
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    height: 54,
  },
  inputWithIcon: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 18,
    color: '#233627',
  },
  eyeIcon: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  passwordSpecs: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    borderWidth: 1,
    borderColor: '#D8EBD2',
    gap: 10,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specIcon: {
    marginRight: 10,
  },
  specText: {
    color: '#8DAF8B',
    fontSize: 14,
  },
  specTextValid: {
    color: '#28A745',
    fontWeight: '700',
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
