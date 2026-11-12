import React from 'react';
import styles from './StatusBadge.module.css';

export default function StatusBadge({ status = 'ACTIVE', label }) {
  const normStatus = status.toUpperCase();

  let badgeClass = styles.badgeActive;
  let defaultLabel = 'GIVEAWAY LIVE';
  let showPulse = true;

  if (normStatus === 'ENDED') {
    badgeClass = styles.badgeEnded;
    defaultLabel = 'GIVEAWAY ENDED';
    showPulse = false;
  } else if (normStatus === 'UPCOMING') {
    badgeClass = styles.badgeUpcoming;
    defaultLabel = 'UPCOMING EVENT';
    showPulse = false;
  } else if (normStatus === 'EXCLUSIVE') {
    badgeClass = styles.badgeExclusive;
    defaultLabel = 'EXCLUSIVE GIVEAWAY';
    showPulse = false;
  }

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {showPulse && <span className={styles.pulseDot} />}
      <span className={styles.label}>{label || defaultLabel}</span>
    </span>
  );
}
