import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import PrizeCard from './PrizeCard';
import styles from './PrizeCards.module.css';

export default function PrizeCards({ prizes = [], onSelectPrize }) {
  // Present top 4 featured prizes matching image 2
  const featuredPrizes = prizes.slice(0, 4);

  return (
    <div className={styles.featuredContainer} id="giveaway-prizes">
      {/* Header Row */}
      <div className={styles.headerRow}>
        <div>
          <div className={styles.titleRow}>
            <Star size={18} className={styles.starIcon} />
            <h2 className={styles.featuredTitle}>Featured Giveaways</h2>
          </div>
          <p className={styles.featuredSubtitle}>
            Participate in our handpicked giveaways and win exciting rewards.
          </p>
        </div>

        <button 
          type="button" 
          className={styles.viewAllBtn}
          onClick={() => {
            const el = document.getElementById('giveaway-rules');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>View All Giveaways</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className={styles.prizesGrid}>
        {featuredPrizes.map((prize) => (
          <PrizeCard
            key={prize.id}
            prize={prize}
            onSelectPrize={onSelectPrize}
          />
        ))}
      </div>
    </div>
  );
}
