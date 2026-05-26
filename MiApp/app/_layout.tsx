import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import 'react-native-reanimated';

import SplashScreen from '@/components/SplashScreen';
import { SessionProvider } from '@/contexts/SessionContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const onSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <SessionProvider>
        {showSplash && <SplashScreen onAnimationFinish={onSplashFinish} />}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="create-password" options={{ headerShown: false }} />
          <Stack.Screen name="confirm-identity" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </SessionProvider>
    </ThemeProvider>
  );
}
