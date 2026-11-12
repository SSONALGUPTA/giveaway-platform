import React from 'react';
import { Trophy, Calendar, CheckCircle2, Shield } from 'lucide-react';
import styles from './Winners.module.css';

export default function WinnerCard({ winner }) {
  return (
    <div className={styles.winnerCard}>
      <div className={styles.cardTop}>
        <div className={styles.userBadge}>
          <div className={styles.avatarCircle}>
            <Trophy size={16} className={styles.trophyIcon} />
          </div>
          <div>
            <span className={styles.maskedId}>{winner.maskedDisplay || 'VE****82'}</span>
            <span className={styles.verifiedTag}>
              <CheckCircle2 size={12} /> Verified Winner
            </span>
          </div>
        </div>
        <span className={styles.statusPill}>{winner.status || 'Delivered ✓'}</span>
      </div>

      <div className={styles.cardMiddle}>
        <span className={styles.wonLabel}>Won Prize:</span>
        <h4 className={styles.prizeTitle}>{winner.prizeName}</h4>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.metaItem}>
          <span className={styles.eventLabel}>Giveaway:</span>
          <span className={styles.eventValue}>{winner.giveawayName}</span>
        </div>
        <div className={styles.metaItem}>
          <Calendar size={13} className={styles.calIcon} />
          <span className={styles.dateValue}>{winner.date}</span>
        </div>
      </div>
    </div>
  );
}
