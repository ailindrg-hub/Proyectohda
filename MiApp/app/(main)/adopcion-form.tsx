import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';
import LedAlert from '@/components/LedAlert';

export default function AdopcionFormScreen() {
  const { nombreMascota } = useLocalSearchParams<{ nombreMascota: string }>();
  const router = useRouter();
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleConfirm = () => {
    if (!nombre.trim() || !email.trim() || !telefono.trim() || !fecha || !hora.trim()) {
      alert('Por favor completa todos los campos para agendar la adopción');
      return;
    }
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    router.replace('/(main)/mascotas');
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
            <Ionicons name="heart" size={24} style={refugioScreenStyles.heroIconTint} />
            <Text style={refugioScreenStyles.heroTitle}>Adopción: {nombreMascota}</Text>
          </View>
          <Text style={refugioScreenStyles.heroText}>
            Estás a un paso de darle un hogar a {nombreMascota}. Completa tus datos para la entrevista inicial.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Tu nombre"
              placeholderTextColor="#8DAF8B"
            />
          </View>

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
            <Text style={styles.label}>Número Telefónico</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Tu número"
              keyboardType="phone-pad"
              placeholderTextColor="#8DAF8B"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Selecciona la fecha de visita</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day: any) => setFecha(day.dateString)}
                markedDates={{
                  [fecha]: { selected: true, selectedColor: '#1F6829' }
                }}
                theme={{
                  todayTextColor: '#57A145',
                  arrowColor: '#1F6829',
                  selectedDayBackgroundColor: '#1F6829',
                  calendarBackground: 'transparent',
                }}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora de la cita</Text>
            <TextInput
              style={styles.input}
              value={hora}
              onChangeText={setHora}
              placeholder="Ej: 11:30 AM"
              placeholderTextColor="#8DAF8B"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Cancelar</Text>
          </Pressable>
          
          <Pressable style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </Pressable>
        </View>

        <LedAlert 
          visible={alertVisible}
          message={`Su cita ha sido realizada correctamente: ${fecha} a las ${hora}. \n\nLa asignación de cita NO garantiza la adopcion de la mascota.`}
          onClose={handleCloseAlert}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
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
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D8EBD2',
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
    borderColor: '#C62828',
  },
  backButtonText: {
    color: '#C62828',
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
