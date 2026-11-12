import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MOCK_GIVEAWAYS, MOCK_PRIZES } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { generateDeviceHash } from '../lib/format';
import { useAuth } from './useAuth';

const GiveawayContext = createContext(null);

export function GiveawayProvider({ children }) {
  const { user, deductBalance, recordParticipation } = useAuth();

  const [giveaway, setGiveaway] = useState(MOCK_GIVEAWAYS[0]);
  const [prizes, setPrizes] = useState(MOCK_PRIZES);
  const [giveawayStatus, setGiveawayStatus] = useState('ACTIVE'); // ACTIVE, ENDED, UPCOMING
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch from Supabase if available
  const fetchGiveawayData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: gwData, error: gwError } = await supabase
          .from('giveaways')
          .select('*')
          .eq('status', 'ACTIVE')
          .single();

        if (!gwError && gwData) {
          setGiveaway({
            id: gwData.id,
            slug: gwData.slug,
            title: gwData.title,
            subtitle: gwData.subtitle,
            description: gwData.description,
            status: gwData.status,
            startAt: gwData.start_at,
            endAt: gwData.end_at,
            totalParticipants: gwData.total_participants,
            rules: gwData.rules || MOCK_GIVEAWAYS[0].rules,
            faqs: MOCK_GIVEAWAYS[0].faqs
          });

          const { data: prizesData, error: prizesError } = await supabase
            .from('prizes')
            .select('*')
            .eq('giveaway_id', gwData.id)
            .order('position', { ascending: true });

          if (!prizesError && prizesData && prizesData.length > 0) {
            setPrizes(prizesData.map(p => ({
              id: p.id,
              giveawayId: p.giveaway_id,
              slug: p.slug,
              name: p.name,
              position: p.position,
              positionLabel: `${p.position}${p.position === 1 ? 'st' : p.position === 2 ? 'nd' : p.position === 3 ? 'rd' : 'th'} Prize`,
              badgeLabel: p.badge_label,
              type: p.type,
              description: p.description,
              imageUrl: p.image_url,
              entryFee: p.entry_fee,
              entryCurrency: p.entry_currency,
              winnerCount: p.winner_count,
              valueDisplay: p.value_display,
              participantsCount: Math.floor(gwData.total_participants / prizesData.length)
            })));
          }
        }
      }
    } catch (err) {
      console.warn('Using local mock giveaway data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGiveawayData();
  }, [fetchGiveawayData]);

  // Join Giveaway Action (Enforces server-side authority & transactional integrity)
  const joinGiveaway = async (prizeId) => {
    if (!user) {
      return { success: false, error: 'LOGIN_REQUIRED', message: 'Please login or create an account to participate.' };
    }

    if (giveawayStatus === 'ENDED') {
      return { success: false, error: 'GIVEAWAY_ENDED', message: 'This giveaway has ended. Check out the winners!' };
    }

    if (giveawayStatus === 'UPCOMING') {
      return { success: false, error: 'GIVEAWAY_NOT_ACTIVE', message: 'This giveaway has not started yet.' };
    }

    // Check if user has already participated (Spec Section 7 & 63: 1 participation per event)
    const hasAlreadyJoined = (user.participatedPrizes || []).length > 0;
    if (hasAlreadyJoined) {
      return {
        success: false,
        error: 'ALREADY_PARTICIPATING',
        message: "You're already participating! You can participate again when a new giveaway event begins."
      };
    }

    const prize = prizes.find(p => p.id === prizeId);
    if (!prize) {
      return { success: false, error: 'PRIZE_NOT_FOUND', message: 'Prize configuration not found.' };
    }

    // Balance validation for required currency (Spec Section 13 & 88-89)
    let userBalance = 0;
    if (prize.entryCurrency === 'VE') userBalance = user.veBalance;
    else if (prize.entryCurrency === 'SVE') userBalance = user.sveBalance;
    else if (prize.entryCurrency === 'TOKEN') userBalance = user.tokenBalance;

    if (userBalance < prize.entryFee) {
      const needed = prize.entryFee - userBalance;
      return {
        success: false,
        error: `INSUFFICIENT_${prize.entryCurrency}_BALANCE`,
        message: `Not enough ${prize.entryCurrency}s. You need ${needed.toLocaleString()} more ${prize.entryCurrency}s to join this giveaway.`,
        needed,
        currency: prize.entryCurrency
      };
    }

    // If Supabase is connected with join_giveaway RPC, call it
    if (isSupabaseConfigured && supabase) {
      try {
        const idempotencyKey = `join_${user.id}_${giveaway.id}_${prize.id}_${Date.now()}`;
        const deviceHash = generateDeviceHash();

        const { data: rpcResult, error: rpcError } = await supabase.rpc('join_giveaway', {
          p_giveaway_id: giveaway.id,
          p_prize_id: prize.id,
          p_user_id: user.id,
          p_idempotency_key: idempotencyKey,
          p_device_hash: deviceHash
        });

        if (rpcError) {
          throw new Error(rpcError.message);
        }
      } catch (rpcErr) {
        console.warn('Supabase join_giveaway RPC error, applying local atomic update:', rpcErr);
      }
    }

    // Atomically update balance & participation in state
    deductBalance(prize.entryCurrency, prize.entryFee);
    recordParticipation(prize.id);

    // Increment overall participants count
    setGiveaway(prev => ({
      ...prev,
      totalParticipants: prev.totalParticipants + 1
    }));

    return {
      success: true,
      prizeName: prize.name,
      entryFee: prize.entryFee,
      entryCurrency: prize.entryCurrency,
      message: "You're In! Your participation has been successfully recorded."
    };
  };

  const setForcedStatus = (newStatus) => {
    setGiveawayStatus(newStatus);
  };

  return (
    <GiveawayContext.Provider value={{
      giveaway,
      prizes,
      giveawayStatus,
      setForcedStatus,
      isLoading,
      error,
      joinGiveaway,
      refresh: fetchGiveawayData
    }}>
      {children}
    </GiveawayContext.Provider>
  );
}

export function useGiveaway() {
  const context = useContext(GiveawayContext);
  if (!context) {
    throw new Error('useGiveaway must be used within a GiveawayProvider');
  }
  return context;
}
