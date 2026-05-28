/** Mínimo de caracteres en la parte local (antes del @): más de 8 → al menos 9. */
const MIN_LOCAL_PART_LENGTH = 9;

const DOMAIN_RE =
  /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

const LOCAL_PART_RE = /^[A-Za-z0-9._%+-]+$/;

/**
 * Devuelve un mensaje de error en español o null si el correo es válido.
 */
export function getEmailValidationError(email: string): string | null {
  if (!email?.trim()) {
    return 'Ingresa tu correo electrónico';
  }

  const e = email.trim().toLowerCase();

  if (!e.includes('@')) {
    return 'El correo debe incluir @ y un dominio (ej: usuario@dominio.com)';
  }

  const atIndex = e.lastIndexOf('@');
  if (atIndex <= 0 || atIndex !== e.indexOf('@')) {
    return 'El correo solo puede tener un @';
  }

  const local = e.slice(0, atIndex);
  const domain = e.slice(atIndex + 1);

  if (local.length < MIN_LOCAL_PART_LENGTH) {
    return 'La parte antes del @ debe tener más de 8 caracteres';
  }

  if (!LOCAL_PART_RE.test(local)) {
    return 'El correo contiene caracteres no permitidos';
  }

  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) {
    return 'El correo no puede empezar, terminar ni repetir puntos antes del @';
  }

  if (!domain) {
    return 'Ingresa un dominio después del @ (ej: gmail.com)';
  }

  if (!domain.includes('.')) {
    return 'El dominio debe incluir un punto (ej: @gmail.com)';
  }

  if (domain.length < 4) {
    return 'El dominio del correo es demasiado corto';
  }

  if (!DOMAIN_RE.test(domain)) {
    return 'Ingresa un dominio válido (ej: gmail.com, outlook.com, empresa.mx)';
  }

  const labels = domain.split('.');
  const tld = labels[labels.length - 1] ?? '';
  if (tld.length < 2) {
    return 'El dominio debe terminar con una extensión válida (ej: .com, .mx)';
  }

  const domainName = labels[0] ?? '';
  if (domainName.length < 2) {
    return 'El nombre del dominio es demasiado corto';
  }

  return null;
}

export function isValidEmail(email: string): boolean {
  return getEmailValidationError(email) === null;
}

export function looksLikeEmail(input: string): boolean {
  return typeof input === 'string' && input.includes('@');
}

export function isPhoneNumber(input: string): boolean {
  if (!input) return false;
  const digits = input.replace(/\D/g, '');
  return /^\d{10}$/.test(digits);
}
