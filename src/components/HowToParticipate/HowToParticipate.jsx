import React from 'react';
import { Rocket, User, Target, Gift, Trophy, FileText, ArrowRight } from 'lucide-react';
import styles from './HowToParticipate.module.css';

const STEPS = [
  {
    step: '1. Sign Up / Login',
    desc: 'Create your account or login to get started.',
    icon: User,
    circleClass: styles.circlePurple
  },
  {
    step: '2. Complete Tasks',
    desc: 'Complete simple tasks and earn more entries.',
    icon: Target,
    circleClass: styles.circleBlue
  },
  {
    step: '3. Get Entries',
    desc: 'Each task gives you entries for the giveaway.',
    icon: Gift,
    circleClass: styles.circleGreen
  },
  {
    step: '4. Win Rewards',
    desc: 'Winners are selected randomly after the giveaway ends.',
    icon: Trophy,
    circleClass: styles.circleOrange
  }
];

export default function HowToParticipate({ onRulesClick }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Rocket size={18} className={styles.rocketIcon} />
          <h3 className={styles.title}>How to Participate?</h3>
        </div>
        <p className={styles.subtitle}>Follow these simple steps to join and win.</p>
      </div>

      {/* Vertical Steps with Connected Dotted Line */}
      <div className={styles.timelineList}>
        {STEPS.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={item.step} className={styles.stepItem}>
              {/* Connected Line */}
              {idx < STEPS.length - 1 && <div className={styles.dottedLine} />}

              {/* Step Circle */}
              <div className={`${styles.iconCircle} ${item.circleClass}`}>
                <IconComp size={16} />
              </div>

              {/* Step Details */}
              <div className={styles.stepDetails}>
                <h4 className={styles.stepTitle}>{item.step}</h4>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Link Button */}
      <div className={styles.bottomLinkArea}>
        <button
          type="button"
          className={styles.rulesBtn}
          onClick={() => {
            const el = document.getElementById('giveaway-rules');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            if (onRulesClick) onRulesClick();
          }}
        >
          <FileText size={15} />
          <span>View Rules & Guidelines</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
