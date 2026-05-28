import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getSupabase } from '@/lib/supabase';
import { clearPersistedAuth } from '@/lib/logout';
import { fetchProfile } from '@/lib/profile';

type PendingRegistration = {
  contact: string;
  password: string;
  nombre: string;
  apellido: string;
};

type SessionContextValue = {
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  pendingRegistration: PendingRegistration | null;
  verificationCode: string;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setProfileImage: (value: string) => void;
  setPendingRegistration: (value: PendingRegistration | null) => void;
  setVerificationCode: (value: string) => void;
  clearSession: () => void;
  clearRegistrationFlow: () => void;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');
  const [name, setNameState] = useState('');
  const [phone, setPhoneState] = useState('');
  const [profileImage, setProfileImageState] = useState('');
  const [pendingRegistration, setPendingRegistrationState] = useState<PendingRegistration | null>(null);
  const [verificationCode, setVerificationCodeState] = useState('');

  useEffect(() => {
    let active = true;

    async function loadCurrentUser() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.getUser();

        if (error || !active || !data?.user) {
          return;
        }

        setEmailState(data.user.email ?? '');
        const profile = await fetchProfile(data.user.id);
        if (profile) {
          const fullName = [profile.nombre, profile.apellido].filter(Boolean).join(' ').trim();
          if (fullName) {
            setNameState(fullName);
          }
          setPhoneState(profile.phone ?? '');
          if (profile.avatar_url) {
            setProfileImageState(profile.avatar_url);
          }
        } else {
          const metadata = data.user.user_metadata as { nombre?: string; apellido?: string; phone?: string; profileImage?: string } | null;
          const fullName = [metadata?.nombre, metadata?.apellido].filter(Boolean).join(' ').trim();
          if (fullName) {
            setNameState(fullName);
          }
          if (metadata?.phone) {
            setPhoneState(metadata.phone);
          }
          if (metadata?.profileImage) {
            setProfileImageState(metadata.profileImage);
          }
        }
      } catch {
        // Silent failure, user state remains empty.
      }
    }

    loadCurrentUser();

    const supabase = getSupabase();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === 'SIGNED_OUT' || !session) {
        setEmailState('');
        setNameState('');
        setPhoneState('');
        setProfileImageState('');
        setPendingRegistrationState(null);
        setVerificationCodeState('');
        return;
      }

      loadCurrentUser();
    });

    return () => {
      active = false;
      try {
        subscription?.unsubscribe?.();
      } catch {
        // ignore
      }
    };
  }, []);
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
  const setPendingRegistration = useCallback((value: PendingRegistration | null) => {
    setPendingRegistrationState(value);
  }, []);
  const setVerificationCode = useCallback((value: string) => {
    setVerificationCodeState(value);
  }, []);
  const clearSession = useCallback(() => {
    setEmailState('');
    setNameState('');
    setPhoneState('');
    setProfileImageState('');
  }, []);
  const clearRegistrationFlow = useCallback(() => {
    setPendingRegistrationState(null);
    setVerificationCodeState('');
  }, []);
  const signOut = useCallback(async () => {
    try {
      await clearPersistedAuth();
    } catch {
      // Asegurar limpieza local aunque falle Supabase.
    }
    clearSession();
    clearRegistrationFlow();
  }, [clearRegistrationFlow, clearSession]);

  const value = useMemo(
    () => ({
      email,
      name,
      phone,
      profileImage,
      pendingRegistration,
      verificationCode,
      setEmail,
      setName,
      setPhone,
      setProfileImage,
      setPendingRegistration,
      setVerificationCode,
      clearSession,
      clearRegistrationFlow,
      signOut,
    }),
    [
      email,
      name,
      phone,
      profileImage,
      pendingRegistration,
      verificationCode,
      setEmail,
      setName,
      setPhone,
      setProfileImage,
      setPendingRegistration,
      setVerificationCode,
      clearSession,
      clearRegistrationFlow,
      signOut,
    ]
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
