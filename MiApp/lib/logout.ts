import AsyncStorage from '@react-native-async-storage/async-storage';
import { router as expoRouter, type Href, type Router } from 'expo-router';

import { getSupabase } from '@/lib/supabase';

/** Ruta única de la pantalla de inicio de sesión (sin conflicto con (main)/(tabs)/index). */
export const LOGIN_ROUTE = '/login' as Href;

/**
 * Cierra la sesión en Supabase y elimina tokens persistidos en AsyncStorage.
 */
export async function clearPersistedAuth(): Promise<void> {
  const supabase = getSupabase();

  try {
    await supabase.auth.signOut({ scope: 'global' });
  } catch {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // Si falla el cierre remoto, se limpia el almacenamiento local abajo.
    }
  }

  try {
    const keys = await AsyncStorage.getAllKeys();
    const authKeys = keys.filter(
      (key) =>
        key.includes('auth-token') ||
        (key.startsWith('sb-') && key.toLowerCase().includes('auth'))
    );
    if (authKeys.length > 0) {
      await AsyncStorage.multiRemove(authKeys);
    }
  } catch {
    // Sin bloquear la redirección al login.
  }
}

/**
 * Reemplaza la pantalla actual por el inicio de sesión (sale del área autenticada).
 */
export function redirectToLogin(router?: Pick<Router, 'replace'>): void {
  const nav = router ?? expoRouter;
  nav.replace(LOGIN_ROUTE);
}
