/**
 * Referencias directas a process.env para que Metro las inlined en el bundle.
 * No importar .env aquí; Expo las carga al hacer `expo start`.
 */
export const EXPO_SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const EXPO_SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
