import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function DonarScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Eventos</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Revisa los proximos eventos del refugio y participa en actividades para apoyar.
        </Text>
      </View>
    </ScrollView>
  );
}
