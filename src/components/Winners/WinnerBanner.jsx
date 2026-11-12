import React from 'react';
import { Trophy, ArrowRight, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './Winners.module.css';

export default function WinnerBanner({ wonPrize, onClaimClick }) {
  if (!wonPrize) return null;

  const triggerCelebrate = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.3 } });
    } catch (e) {}
    onClaimClick();
  };

  const isClaimed = wonPrize.status === 'SUBMITTED' || wonPrize.status === 'COMPLETED';

  return (
    <div className={styles.winnerHighlightBanner}>
      <div className={styles.bannerLeft}>
        <div className={styles.trophyGlowBox}>
          <Trophy size={28} className={styles.winnerGlowIcon} />
        </div>
        <div>
          <div className={styles.congratsRow}>
            <Sparkles size={16} className={styles.goldSparkle} />
            <span className={styles.congratsHeading}>🎉 Congratulations!</span>
          </div>
          <h3 className={styles.wonPrizeHeadline}>
            You won {wonPrize.name}!
          </h3>
          <p className={styles.claimSubtext}>
            {isClaimed 
              ? 'Your claim details are safely recorded. We are preparing your delivery.' 
              : `Submit your claim details within ${wonPrize.claimDeadline || '7 days'} to receive your reward.`}
          </p>
        </div>
      </div>

      <div className={styles.bannerRight}>
        <button
          type="button"
          className={styles.claimActionBtn}
          onClick={triggerCelebrate}
        >
          <span>{isClaimed ? 'View Claim Status' : 'Claim Your Prize'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
