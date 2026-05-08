import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function InfoScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Citas</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Agenda citas y mantente en contacto para seguimiento de adopciones y atenciones.
        </Text>
      </View>
    </ScrollView>
  );
}
