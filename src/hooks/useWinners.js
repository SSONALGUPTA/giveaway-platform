import { useState, useEffect } from 'react';
import { MOCK_PREVIOUS_WINNERS, MOCK_WINNER_SLIDER_ITEMS } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Hook for managing winner slider messages, active winners status, and past winners archive
 */
export function useWinners(currentGiveawayStatus = 'ACTIVE') {
  const [sliderMessages, setSliderMessages] = useState(MOCK_WINNER_SLIDER_ITEMS);
  const [previousWinners, setPreviousWinners] = useState(MOCK_PREVIOUS_WINNERS);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadWinners() {
      if (isSupabaseConfigured && supabase) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('giveaway_winners')
            .select(`
              id,
              masked_display,
              selected_at,
              status,
              prizes (name),
              giveaways (title)
            `);

          if (!error && data && data.length > 0) {
            const formatted = data.map(item => ({
              id: item.id,
              maskedDisplay: item.masked_display,
              prizeName: item.prizes?.name || 'Grand Prize',
              giveawayName: item.giveaways?.title || 'VELOOP Rewards',
              date: new Date(item.selected_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              status: item.status
            }));
            setPreviousWinners(formatted);
          }
        } catch (err) {
          console.warn('Could not load winners from Supabase, using mock data:', err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadWinners();
  }, []);

  return {
    sliderMessages,
    previousWinners,
    currentWinners,
    isLoading,
    isCurrentActive: currentGiveawayStatus === 'ACTIVE'
  };
}
