import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type SessionContextValue = {
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setProfileImage: (value: string) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');
  const [name, setNameState] = useState('');
  const [phone, setPhoneState] = useState('');
  const [profileImage, setProfileImageState] = useState('');
  const setEmail = useCallback((value: string) => {
    setEmailState(value);
  }, []);
  const setName = useCallback((value: string) => {
    setNameState(value);
  }, []);
  const setPhone = useCallback((value: string) => {
    setPhoneState(value);
  }, []);
  const setProfileImage = useCallback((value: string) => {
    setProfileImageState(value);
  }, []);
  const clearSession = useCallback(() => {
    setEmailState('');
    setNameState('');
    setPhoneState('');
    setProfileImageState('');
  }, []);

  const value = useMemo(
    () => ({ email, name, phone, profileImage, setEmail, setName, setPhone, setProfileImage, clearSession }),
    [email, name, phone, profileImage, setEmail, setName, setPhone, setProfileImage, clearSession]
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
