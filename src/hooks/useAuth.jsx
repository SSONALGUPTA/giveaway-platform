import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../lib/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default to ELIGIBLE_USER for immediate interactive exploration
  const [currentUserKey, setCurrentUserKey] = useState('ELIGIBLE_USER');
  const [user, setUser] = useState(() => DEMO_USERS.ELIGIBLE_USER);

  // Sync state when switching persona
  const switchUserPersona = (personaKey) => {
    setCurrentUserKey(personaKey);
    const selected = DEMO_USERS[personaKey] ? { ...DEMO_USERS[personaKey] } : null;
    setUser(selected);
  };

  const loginAs = (personaKey = 'ELIGIBLE_USER') => {
    switchUserPersona(personaKey);
  };

  const logout = () => {
    setCurrentUserKey('VISITOR');
    setUser(null);
  };

  // Deduct user balance safely in state
  const deductBalance = (currency, amount) => {
    if (!user) return false;
    const curr = currency.toUpperCase();
    setUser(prev => {
      if (!prev) return null;
      if (curr === 'VE') {
        return { ...prev, veBalance: Math.max(0, prev.veBalance - amount) };
      }
      if (curr === 'SVE') {
        return { ...prev, sveBalance: Math.max(0, prev.sveBalance - amount) };
      }
      if (curr === 'TOKEN') {
        return { ...prev, tokenBalance: Math.max(0, prev.tokenBalance - amount) };
      }
      return prev;
    });
    return true;
  };

  const recordParticipation = (prizeId) => {
    setUser(prev => {
      if (!prev) return null;
      const existing = prev.participatedPrizes || [];
      return {
        ...prev,
        participatedPrizes: [...existing, prizeId],
        entriesCount: (prev.entriesCount || 0) + 1
      };
    });
  };

  const updateClaimStatus = (newStatus) => {
    setUser(prev => {
      if (!prev || !prev.wonPrize) return prev;
      return {
        ...prev,
        wonPrize: {
          ...prev.wonPrize,
          status: newStatus
        }
      };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentUserKey,
      switchUserPersona,
      loginAs,
      logout,
      deductBalance,
      recordParticipation,
      updateClaimStatus,
      isLoggedIn: Boolean(user)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
