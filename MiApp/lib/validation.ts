export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const e = email.trim();
  // Básica: debe contener un arroba y un dominio con punto y TLD (2+ letras)
  const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return re.test(e);
}

export function looksLikeEmail(input: string): boolean {
  return typeof input === 'string' && input.includes('@');
}

export function isPhoneNumber(input: string): boolean {
  if (!input) return false;
  // Allow spaces, dashes, parentheses; validate that digits count is 10
  const digits = input.replace(/\D/g, '');
  return /^\d{10}$/.test(digits);
}
