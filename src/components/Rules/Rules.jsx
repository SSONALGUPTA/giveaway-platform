import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Scale, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import styles from './Rules.module.css';

const DEFAULT_RULES = [
  {
    id: 'rule-eligibility',
    title: 'Eligibility Requirements',
    icon: ShieldCheck,
    summary: 'Active verified members aged 18+ resident in eligible delivery regions.',
    details: 'Participants must hold a verified VELOOP Rewards account with an authenticated phone number and email address. Suspended or duplicate accounts are strictly disqualified.'
  },
  {
    id: 'rule-entry',
    title: 'Entry & Single Participation Policy',
    icon: CheckCircle,
    summary: '1 participation strictly allowed per user per giveaway event.',
    details: 'Entry fees are collected authoritative server-side using VEs, SVEs, or Tokens. Once entered, additional requests from the same user or device environment are safely rejected.'
  },
  {
    id: 'rule-selection',
    title: 'Audited Winner Selection Engine',
    icon: Scale,
    summary: 'Automated backend random draw with cryptographic seed verification.',
    details: 'Winners are finalized automatically once the countdown reaches zero. The draw process is executed on secure backend servers and recorded permanently in our audit logs.'
  },
  {
    id: 'rule-claim',
    title: 'Prize Claim Window & Fulfillment',
    icon: Clock,
    summary: '7-day claim window for physical prizes; 14 days for gift vouchers.',
    details: 'Winners must complete verification and submit fulfillment details within the deadline. Physical tech prizes are shipped insured with tracking. Gift vouchers are delivered instantly via verified email.'
  },
  {
    id: 'rule-fraud',
    title: 'Anti-Abuse & Disqualification Policy',
    icon: AlertTriangle,
    summary: 'Zero tolerance for bot automation, proxy routing, or duplicate identity creation.',
    details: 'Our multi-signal fraud engine monitors suspicious participation velocity, device fingerprints, and account patterns. Any fraudulent entry forfeits prize eligibility immediately.'
  }
];

export default function Rules() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => prev === index ? -1 : index);
  };

  return (
    <section className={styles.sectionWrapper} id="giveaway-rules">
      <div className={styles.header}>
        <span className={styles.badge}>OFFICIAL TERMS</span>
        <h2 className={styles.title}>Giveaway Rules & Guidelines</h2>
        <p className={styles.subtitle}>
          Fairness and transparency are the pillars of VELOOP Rewards. Review the official event regulations below.
        </p>
      </div>

      <div className={styles.accordionContainer}>
        {DEFAULT_RULES.map((rule, idx) => {
          const isOpen = openIndex === idx;
          const IconComp = rule.icon;
          return (
            <div key={rule.id} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
              >
                <div className={styles.headerLeft}>
                  <div className={styles.iconBox}>
                    <IconComp size={18} className={styles.ruleIcon} />
                  </div>
                  <div>
                    <h3 className={styles.ruleTitle}>{rule.title}</h3>
                    <span className={styles.ruleSummary}>{rule.summary}</span>
                  </div>
                </div>
                <ChevronDown size={20} className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`} />
              </button>
              {isOpen && (
                <div className={styles.accordionBody}>
                  <p className={styles.detailsText}>{rule.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
