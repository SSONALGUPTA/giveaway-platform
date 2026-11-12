import { describe, it, expect } from 'vitest';
import { MOCK_PRIZES } from '../lib/mockData';

describe('Giveaway Business Logic & Configuration (Spec Compliance)', () => {
  it('enforces exact joining requirements per Spec Section 85', () => {
    const iphone = MOCK_PRIZES.find(p => p.slug === 'iphone-15-pro');
    expect(iphone).toBeDefined();
    expect(iphone.entryFee).toBe(250);
    expect(iphone.entryCurrency).toBe('VE');
    expect(iphone.winnerCount).toBe(1); // One iPhone winner (Spec Section 20)

    const watch = MOCK_PRIZES.find(p => p.slug === 'apple-watch');
    expect(watch.entryFee).toBe(200);
    expect(watch.entryCurrency).toBe('VE');
    expect(watch.winnerCount).toBe(3);

    const airpods = MOCK_PRIZES.find(p => p.slug === 'airpods');
    expect(airpods.entryFee).toBe(500);
    expect(airpods.entryCurrency).toBe('SVE'); // AirPods requires SVEs

    const voucher20 = MOCK_PRIZES.find(p => p.slug === 'amazon-20');
    expect(voucher20.entryFee).toBe(2000);
    expect(voucher20.entryCurrency).toBe('TOKEN'); // ₹20 voucher requires 2000 Tokens
  });

  it('differentiates physical prizes from digital gift vouchers per Spec Section 38', () => {
    const physicalPrizes = MOCK_PRIZES.filter(p => p.type === 'PHYSICAL');
    expect(physicalPrizes.length).toBeGreaterThan(0);
    physicalPrizes.forEach(p => {
      expect(['iphone-15-pro', 'apple-watch', 'airpods']).toContain(p.slug);
    });

    const giftCards = MOCK_PRIZES.filter(p => p.type === 'GIFT_CARD');
    expect(giftCards.length).toBeGreaterThan(0);
  });
});
