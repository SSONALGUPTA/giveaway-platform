import { describe, it, expect } from 'vitest';
import { maskUserId, formatCurrency, calculateTimeRemaining } from '../lib/format';

describe('Format Utilities (Spec Compliance)', () => {
  it('masks user ID correctly according to Spec Section 19 & 25', () => {
    expect(maskUserId('VE10025')).toBe('VE****25');
    expect(maskUserId('VE10082')).toBe('VE****82');
    expect(maskUserId('VE****42')).toBe('VE****42');
  });

  it('formats currencies correctly for VEs, SVEs, and Tokens', () => {
    expect(formatCurrency(250, 'VE')).toBe('250 VEs');
    expect(formatCurrency(500, 'SVE')).toBe('500 SVEs');
    expect(formatCurrency(2000, 'TOKEN')).toBe('2,000 Tokens');
  });

  it('calculates countdown time remaining and flags ended state', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString();
    const result = calculateTimeRemaining(futureDate);
    expect(result.isEnded).toBe(false);
    expect(result.days).toBeGreaterThanOrEqual(4);

    const pastDate = new Date(Date.now() - 1000).toISOString();
    const endedResult = calculateTimeRemaining(pastDate);
    expect(endedResult.isEnded).toBe(true);
  });
});
