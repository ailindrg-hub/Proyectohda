import type { AuthError, Session } from '@supabase/supabase-js';

import { getSupabase } from '@/lib/supabase';

export type VerifyEmailResult =
  | { ok: true; session: Session }
  | { ok: false; error: string };

/**
 * Verifica el código enviado al correo tras el registro.
 * Prueba tipo "signup" y, si falla, tipo "email" (plantillas OTP de Supabase).
 */
export async function verifyEmailOtp(email: string, token: string): Promise<VerifyEmailResult> {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedToken = token.trim();

  if (!trimmedEmail || !trimmedToken) {
    return { ok: false, error: 'Ingresa el código que recibiste por correo.' };
  }

  const supabase = getSupabase();
  const types: Array<'signup' | 'email'> = ['signup', 'email'];

  let lastError: AuthError | null = null;

  for (const type of types) {
    const { data, error } = await supabase.auth.verifyOtp({
      email: trimmedEmail,
      token: trimmedToken,
      type,
    });

    if (!error && data.session) {
      return { ok: true, session: data.session };
    }

    lastError = error;
  }

  return {
    ok: false,
    error: lastError?.message ?? 'No se pudo verificar el código.',
  };
}

/** Reenvía el correo de confirmación / código de registro. */
export async function resendSignupVerification(email: string): Promise<{ error: string | null }> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { error: 'No hay un correo para reenviar el código.' };
  }

  const supabase = getSupabase();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: trimmedEmail,
  });

  return { error: error?.message ?? null };
}

export function isEmailNotConfirmedError(message: string): boolean {
  const m = message.toLowerCase();
  return m.includes('email not confirmed') || m.includes('email_not_confirmed');
}
