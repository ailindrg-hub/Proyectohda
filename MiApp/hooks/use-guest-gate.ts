import { useCallback, useState } from 'react';

import { useSession } from '@/contexts/SessionContext';
import { isGuestSession } from '@/lib/guest';

export function useGuestGate() {
  const { email } = useSession();
  const isGuest = isGuestSession(email);
  const [promptVisible, setPromptVisible] = useState(false);

  const showLoginPrompt = useCallback(() => setPromptVisible(true), []);
  const hideLoginPrompt = useCallback(() => setPromptVisible(false), []);

  const gateAction = useCallback(
    (onAllowed: () => void) => {
      if (isGuest) {
        showLoginPrompt();
        return;
      }
      onAllowed();
    },
    [isGuest, showLoginPrompt]
  );

  return {
    isGuest,
    promptVisible,
    showLoginPrompt,
    hideLoginPrompt,
    gateAction,
  };
}
