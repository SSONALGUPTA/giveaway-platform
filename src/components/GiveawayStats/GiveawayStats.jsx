import React, { useState, useEffect } from 'react';
import { Gift, Users, Trophy, Clock } from 'lucide-react';
import { calculateTimeRemaining } from '../../lib/format';
import styles from './GiveawayStats.module.css';

export default function GiveawayStats({ giveaway }) {
  const [timeLeft, setTimeLeft] = useState('12d : 08h : 45m');

  useEffect(() => {
    if (!giveaway?.endAt) return;
    const updateCountdown = () => {
      const res = calculateTimeRemaining(giveaway.endAt);
      if (res.isEnded) {
        setTimeLeft('Ended');
      } else {
        const d = String(res.days).padStart(2, '0');
        const h = String(res.hours).padStart(2, '0');
        const m = String(res.minutes).padStart(2, '0');
        setTimeLeft(`${d}d : ${h}h : ${m}m`);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [giveaway?.endAt]);

  const totalGiveaways = giveaway?.totalGiveawaysCount || 24;
  const totalParticipants = giveaway?.totalParticipants 
    ? `${(giveaway.totalParticipants / 1000).toFixed(1)}K+` 
    : '8.5K+';
  const prizesWon = giveaway?.prizesWon 
    ? `${(giveaway.prizesWon / 1000).toFixed(1)}K+` 
    : '1.2K+';

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        {/* Stat 1: Total Giveaways */}
        <div className={styles.statCol}>
          <div className={`${styles.iconCircle} ${styles.iconCirclePurple}`}>
            <Gift size={22} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Giveaways</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>{totalGiveaways}</span>
              <span className={styles.statUnit}>Active</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Total Participants */}
        <div className={styles.statCol}>
          <div className={`${styles.iconCircle} ${styles.iconCircleBlue}`}>
            <Users size={22} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Participants</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>{totalParticipants}</span>
              <span className={styles.statUnitBlue}>Users</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Prizes Won */}
        <div className={styles.statCol}>
          <div className={`${styles.iconCircle} ${styles.iconCircleGreen}`}>
            <Trophy size={22} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Prizes Won</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>{prizesWon}</span>
              <span className={styles.statUnitGreen}>Rewards</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Ends In */}
        <div className={styles.statCol}>
          <div className={`${styles.iconCircle} ${styles.iconCircleOrange}`}>
            <Clock size={22} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Ends In</span>
            <div className={styles.statValueRow}>
              <span className={styles.countdownValue}>{timeLeft}</span>
              <span className={styles.statUnitOrange}>Remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
