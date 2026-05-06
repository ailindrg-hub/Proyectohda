import { ScrollView } from 'react-native';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function InfoScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    />
  );
}
