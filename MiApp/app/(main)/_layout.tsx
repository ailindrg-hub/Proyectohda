import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import MainHeader from '@/components/MainHeader';
import { useSession } from '@/contexts/SessionContext';
import { getSupabase } from '@/lib/supabase';
import { redirectToLogin } from '@/lib/logout';

export default function MainLayout() {
  const router = useRouter();
  const { email } = useSession();

  useEffect(() => {
    let cancelled = false;

    async function ensureAuthenticated() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        const isGuest = (email ?? '').trim() === 'Invitado';
        if (!cancelled && !session && !isGuest) {
          redirectToLogin(router);
        }
      } catch {
        if (!cancelled) {
          redirectToLogin(router);
        }
      }
    }

    ensureAuthenticated();
    return () => {
      cancelled = true;
    };
  }, [email, router]);

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
