import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFEF5' }}>
      <RefugioScreenShell>
        <ScrollView
          style={refugioScreenStyles.scroll}
          contentContainerStyle={refugioScreenStyles.content}
          showsVerticalScrollIndicator={false}
        />
      </RefugioScreenShell>
    </SafeAreaView>
  );
}
