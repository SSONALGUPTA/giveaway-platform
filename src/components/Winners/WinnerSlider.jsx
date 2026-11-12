import React, { useState, useEffect } from 'react';
import { Award, Sparkles } from 'lucide-react';
import { MOCK_WINNER_SLIDER_ITEMS } from '../../lib/mockData';
import styles from './Winners.module.css';

export default function WinnerSlider({ items = MOCK_WINNER_SLIDER_ITEMS }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !items || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000); // 4 seconds per message for readability

    return () => clearInterval(interval);
  }, [isPaused, items]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Recent Winners Announcement"
    >
      <div className={styles.sliderInner}>
        <div className={styles.badgePrefix}>
          <Sparkles size={15} className={styles.sparkleIcon} />
          <span>RECENT WINNERS</span>
        </div>

        <div className={styles.messageTrack}>
          <div 
            key={items[currentIndex].id}
            className={styles.messageContent}
          >
            <Award size={16} className={styles.awardIcon} />
            <span className={styles.messageText}>{items[currentIndex].message}</span>
          </div>
        </div>

        {/* Indicators */}
        <div className={styles.dotsGroup}>
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
