import React from 'react';
import { Mail, Gift } from 'lucide-react';
import styles from './Claim.module.css';

export default function AmazonGiftCardForm({ formData, onChange, disabled }) {
  return (
    <div className={styles.formFields}>
      <div className={styles.giftCardNotice}>
        <Gift size={20} className={styles.noticeIcon} />
        <div>
          <div className={styles.noticeHeading}>Digital Voucher Delivery</div>
          <p className={styles.noticeText}>
            Digital vouchers are sent electronically. No physical address is required.
          </p>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="claim-email">
          Email Address
        </label>
        <div className={styles.inputWrapper}>
          <Mail size={16} className={styles.inputIcon} />
          <input
            id="claim-email"
            type="email"
            className={styles.input}
            placeholder="Enter email where you want to receive your gift card"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
        <span className={styles.helpText}>
          Your Amazon voucher code and redemption instructions will be delivered to this email.
        </span>
      </div>
    </div>
  );
}

