import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, Coins, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../../lib/format';
import { useAuth } from '../../hooks/useAuth';
import styles from './JoinModal.module.css';

export default function JoinConfirmationModal({
  isOpen,
  onClose,
  prize,
  onConfirmJoin,
  onEarnMore,
  onLoginClick
}) {
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen || !prize) return null;

  // Currency & Balance resolution
  let userBalance = 0;
  if (user) {
    if (prize.entryCurrency === 'VE') userBalance = user.veBalance;
    else if (prize.entryCurrency === 'SVE') userBalance = user.sveBalance;
    else if (prize.entryCurrency === 'TOKEN') userBalance = user.tokenBalance;
  }

  const hasEnough = userBalance >= prize.entryFee;
  const balanceAfter = Math.max(0, userBalance - prize.entryFee);
  const needed = prize.entryFee - userBalance;

  // Check if already joined (Spec Section 97)
  const isAlreadyJoined = (user?.participatedPrizes || []).includes(prize.id);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await onConfirmJoin(prize.id);
      if (result.success) {
        setSuccessResult(result);
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      } else {
        setErrorMessage(result.message || 'Unable to complete entry.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error occurred while joining.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.backdrop} onClick={handleClose} />

      <div className={styles.modalCard}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.titleWithIcon}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <h3 className={styles.modalTitle}>Confirm Participation</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* 1. SUCCESS STATE (Spec Section 96) */}
        {successResult ? (
          <div className={styles.modalBody}>
            <div className={styles.successBox}>
              <div className={styles.successIconCircle}>
                <CheckCircle size={36} className={styles.checkIcon} />
              </div>
              <span className={styles.successTag}>ENTRY CONFIRMED</span>
              <h4 className={styles.successHeading}>🎉 You're In!</h4>
              <p className={styles.successDesc}>
                Your participation for the <strong>{prize.name}</strong> giveaway has been successfully recorded.
              </p>

              <div className={styles.successReceipt}>
                <div className={styles.receiptRow}>
                  <span>Entry Fee Deducted:</span>
                  <span className={styles.receiptAmount}>
                    {formatCurrency(prize.entryFee, prize.entryCurrency)}
                  </span>
                </div>
                <div className={styles.receiptRow}>
                  <span>Updated Balance:</span>
                  <span>{formatCurrency(balanceAfter, prize.entryCurrency)}</span>
                </div>
              </div>

              <p className={styles.goodLuckText}>Good luck! 🍀 Winners announced when timer concludes.</p>

              <button type="button" className={styles.primaryBtn} onClick={handleClose}>
                View Giveaway
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.modalBody}>
            {/* Prize Summary Header */}
            <div className={styles.prizePreviewRow}>
              <img src={prize.imageUrl} alt={prize.name} className={styles.previewImage} />
              <div>
                <span className={styles.positionBadge}>{prize.positionLabel}</span>
                <h4 className={styles.previewName}>{prize.name}</h4>
                <span className={styles.winnerCount}>
                  {prize.winnerCount === 1 ? '1 Winner' : `${prize.winnerCount} Winners`}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className={styles.alertError}>
                <AlertTriangle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 2. VISITOR STATE (Spec Section 98) */}
            {!isLoggedIn ? (
              <div className={styles.loginRequiredBox}>
                <Lock size={28} className={styles.lockIcon} />
                <h5 className={styles.stateTitle}>Login Required</h5>
                <p className={styles.stateText}>
                  Please login to your VELOOP Rewards account before participating in this giveaway.
                </p>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.secondaryBtn} onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="button" className={styles.primaryBtn} onClick={onLoginClick}>
                    Login / Sign Up
                  </button>
                </div>
              </div>
            ) : isAlreadyJoined ? (
              /* 3. ALREADY JOINED STATE (Spec Section 97) */
              <div className={styles.alreadyJoinedBox}>
                <CheckCircle size={32} className={styles.checkIcon} />
                <h5 className={styles.stateTitle}>✓ You're Already Participating</h5>
                <p className={styles.stateText}>
                  Your entry for this giveaway has already been recorded. You can participate again when a new giveaway event begins.
                </p>
                <button type="button" className={styles.primaryBtn} onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : !hasEnough ? (
              /* 4. INSUFFICIENT BALANCE STATE (Spec Section 88) */
              <div className={styles.insufficientBox}>
                <div className={styles.balanceSummary}>
                  <div className={styles.summaryRow}>
                    <span>Your Balance:</span>
                    <span className={styles.balanceText}>{formatCurrency(userBalance, prize.entryCurrency)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Required Fee:</span>
                    <span className={styles.feeHighlight}>{formatCurrency(prize.entryFee, prize.entryCurrency)}</span>
                  </div>
                </div>

                <div className={styles.insufficientWarning}>
                  <AlertTriangle size={20} className={styles.warningIcon} />
                  <div>
                    <strong>Insufficient {prize.entryCurrency}s</strong>
                    <p className={styles.shortageText}>
                      You need {needed.toLocaleString()} more {prize.entryCurrency}s to participate.
                    </p>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" className={styles.secondaryBtn} onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="button" className={styles.earnMoreBtn} onClick={onEarnMore}>
                    <span>Earn More {prize.entryCurrency}s</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* 5. ELIGIBLE - CONFIRMATION STATE (Spec Section 94 & 95) */
              <div className={styles.eligibleBox}>
                <div className={styles.balanceSummary}>
                  <div className={styles.summaryRow}>
                    <span>Entry Fee:</span>
                    <span className={styles.feeHighlight}>{formatCurrency(prize.entryFee, prize.entryCurrency)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Your Current Balance:</span>
                    <span>{formatCurrency(userBalance, prize.entryCurrency)}</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.balanceAfterRow}`}>
                    <span>Balance After Joining:</span>
                    <span className={styles.afterValue}>{formatCurrency(balanceAfter, prize.entryCurrency)}</span>
                  </div>
                </div>

                <div className={styles.termsDisclaimer}>
                  <p>
                    By continuing, you confirm that you have reviewed the giveaway rules and official terms.
                  </p>
                </div>

                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.secondaryBtn} 
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className={styles.spinner} />
                        <span>Joining Giveaway...</span>
                      </>
                    ) : (
                      <span>Confirm & Join</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
