import React, { useState } from 'react';
import { Sliders, Check, User, Clock, AlertCircle, Trophy, RefreshCcw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useGiveaway } from '../../hooks/useGiveaway';
import styles from './DevSwitcher.module.css';

export default function DevStateSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserKey, switchUserPersona } = useAuth();
  const { giveawayStatus, setForcedStatus } = useGiveaway();

  const personas = [
    { key: 'VISITOR', label: '1. Visitor (Logged Out)', desc: 'Tests Login Required CTA' },
    { key: 'ELIGIBLE_USER', label: '2. Eligible User (Rahul)', desc: '850 VEs - Can join iPhone/Watch' },
    { key: 'INSUFFICIENT_BALANCE_USER', label: '3. Low Balance (Priya)', desc: '120 VEs - Tests shortage & Earn CTA' },
    { key: 'PARTICIPATING_USER', label: '4. Joined User (Ananya)', desc: 'Already entered - Tests single entry rule' },
    { key: 'WINNER_USER', label: '5. Physical Winner (Aman)', desc: 'Won Apple Watch - Tests physical claim' },
    { key: 'GIFT_CARD_WINNER', label: '6. Gift Card Winner (Karan)', desc: 'Won ₹2,000 Amazon - Tests email claim' }
  ];

  const statuses = [
    { key: 'ACTIVE', label: 'Live Active Giveaway' },
    { key: 'ENDED', label: 'Ended Giveaway' },
    { key: 'UPCOMING', label: 'Upcoming Giveaway' }
  ];

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Dev State & Persona Switcher"
      >
        <Sliders size={16} />
        <span className={styles.btnLabel}>State Simulator</span>
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Simulation & Testing Panel</span>
            <span className={styles.panelSubtitle}>Spec Sections 54-59 & 69-70</span>
          </div>

          {/* User Persona Group */}
          <div className={styles.sectionGroup}>
            <span className={styles.groupLabel}>Select User Persona:</span>
            <div className={styles.optionsList}>
              {personas.map((p) => {
                const isSelected = currentUserKey === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    className={`${styles.optionBtn} ${isSelected ? styles.optionActive : ''}`}
                    onClick={() => switchUserPersona(p.key)}
                  >
                    <div className={styles.btnText}>
                      <span className={styles.personaName}>{p.label}</span>
                      <span className={styles.personaDesc}>{p.desc}</span>
                    </div>
                    {isSelected && <Check size={14} className={styles.checkIcon} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Giveaway Lifecycle Group */}
          <div className={styles.sectionGroup}>
            <span className={styles.groupLabel}>Event Lifecycle Status:</span>
            <div className={styles.statusRow}>
              {statuses.map((s) => {
                const isSelected = giveawayStatus === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    className={`${styles.statusBtn} ${isSelected ? styles.statusBtnActive : ''}`}
                    onClick={() => setForcedStatus(s.key)}
                  >
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
