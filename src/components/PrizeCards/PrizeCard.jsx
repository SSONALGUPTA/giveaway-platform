import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import styles from './PrizeCards.module.css';

export default function PrizeCard({ prize, onSelectPrize }) {
  // Theme fallbacks matching Image 2
  const isP1 = prize.position === 1 || prize.slug?.includes('iphone');
  const isP2 = prize.position === 2 || prize.slug?.includes('watch');
  const isP3 = prize.position === 3 || prize.slug?.includes('airpods');
  const isP4 = prize.position === 4 || prize.slug?.includes('amazon');

  const badgeText = isP1 ? '1st Prize' : isP2 ? '2nd Prize' : isP3 ? '3rd Prize' : 'Lucky Draw';
  const badgeClass = isP1 ? styles.badgeP1 : isP2 ? styles.badgeP2 : isP3 ? styles.badgeP3 : styles.badgeP4;
  const glowClass = isP1 ? styles.glowP1 : isP2 ? styles.glowP2 : isP3 ? styles.glowP3 : styles.glowP4;
  const btnClass = isP1 ? styles.btnP1 : isP2 ? styles.btnP2 : isP3 ? styles.btnP3 : styles.btnP4;

  const participants = prize.participantsCount 
    ? `${(prize.participantsCount / 1000).toFixed(1)}K+` 
    : isP1 ? '2.3K+' : isP2 ? '1.8K+' : isP3 ? '3.1K+' : '1.3K+';

  const timeRemaining = prize.remainingTime || (
    isP1 ? '12d : 08h : 45m' : isP2 ? '9d : 06h : 30m' : isP3 ? '7d : 09h : 20m' : '5d : 12h : 15m'
  );

  return (
    <div className={styles.prizeCard}>
      {/* Top Badge */}
      <div className={styles.cardHeader}>
        <span className={`${styles.positionBadge} ${badgeClass}`}>
          {badgeText}
        </span>
      </div>

      {/* Image with Glowing Pedestal */}
      <div className={styles.imagePedestalArea}>
        <div className={`${styles.pedestalGlow} ${glowClass}`} />
        <img
          src={prize.imageUrl}
          alt={prize.name}
          className={styles.productImg}
          loading="lazy"
        />
        <div className={styles.pedestalPlate} />
      </div>

      {/* Product Details */}
      <div className={styles.detailsArea}>
        <h4 className={styles.productName} title={prize.name}>
          {prize.name}
        </h4>
        <p className={styles.productSubname} title={prize.subname || prize.description}>
          {prize.subname || prize.description}
        </p>

        {/* Stats Grid: Participants & Countdown */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Users size={12} className={styles.metaIcon} />
            <span>{participants} Participants</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={12} className={styles.metaIcon} />
            <span>{timeRemaining}</span>
          </div>
        </div>

        {/* Join Now CTA */}
        <button
          type="button"
          className={`${styles.joinBtn} ${btnClass}`}
          onClick={() => onSelectPrize(prize)}
          aria-label={`Join Giveaway for ${prize.name}`}
        >
          <span>Join Now</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
