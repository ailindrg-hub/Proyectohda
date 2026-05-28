import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

const events = [
  {
    id: '1',
    title: 'Jornada de adopción',
    date: 'Sábado 25 de mayo',
    location: 'Plaza del Parque',
    description: 'Trae a tu familia y conoce a los animales que buscan un hogar en el refugio.',
  },
  {
    id: '2',
    title: 'Taller de cuidado animal',
    date: 'Miércoles 29 de mayo',
    location: 'Centro Comunitario',
    description: 'Aprende consejos de alimentación y salud para mascotas junto a nuestros voluntarios.',
  },
  {
    id: '3',
    title: 'Encuentro de voluntarios',
    date: 'Domingo 2 de junio',
    location: 'Refugio Amigos',
    description: 'Únete a una jornada de limpieza y juegos con animales, ideal para quienes quieren ayudar.',
  },
];

export default function DonarScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={[refugioScreenStyles.content, styles.scrollContent]}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Eventos</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Revisa los próximos eventos del refugio y participa en actividades para apoyar.
        </Text>
      </View>

      <View style={styles.eventList}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <Ionicons name="calendar" size={20} color="#57A145" />
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
            <Text style={styles.eventMeta}>{event.date} · {event.location}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  eventList: {
    marginTop: 8,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F6829',
    marginLeft: 10,
  },
  eventMeta: {
    color: '#5A6F53',
    fontSize: 14,
    marginBottom: 10,
  },
  eventDescription: {
    color: '#3E5D39',
    fontSize: 14,
    lineHeight: 20,
  },
});
