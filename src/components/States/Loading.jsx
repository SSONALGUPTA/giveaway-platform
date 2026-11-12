import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Trophy, Ticket } from 'lucide-react';
import styles from './States.module.css';

const MESSAGES = [
  "Preparing today's rewards...",
  "Checking active giveaways...",
  "Loading available prizes...",
  "Bringing your rewards closer..."
];

export default function Loading({ fullScreen = false, messageIndex = 0 }) {
  const [currentMsgIdx, setCurrentMsgIdx] = useState(messageIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.visualBox}>
        {/* Glowing aura */}
        <div className={styles.auraRing} />

        {/* Themed Icon Cluster */}
        <div className={styles.boxWrapper}>
          <div className={styles.giftIconBox}>
            <Gift size={38} className={styles.giftIcon} />
          </div>
          <Sparkles size={20} className={styles.orbitSparkle1} />
          <Trophy size={18} className={styles.orbitSparkle2} />
        </div>
      </div>

      <div className={styles.tagline}>VELOOP REWARDS</div>
      <h4 className={styles.rotatingText}>{MESSAGES[currentMsgIdx]}</h4>

      {/* Progress Dots */}
      <div className={styles.dotsTrack}>
        <span className={styles.pulsingDot} style={{ animationDelay: '0s' }} />
        <span className={styles.pulsingDot} style={{ animationDelay: '0.2s' }} />
        <span className={styles.pulsingDot} style={{ animationDelay: '0.4s' }} />
        <span className={styles.pulsingDot} style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}
