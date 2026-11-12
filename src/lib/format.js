/**
 * Formatting utilities for VELOOP Rewards Giveaway
 */

/**
 * Masks user ID for privacy compliance (Spec Section 19, 25)
 * Example: "VE10025" -> "VE****25"
 * Example: "user_8912" -> "VE****12"
 */
export function maskUserId(userId) {
  if (!userId) return 'VE****00';
  const cleanId = String(userId).trim();
  if (cleanId.startsWith('VE****')) return cleanId;

  const prefix = cleanId.startsWith('VE') ? 'VE' : 'VE';
  const suffix = cleanId.slice(-2);
  return `${prefix}****${suffix}`;
}

/**
 * Formats time difference into { days, hours, minutes, seconds, isEnded }
 * Automatically switches to ended state when countdown reaches 0 (Spec Section 10)
 */
export function calculateTimeRemaining(targetDate) {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }

  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isEnded: false,
    formatted: `${days}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`
  };
}

/**
 * Currency display formatter
 */
export function formatCurrency(amount, currency = 'VE') {
  const formattedNumber = Number(amount || 0).toLocaleString('en-IN');
  switch (currency.toUpperCase()) {
    case 'VE':
      return `${formattedNumber} VEs`;
    case 'SVE':
      return `${formattedNumber} SVEs`;
    case 'TOKEN':
      return `${formattedNumber} Tokens`;
    default:
      return `${formattedNumber} ${currency}`;
  }
}

/**
 * Formats date into standard readable format e.g. "05 Aug 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Simple client-side pseudo-hash for device / abuse prevention (Spec Section 22)
 */
export function generateDeviceHash() {
  const nav = window.navigator;
  const screen = window.screen;
  const rawString = [
    nav.userAgent,
    screen.height,
    screen.width,
    screen.colorDepth,
    nav.language,
    new Date().getTimezoneOffset()
  ].join('###');

  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'dev_' + Math.abs(hash).toString(16);
}
