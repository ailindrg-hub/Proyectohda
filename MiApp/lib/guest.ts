/** Usuario que entró con "Continuar como invitado". */
export function isGuestSession(email: string | undefined | null): boolean {
  return (email ?? '').trim() === 'Invitado';
}
