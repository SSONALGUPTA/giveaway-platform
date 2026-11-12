import React from 'react';
import { CheckCircle2, Clock, PackageCheck, AlertOctagon } from 'lucide-react';
import styles from './Claim.module.css';

export default function ClaimStatus({ status = 'NOT_SUBMITTED' }) {
  if (status === 'SUBMITTED') {
    return (
      <div className={`${styles.statusBanner} ${styles.statusSubmitted}`}>
        <CheckCircle2 size={20} className={styles.statusSuccessIcon} />
        <div>
          <span className={styles.statusTitle}>Claim Submitted ✓</span>
          <p className={styles.statusDesc}>Our operations team has received your verification and will process your prize dispatch.</p>
        </div>
      </div>
    );
  }

  if (status === 'PROCESSING') {
    return (
      <div className={`${styles.statusBanner} ${styles.statusProcessing}`}>
        <Clock size={20} className={styles.statusPendingIcon} />
        <div>
          <span className={styles.statusTitle}>Prize Verification In Progress</span>
          <p className={styles.statusDesc}>Identity match and warehouse allocation is currently underway.</p>
        </div>
      </div>
    );
  }

  if (status === 'COMPLETED') {
    return (
      <div className={`${styles.statusBanner} ${styles.statusCompleted}`}>
        <PackageCheck size={20} className={styles.statusCompletedIcon} />
        <div>
          <span className={styles.statusTitle}>Prize Delivered ✓</span>
          <p className={styles.statusDesc}>Tracking code or gift voucher code has been successfully sent to you.</p>
        </div>
      </div>
    );
  }

  if (status === 'EXPIRED') {
    return (
      <div className={`${styles.statusBanner} ${styles.statusExpired}`}>
        <AlertOctagon size={20} className={styles.statusDangerIcon} />
        <div>
          <span className={styles.statusTitle}>Claim Window Expired</span>
          <p className={styles.statusDesc}>The 7-day claim window has concluded for this reward.</p>
        </div>
      </div>
    );
  }

  return null;
}
