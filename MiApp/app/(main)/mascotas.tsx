import { ScrollView } from 'react-native';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function MascotasScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    />
  );
}
