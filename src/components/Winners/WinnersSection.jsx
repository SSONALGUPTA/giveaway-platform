import React, { useState } from 'react';
import { Trophy, History, Sparkles } from 'lucide-react';
import WinnersTab from './WinnersTab';
import PreviousWinnersTab from './PreviousWinnersTab';
import styles from './Winners.module.css';

export default function WinnersSection({
  giveawayStatus = 'ACTIVE',
  currentWinners = [],
  previousWinners = []
}) {
  const [activeTab, setActiveTab] = useState('CURRENT'); // 'CURRENT' | 'PREVIOUS'

  return (
    <section className={styles.sectionWrapper} id="giveaway-winners">
      <div className={styles.header}>
        <span className={styles.badge}>TRANSPARENT REWARDS</span>
        <h2 className={styles.title}>Giveaway Winners Showcase</h2>
        <p className={styles.subtitle}>
          Real rewards for verified community members. Check active event status or browse previous winners.
        </p>

        {/* Tab Buttons */}
        <div className={styles.tabToggleRow}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'CURRENT' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('CURRENT')}
          >
            <Trophy size={16} />
            <span>Current Giveaway Winners</span>
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'PREVIOUS' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('PREVIOUS')}
          >
            <History size={16} />
            <span>Previous Winners ({previousWinners.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className={styles.tabContentArea}>
        {activeTab === 'CURRENT' ? (
          <WinnersTab giveawayStatus={giveawayStatus} winners={currentWinners} />
        ) : (
          <PreviousWinnersTab previousWinners={previousWinners} />
        )}
      </div>
    </section>
  );
}
