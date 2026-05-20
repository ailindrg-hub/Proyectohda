import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type SessionContextValue = {
  email: string;
  name: string;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');
  const [name, setNameState] = useState('');
  const setEmail = useCallback((value: string) => {
    setEmailState(value);
  }, []);
  const setName = useCallback((value: string) => {
    setNameState(value);
  }, []);
  const clearSession = useCallback(() => {
    setEmailState('');
    setNameState('');
  }, []);

  const value = useMemo(
    () => ({ email, name, setEmail, setName, clearSession }),
    [email, name, setEmail, setName, clearSession]
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
