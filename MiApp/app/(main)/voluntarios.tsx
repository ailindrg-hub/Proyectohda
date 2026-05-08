import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function VoluntariosScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Ventas</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Descubre productos solidarios y compras que ayudan directamente a los rescates.
        </Text>
      </View>
    </ScrollView>
  );
}
