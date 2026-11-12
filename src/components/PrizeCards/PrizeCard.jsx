import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import styles from './PrizeCards.module.css';

export default function PrizeCard({ prize, onSelectPrize }) {
  return (
    <div className={styles.prizeCard}>
      {/* Position Badge at top left */}
      <div className={styles.badgeRow}>
        <span 
          className={styles.positionBadge}
          style={{ 
            color: prize.badgeColor,
            borderColor: `${prize.badgeColor}40`,
            background: `${prize.badgeColor}18`
          }}
        >
          {prize.badgeLabel || prize.positionLabel}
        </span>
      </div>

      {/* Prize Image on Glowing Color-Coded Pedestal */}
      <div className={styles.imagePedestalArea}>
        <div 
          className={styles.pedestalGlow}
          style={{ background: prize.glowColor }}
        />
        <img 
          src={prize.imageUrl} 
          alt={prize.name} 
          className={styles.productImg} 
          loading="lazy" 
        />
        <div 
          className={styles.pedestalRing}
          style={{ 
            background: `radial-gradient(ellipse at center, ${prize.themeColor}aa 0%, transparent 70%)`,
            boxShadow: `0 0 16px ${prize.themeColor}88`
          }}
        />
      </div>

      {/* Prize Info */}
      <div className={styles.infoArea}>
        <h4 className={styles.productName}>{prize.name}</h4>
        <p className={styles.productSubname}>{prize.subname || prize.description}</p>

        {/* Meta Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Users size={12} className={styles.statIcon} />
            <span>{(prize.participantsCount || 2300).toLocaleString()}+ Participants</span>
          </div>
          <div className={styles.statItem}>
            <Clock size={12} className={styles.statIcon} />
            <span>{prize.remainingTime || '12d : 08h : 45m left'}</span>
          </div>
        </div>

        {/* Join Now Button */}
        <button
          type="button"
          className={styles.joinBtn}
          style={{ background: prize.btnGradient }}
          onClick={() => onSelectPrize(prize)}
        >
          <span>Join Now</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
