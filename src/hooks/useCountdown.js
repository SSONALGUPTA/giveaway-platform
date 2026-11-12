import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../lib/format';

/**
 * High accuracy countdown hook with auto-transition on zero (Spec Section 10 & 46)
 */
export function useCountdown(targetDate, onEnd) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(targetDate));

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeLeft(remaining);

      if (remaining.isEnded) {
        clearInterval(timer);
        if (typeof onEnd === 'function') {
          onEnd();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onEnd]);

  return timeLeft;
}
