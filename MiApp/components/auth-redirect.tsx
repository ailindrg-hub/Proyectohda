import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/use-auth';

function isLoginPathname(pathname: string) {
  return (
    pathname === '/' ||
    pathname === '/(tabs)' ||
    pathname === '/(tabs)/' ||
    pathname === '/(tabs)/index' ||
    pathname.endsWith('/index')
  );
}

function isExplorePathname(pathname: string) {
  return pathname.includes('/explore');
}

/**
 * Redirige según sesión: con sesión no se queda en login (index);
 * sin sesión no puede ver explore.
 */
export function AuthRedirect() {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (session) {
      if (isLoginPathname(pathname)) {
        router.replace('/(tabs)/explore');
      }
    } else if (isExplorePathname(pathname)) {
      // Ruta del login en rutas tipadas de Expo Router
      router.replace('/(tabs)');
    }
  }, [session, loading, pathname, router]);

  return null;
}
