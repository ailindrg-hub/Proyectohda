import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import GuestLoginPrompt from '@/components/GuestLoginPrompt';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';
import { useGuestGate } from '@/hooks/use-guest-gate';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};
LocaleConfig.defaultLocale = 'es';

export default function InfoScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();
  const { isGuest, promptVisible, showLoginPrompt, hideLoginPrompt, gateAction } = useGuestGate();

  const handleNext = () => {
    if (!selectedDate) {
      alert('Por favor selecciona un día para tu cita');
      return;
    }
    router.push({
      pathname: '/(main)/cita-form',
      params: { fecha: selectedDate },
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
          {isGuest ? <Ionicons name="lock-closed" size={22} color="#57A145" /> : null}
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Selecciona un día en el calendario para agendar tu cita en el refugio.
        </Text>
        <Text style={styles.warningText}>Solo citas de recorrido</Text>
      </View>

      <View style={styles.calendarWrapper}>
        <View style={[styles.calendarContainer, isGuest && styles.calendarLocked]}>
          <Calendar
            onDayPress={(day: { dateString: string }) => {
              if (!isGuest) {
                setSelectedDate(day.dateString);
              }
            }}
            markedDates={{
              [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#1F6829' },
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
        {isGuest ? (
          <Pressable style={styles.lockOverlay} onPress={showLoginPrompt}>
            <Ionicons name="lock-closed" size={48} color="#1F6829" />
            <Text style={styles.lockOverlayText}>Inicia sesión para agendar citas</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable
        style={[styles.nextButton, (!selectedDate || isGuest) && styles.disabledButton]}
        onPress={() => gateAction(handleNext)}
      >
        {isGuest ? (
          <Ionicons name="lock-closed" size={22} color="#FFFFFF" />
        ) : (
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        )}
        <Text style={styles.nextButtonText}>{isGuest ? 'Inicia sesión' : 'Siguiente'}</Text>
      </Pressable>

      <GuestLoginPrompt visible={promptVisible} onCancel={hideLoginPrompt} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    position: 'relative',
    marginVertical: 20,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  calendarLocked: {
    opacity: 0.45,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 254, 245, 0.75)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
  },
  lockOverlayText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F6829',
    textAlign: 'center',
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
  },
});
