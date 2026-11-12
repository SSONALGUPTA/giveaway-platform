import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import styles from './Countdown.module.css';

export default function Countdown({ targetDate, onEnd, label = 'Ends In' }) {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(targetDate, onEnd);

  if (isEnded) {
    return (
      <div className={styles.endedWrapper}>
        <span className={styles.endedDot} />
        <span className={styles.endedText}>Giveaway Ended</span>
      </div>
    );
  }

  const units = [
    { value: days, label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(minutes).padStart(2, '0'), label: 'Mins' },
    { value: String(seconds).padStart(2, '0'), label: 'Secs' }
  ];

  return (
    <div className={styles.container}>
      {label && <div className={styles.headerLabel}>{label}</div>}
      <div className={styles.timerGrid}>
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className={styles.timeBlock}>
              <span className={styles.digit}>{unit.value}</span>
              <span className={styles.unitLabel}>{unit.label}</span>
            </div>
            {idx < units.length - 1 && <span className={styles.separator}>:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
