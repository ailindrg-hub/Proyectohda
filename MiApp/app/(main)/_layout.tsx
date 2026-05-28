import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import MainHeader from '@/components/MainHeader';

export default function MainLayout() {
  return (
    <RefugioScreenShell>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <MainHeader />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="cita-form" />
          <Stack.Screen name="adopcion-form" />
        </Stack>
      </SafeAreaView>
    </RefugioScreenShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
