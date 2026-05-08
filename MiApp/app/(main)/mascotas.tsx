import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function MascotasScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Mascotas</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Explora perritos y gatitos en adopcion, con informacion clara y fotos destacadas.
        </Text>
      </View>
    </ScrollView>
  );
}
