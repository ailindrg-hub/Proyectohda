export function formatAuthError(message: string): string {
  const m = message.toLowerCase();

  if (m.includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos';
  }
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'Este correo ya está registrado. Prueba iniciar sesión.';
  }
  if (m.includes('email not confirmed')) {
    return 'Confirma tu correo antes de iniciar sesión (revisa tu bandeja de entrada).';
  }
  if (m.includes('email_address_invalid') || m.includes('invalid email')) {
    return 'Correo no válido. Usa un correo real (por ejemplo @gmail.com, @outlook.com).';
  }
  if (m.includes('password') && (m.includes('weak') || m.includes('short'))) {
    return 'La contraseña no cumple los requisitos de seguridad de Supabase.';
  }
  if (m.includes('invalid api key') || m.includes('invalid jwt')) {
    return 'Clave de Supabase incorrecta. Revisa EXPO_PUBLIC_SUPABASE_ANON_KEY en MiApp/.env y reinicia Expo.';
  }
  if (m.includes('database error saving new user')) {
    return 'Error en la base de datos al crear el usuario. Ejecuta el script supabase/schema_auth_profiles.sql en el SQL Editor de Supabase.';
  }
  if (m.includes('signup is disabled')) {
    return 'El registro está desactivado en Supabase. Actívalo en Authentication → Providers → Email.';
  }
  if (m.includes('rate limit')) {
    return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  }

  return message;
}
