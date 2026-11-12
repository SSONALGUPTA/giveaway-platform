import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const FAQ_ITEMS = [
  {
    q: 'How do I participate in VELOOP giveaways?',
    a: 'Sign in to your VELOOP Rewards account, select any live prize from the rewards vault, verify your available currency balance (VEs, SVEs, or Tokens), and click Join. Your cryptographic entry is recorded immediately.'
  },
  {
    q: 'How are winners selected?',
    a: 'Winner selection is fully automated and backend-controlled. When the countdown hits zero, an audited pseudo-random algorithm selects verified participants. Winner selection is never executed in client browser scripts.'
  },
  {
    q: 'When are winners announced?',
    a: 'Winners are announced on the platform immediately after the active event concludes and automated fraud checks complete (typically within minutes of the countdown ending).'
  },
  {
    q: 'What happens if I win?',
    a: 'If you win, a celebratory banner and claim trigger will appear exclusively on your screen when signed in. You will also receive an email with instructions to claim your prize.'
  },
  {
    q: 'How do I claim my prize?',
    a: 'Physical prizes (iPhone, Apple Watch, AirPods) require your shipping address, contact phone, and PIN code. Amazon Gift Vouchers require only your verified email address for digital code dispatch.'
  },
  {
    q: 'Can I participate in multiple giveaways?',
    a: 'Yes. You are welcome to enter different giveaway events as each new event opens. However, each user is restricted to one entry per specific giveaway event to guarantee fairness.'
  },
  {
    q: 'What happens after the giveaway ends?',
    a: 'The current event moves to the Previous Winners archive, prizes are dispatched to verified winners, and the next upcoming giveaway countdown begins.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className={styles.sectionWrapper} id="giveaway-faq">
      <div className={styles.header}>
        <span className={styles.badge}>QUESTIONS & ANSWERS</span>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <p className={styles.subtitle}>
          Everything you need to know about entries, rewards, and claim fulfillment.
        </p>
      </div>

      <div className={styles.faqList}>
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.q} className={`${styles.faqCard} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.questionBtn}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{item.q}</span>
                <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`} />
              </button>
              {isOpen && (
                <div className={styles.answerBox}>
                  <p className={styles.answerText}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
