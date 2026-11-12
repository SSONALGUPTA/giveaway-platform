import React from 'react';
import WinnerCard from './WinnerCard';
import styles from './Winners.module.css';

export default function PreviousWinnersTab({ previousWinners = [] }) {
  if (!previousWinners || previousWinners.length === 0) {
    return (
      <div className={styles.emptyWinnersBox}>
        <h4>No Previous Winners Yet</h4>
        <p>Previous winners will appear here after our active giveaways conclude.</p>
      </div>
    );
  }

  return (
    <div className={styles.previousContainer}>
      <div className={styles.previousMeta}>
        <span className={styles.metaLabel}>Archived Giveaway:</span>
        <span className={styles.metaTitle}>August Reward Rush & Past Editions</span>
      </div>

      <div className={styles.winnersGrid}>
        {previousWinners.map((winner) => (
          <WinnerCard key={winner.id} winner={winner} />
        ))}
      </div>
    </div>
  );
}
