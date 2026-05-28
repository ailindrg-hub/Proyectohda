import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig, isSupabaseConfigured, SUPABASE_SETUP_MESSAGE } from '@/lib/env';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error(SUPABASE_SETUP_MESSAGE);
  }

  client = createClient(url, anonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  return client;
}

export const supabase = getSupabase();
export { isSupabaseConfigured, SUPABASE_SETUP_MESSAGE } from '@/lib/env';
