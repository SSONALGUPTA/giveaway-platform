import React from 'react';
import { Clock, ShieldAlert, Sparkles, Trophy } from 'lucide-react';
import WinnerCard from './WinnerCard';
import styles from './Winners.module.css';

export default function WinnersTab({ giveawayStatus = 'ACTIVE', winners = [] }) {
  // If Current Giveaway is LIVE / ACTIVE (Spec Section 21)
  if (giveawayStatus === 'ACTIVE') {
    return (
      <div className={styles.liveAnnouncementCard}>
        <div className={styles.liveIconCircle}>
          <Clock size={32} className={styles.clockIcon} />
        </div>
        <div className={styles.liveBadgeRow}>
          <span className={styles.livePill}>Current Giveaway: LIVE</span>
        </div>
        <h3 className={styles.liveTitle}>Winners Not Yet Finalized</h3>
        <p className={styles.liveText}>
          This giveaway is currently active and receiving entries. In accordance with VELOOP fair-draw protocol, 
          winners will be automatically selected and verified once the live countdown reaches zero.
        </p>
        <div className={styles.auditDisclaimer}>
          <ShieldAlert size={16} />
          <span>No early or simulated winners are displayed during active participation.</span>
        </div>
      </div>
    );
  }

  // If Giveaway is ENDED and has finalized winners
  if (winners && winners.length > 0) {
    return (
      <div className={styles.winnersGrid}>
        {winners.map((winner) => (
          <WinnerCard key={winner.id} winner={winner} />
        ))}
      </div>
    );
  }

  // Fallback if ended but selection is processing
  return (
    <div className={styles.emptyWinnersBox}>
      <Trophy size={36} className={styles.trophyEmpty} />
      <h4>Selecting Winners...</h4>
      <p>Cryptographic draw in progress. Official winners will appear momentarily.</p>
    </div>
  );
}
