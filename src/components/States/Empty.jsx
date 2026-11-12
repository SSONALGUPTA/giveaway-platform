import React from 'react';
import { Gift, Trophy, Ticket, Compass } from 'lucide-react';
import styles from './States.module.css';

export default function Empty({
  type = 'giveaway', // 'giveaway', 'winners', 'participation'
  title,
  description,
  actionLabel,
  onAction
}) {
  let IconComp = Gift;
  let defTitle = 'No Current Giveaway';
  let defDesc = 'The next giveaway is currently being prepared. Check back shortly!';

  if (type === 'winners') {
    IconComp = Trophy;
    defTitle = 'No Previous Winners';
    defDesc = 'Previous winners will appear here after our active giveaways are completed.';
  } else if (type === 'participation') {
    IconComp = Ticket;
    defTitle = 'No Active Participation';
    defDesc = 'Join the active giveaway to start collecting entries and win premium tech.';
  }

  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIconCircle}>
        <IconComp size={32} className={styles.emptyIcon} />
      </div>
      <h3 className={styles.emptyTitle}>{title || defTitle}</h3>
      <p className={styles.emptyDesc}>{description || defDesc}</p>
      {actionLabel && (
        <button type="button" className={styles.emptyActionBtn} onClick={onAction}>
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
