import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import styles from './States.module.css';

export default function ErrorState({
  title = "We couldn't load the giveaway information",
  message = "Please verify your network connection and try again.",
  onRetry
}) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIconCircle}>
        <AlertCircle size={32} className={styles.errorIcon} />
      </div>
      <h3 className={styles.errorTitle}>{title}</h3>
      <p className={styles.errorDesc}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
