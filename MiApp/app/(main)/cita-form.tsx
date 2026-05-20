import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';
import LedAlert from '@/components/LedAlert';

export default function CitaFormScreen() {
  const { fecha } = useLocalSearchParams<{ fecha: string }>();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [hora, setHora] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleConfirm = () => {
    if (!email.trim() || !hora.trim()) {
      alert('Por favor completa todos los campos para confirmar tu cita');
      return;
    }
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    // Volver a la pantalla de citas o al inicio
    router.replace('/(main)/info');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={refugioScreenStyles.scroll}
        contentContainerStyle={refugioScreenStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={refugioScreenStyles.heroCard}>
          <View style={refugioScreenStyles.heroRow}>
            <Ionicons name="document-text" size={24} style={refugioScreenStyles.heroIconTint} />
            <Text style={refugioScreenStyles.heroTitle}>Detalles de la Cita</Text>
          </View>
          <Text style={refugioScreenStyles.heroText}>
            Día seleccionado: <Text style={{fontWeight: 'bold'}}>{fecha}</Text>. Completa el formulario para finalizar.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#8DAF8B"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Seleccionar hora desde un reloj</Text>
            <TextInput
              style={styles.input}
              value={hora}
              onChangeText={setHora}
              placeholder="Ej: 10:00 AM o 16:30"
              placeholderTextColor="#8DAF8B"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </Pressable>
          
          <Pressable style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </Pressable>
        </View>

        <LedAlert 
          visible={alertVisible}
          message={`Su cita ha sido realizada correctamente: ${fecha} a las ${hora}`}
          onClose={handleCloseAlert}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
    marginTop: 10,
    marginBottom: 30,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F6829',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F8FFF7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    fontSize: 16,
    color: '#233627',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#57A145',
  },
  backButtonText: {
    color: '#57A145',
    fontSize: 18,
    fontWeight: '700',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#1F6829',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1F6829',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
  }
});
