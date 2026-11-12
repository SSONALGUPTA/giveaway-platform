import React from 'react';
import { Ticket, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './EntryDisplay.module.css';

export default function EntryDisplay({ onEarnMore, onLoginClick }) {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className={styles.guestCard}>
        <div className={styles.iconCircle}>
          <Ticket size={20} className={styles.ticketIcon} />
        </div>
        <div className={styles.textGroup}>
          <h4 className={styles.title}>Track Your Entries</h4>
          <p className={styles.subtitle}>Sign in to view your recorded giveaway entries and eligibility status.</p>
        </div>
        <button type="button" className={styles.loginBtn} onClick={onLoginClick}>
          Login to Participate
        </button>
      </div>
    );
  }

  const entriesCount = user?.entriesCount || (user?.participatedPrizes?.length ? 24 : 0);
  const isParticipating = (user?.participatedPrizes || []).length > 0;

  return (
    <div className={styles.entryCard}>
      <div className={styles.leftCol}>
        <div className={styles.iconCircle}>
          {isParticipating ? (
            <UserCheck size={22} className={styles.activeIcon} />
          ) : (
            <Ticket size={22} className={styles.ticketIcon} />
          )}
        </div>
        <div>
          <div className={styles.statusRow}>
            <span className={styles.label}>Your Participation</span>
            {isParticipating && (
              <span className={styles.participatingBadge}>
                You're Participating ✓
              </span>
            )}
          </div>
          <div className={styles.entriesValue}>
            <span className={styles.count}>{entriesCount}</span>
            <span className={styles.unit}>{entriesCount === 1 ? 'Entry' : 'Entries'}</span>
          </div>
        </div>
      </div>

      <div className={styles.rightCol}>
        <button type="button" className={styles.earnMoreBtn} onClick={onEarnMore}>
          <span>Earn More Entries</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
