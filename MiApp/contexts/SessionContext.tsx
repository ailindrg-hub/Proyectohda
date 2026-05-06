import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type SessionContextValue = {
  email: string;
  setEmail: (value: string) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');
  const setEmail = useCallback((value: string) => {
    setEmailState(value);
  }, []);
  const clearSession = useCallback(() => setEmailState(''), []);

  const value = useMemo(
    () => ({ email, setEmail, clearSession }),
    [email, setEmail, clearSession]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return ctx;
}
