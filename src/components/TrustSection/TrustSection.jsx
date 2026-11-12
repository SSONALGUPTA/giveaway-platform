import React from 'react';
import { Shield, Lock, CheckCircle2, Headphones } from 'lucide-react';
import styles from './TrustSection.module.css';

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: '100% Fair & Transparent',
    desc: 'All giveaways are conducted fairly and transparently.',
    iconBoxClass: styles.iconBoxPurple,
    iconClass: styles.iconPurple
  },
  {
    icon: Lock,
    title: 'Secure & Safe',
    desc: 'Your data and privacy are our top priority.',
    iconBoxClass: styles.iconBoxBlue,
    iconClass: styles.iconBlue
  },
  {
    icon: CheckCircle2,
    title: 'Trusted by 10K+ Users',
    desc: 'Join thousands of happy users who trust VELoop Rewards.',
    iconBoxClass: styles.iconBoxGreen,
    iconClass: styles.iconGreen
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    desc: "We're here to help you anytime, anywhere.",
    iconBoxClass: styles.iconBoxOrange,
    iconClass: styles.iconOrange
  }
];

export default function TrustSection() {
  return (
    <div className={styles.trustStrip}>
      {TRUST_ITEMS.map((item) => {
        const IconComp = item.icon;
        return (
          <div key={item.title} className={styles.trustCard}>
            <div className={`${styles.iconBox} ${item.iconBoxClass}`}>
              <IconComp size={18} className={item.iconClass} />
            </div>
            <div className={styles.infoBox}>
              <h4 className={styles.trustTitle}>{item.title}</h4>
              <p className={styles.trustDesc}>{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
