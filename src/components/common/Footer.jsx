import React from 'react';
import { Gift, Shield, HelpCircle, Mail, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({ onHomeClick, onRulesClick, onFaqClick }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.brandBox}>
            <div className={styles.brandLogo}>
              <Gift size={20} className={styles.giftIcon} />
              <span className={styles.brandTitle}>VELOOP Rewards</span>
            </div>
            <p className={styles.brandDesc}>
              The premium, transparent rewards and giveaway platform. Real opportunities, verifiable fairness.
            </p>
          </div>

          <div className={styles.linksNav}>
            <button type="button" className={styles.footerLink} onClick={onHomeClick}>
              Giveaway Home
            </button>
            <button type="button" className={styles.footerLink} onClick={onRulesClick}>
              Official Rules
            </button>
            <button type="button" className={styles.footerLink} onClick={onFaqClick}>
              FAQ & Help
            </button>
            <a href="#terms" className={styles.footerLink}>
              Terms & Conditions
            </a>
            <a href="#privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className={styles.supportBox}>
          <div className={styles.supportLeft}>
            <HelpCircle size={18} className={styles.supportIcon} />
            <span>Have questions or need assistance? Contact VELOOP Rewards support anytime.</span>
          </div>
          <a href="mailto:support@veloop.com" className={styles.supportContactBtn}>
            <Mail size={15} />
            <span>support@veloop.com</span>
          </a>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} VELOOP Rewards. All rights reserved. Not affiliated with Apple Inc. or Amazon.com.
          </span>
          <div className={styles.complianceRow}>
            <Shield size={14} className={styles.shieldIcon} />
            <span>ISO 27001 Certified Security Practices • Audited Draw Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
