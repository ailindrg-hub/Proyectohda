import Constants from 'expo-constants';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabase-credentials';
import { EXPO_SUPABASE_ANON_KEY, EXPO_SUPABASE_URL } from '@/lib/supabase-public-env';

const PLACEHOLDER_MARKERS = ['tu-proyecto', 'tu_anon', 'REPLACE_ME', 'pega_aqui'];

function isPlaceholder(value: string): boolean {
  const lower = value.toLowerCase();
  return PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker.toLowerCase()));
}

function firstNonEmpty(...values: (string | undefined)[]): string {
  for (const v of values) {
    const trimmed = v?.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

type ExtraConfig = { supabaseUrl?: string; supabaseAnonKey?: string };

function readExtra(): ExtraConfig {
  const expoExtra = Constants.expoConfig?.extra as ExtraConfig | undefined;
  const manifestExtra = (Constants.manifest as { extra?: ExtraConfig } | null)?.extra;
  const manifest2Extra = (
    Constants as { manifest2?: { extra?: ExtraConfig } }
  ).manifest2?.extra;

  return {
    supabaseUrl: expoExtra?.supabaseUrl ?? manifestExtra?.supabaseUrl ?? manifest2Extra?.supabaseUrl,
    supabaseAnonKey:
      expoExtra?.supabaseAnonKey ??
      manifestExtra?.supabaseAnonKey ??
      manifest2Extra?.supabaseAnonKey,
  };
}

export function getSupabaseConfig(): { url: string; anonKey: string } {
  const extra = readExtra();

  const url = firstNonEmpty(
    SUPABASE_URL,
    EXPO_SUPABASE_URL,
    extra.supabaseUrl,
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  const anonKey = firstNonEmpty(
    SUPABASE_ANON_KEY,
    EXPO_SUPABASE_ANON_KEY,
    extra.supabaseAnonKey,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return false;
  if (isPlaceholder(url) || isPlaceholder(anonKey)) return false;
  const validUrl = url.startsWith('https://') && url.includes('supabase');
  const validKey =
    anonKey.startsWith('eyJ') ||
    anonKey.startsWith('sb_publishable_') ||
    anonKey.length > 20;
  return validUrl && validKey;
}

export const SUPABASE_SETUP_MESSAGE =
  'Faltan credenciales de Supabase. En MiApp/.env define EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY, ejecuta "node scripts/sync-supabase-env.js" y reinicia con: npx expo start -c';
