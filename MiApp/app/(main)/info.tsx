import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars/src';
import { useRouter } from 'expo-router';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

// Configurar el calendario en español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

export default function InfoScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (!selectedDate) {
      alert('Por favor selecciona un día para tu cita');
      return;
    }
    // Navegar al formulario de la cita con la fecha seleccionada
    router.push({
      pathname: '/(main)/cita-form',
      params: { fecha: selectedDate }
    });
  };

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="calendar" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Citas</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Selecciona un día en el calendario para agendar tu cita en el refugio.
        </Text>
        <Text style={styles.warningText}>Solo citas de recorrido</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#1F6829' }
          }}
          theme={{
            todayTextColor: '#57A145',
            arrowColor: '#1F6829',
            selectedDayBackgroundColor: '#1F6829',
            selectedDayTextColor: '#ffffff',
            textDayFontWeight: '600',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '700',
            calendarBackground: 'transparent',
          }}
          style={styles.calendar}
        />
      </View>

      <Pressable 
        style={[styles.nextButton, !selectedDate && styles.disabledButton]} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Siguiente</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  warningText: {
    color: '#C62828',
    fontWeight: '800',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  calendar: {
    borderRadius: 15,
  },
  nextButton: {
    backgroundColor: '#57A145',
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    shadowColor: '#57A145',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#A5C9A2',
    elevation: 0,
    shadowOpacity: 0,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  }
});
