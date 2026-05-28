import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';
import LedAlert from '@/components/LedAlert';
import { useSession } from '@/contexts/SessionContext';

const TIME_OPTIONS = Array.from({ length: 25 }, (_, i) => {
  const totalMinutes = 480 + i * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

export default function AdopcionFormScreen() {
  const { nombreMascota } = useLocalSearchParams<{ nombreMascota: string }>();
  const router = useRouter();

  const { email: sessionEmail, name: sessionName, phone: sessionPhone } = useSession();
  const isGuest = !sessionEmail;

  const [nombre, setNombre] = useState(sessionName || '');
  const [email, setEmail] = useState(sessionEmail || '');
  const [telefono, setTelefono] = useState(sessionPhone || '');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [timeQuery, setTimeQuery] = useState('');
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    setNombre(sessionName || '');
  }, [sessionName]);

  useEffect(() => {
    setEmail(sessionEmail || '');
  }, [sessionEmail]);

  useEffect(() => {
    setTelefono(sessionPhone || '');
  }, [sessionPhone]);

  const handleConfirm = () => {
    if (!nombre.trim() || !email.trim() || !telefono.trim() || !fecha || !hora.trim()) {
      alert('Por favor completa todos los campos para agendar la adopción');
      return;
    }
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    router.replace('/(main)/(tabs)/mascotas' as Href);
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
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre"
                placeholderTextColor="#8DAF8B"
                editable={isGuest}
              />
              {!isGuest && (
                <Pressable
                  style={styles.lockButton}
                  onPress={() => router.push('/(main)/profile' as Href)}
                >
                  <Ionicons name="lock-closed" size={20} color="#57A145" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#8DAF8B"
                editable={isGuest}
              />
              {!isGuest && (
                <Pressable
                  style={styles.lockButton}
                  onPress={() => router.push('/(main)/profile' as Href)}
                >
                  <Ionicons name="lock-closed" size={20} color="#57A145" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número Telefónico</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={telefono}
                onChangeText={setTelefono}
                placeholder="Tu número"
                keyboardType="phone-pad"
                placeholderTextColor="#8DAF8B"
                editable={isGuest}
              />
              {!isGuest && (
                <Pressable
                  style={styles.lockButton}
                  onPress={() => router.push('/(main)/profile' as Href)}
                >
                  <Ionicons name="lock-closed" size={20} color="#57A145" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Selecciona la fecha de visita</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day: { dateString: string }) => setFecha(day.dateString)}
                markedDates={{
                  [fecha]: { selected: true, selectedColor: '#1F6829' },
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
            <Text style={styles.label}>Seleccionar hora</Text>
            <Pressable style={styles.input} onPress={() => setTimePickerVisible(true)}>
              <Text style={[styles.inputText, !hora && { color: '#8DAF8B' }]}>
                {hora || 'Seleccionar hora'}
              </Text>
            </Pressable>

            <Modal
              visible={timePickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setTimePickerVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecciona una hora</Text>
                  <TextInput
                    value={timeQuery}
                    onChangeText={setTimeQuery}
                    placeholder="Buscar hora, por ejemplo 08:30"
                    placeholderTextColor="#8DAF8B"
                    style={styles.searchInput}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <FlatList
                    data={TIME_OPTIONS.filter((time) => time.includes(timeQuery))}
                    keyExtractor={(time) => time}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.timeRow}
                        onPress={() => {
                          setHora(item);
                          setTimePickerVisible(false);
                          setTimeQuery('');
                        }}
                      >
                        <Text style={styles.timeText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />

                  <Pressable
                    style={styles.modalClose}
                    onPress={() => {
                      setTimePickerVisible(false);
                      setTimeQuery('');
                    }}
                  >
                    <Text style={styles.modalCloseText}>Cerrar</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
  inputText: {
    fontSize: 16,
    color: '#233627',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1F6829',
  },
  searchInput: {
    backgroundColor: '#F8FFF7',
    borderColor: '#D8EBD2',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#233627',
    fontSize: 16,
  },
  timeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeText: {
    fontSize: 16,
    color: '#233627',
  },
  modalClose: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
  },
  modalCloseText: {
    color: '#1F6829',
    fontWeight: '700',
  },
});
