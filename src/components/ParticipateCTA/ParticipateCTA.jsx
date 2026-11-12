import React from 'react';
import { ArrowRight, CheckCircle2, Lock, Bell, Trophy, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './ParticipateCTA.module.css';

export default function ParticipateCTA({
  giveawayStatus = 'ACTIVE',
  prizeId,
  isPrizeJoined = false,
  onJoinClick,
  onLoginClick,
  onViewWinnersClick,
  onNotifyClick,
  isLoading = false,
  customLabel,
  disabled = false,
  size = 'medium' // 'small', 'medium', 'large'
}) {
  const { isLoggedIn, user } = useAuth();

  // 1. Giveaway Ended State (Spec Section 17 & 33)
  if (giveawayStatus === 'ENDED') {
    return (
      <button
        type="button"
        className={`${styles.ctaButton} ${styles.ctaEnded} ${styles[size]}`}
        onClick={onViewWinnersClick}
      >
        <Trophy size={18} />
        <span>View Winners</span>
      </button>
    );
  }

  // 2. Upcoming Giveaway State
  if (giveawayStatus === 'UPCOMING') {
    return (
      <button
        type="button"
        className={`${styles.ctaButton} ${styles.ctaUpcoming} ${styles[size]}`}
        onClick={onNotifyClick}
      >
        <Bell size={18} />
        <span>Notify Me</span>
      </button>
    );
  }

  // 3. Visitor / Not Logged In State
  if (!isLoggedIn) {
    return (
      <button
        type="button"
        className={`${styles.ctaButton} ${styles.ctaLogin} ${styles[size]}`}
        onClick={onLoginClick}
      >
        <Lock size={16} />
        <span>Login to Participate</span>
      </button>
    );
  }

  // 4. Already Joined State (Spec Section 17, 56, 97)
  const hasUserJoined = isPrizeJoined || (user?.participatedPrizes || []).includes(prizeId);
  if (hasUserJoined) {
    return (
      <button
        type="button"
        className={`${styles.ctaButton} ${styles.ctaJoined} ${styles[size]}`}
        disabled
      >
        <CheckCircle2 size={18} />
        <span>You're Participating ✓</span>
      </button>
    );
  }

  // 5. Loading State
  if (isLoading) {
    return (
      <button
        type="button"
        className={`${styles.ctaButton} ${styles.ctaLoading} ${styles[size]}`}
        disabled
      >
        <Loader2 size={18} className={styles.spinner} />
        <span>Joining Giveaway...</span>
      </button>
    );
  }

  // 6. Logged In - Ready to Join
  return (
    <button
      type="button"
      className={`${styles.ctaButton} ${styles.ctaActive} ${styles[size]}`}
      onClick={onJoinClick}
      disabled={disabled}
    >
      <span>{customLabel || 'Join Giveaway'}</span>
      <ArrowRight size={18} />
    </button>
  );
}
