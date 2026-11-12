import React, { useState } from 'react';
import { X, Trophy, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import PhysicalPrizeForm from './PhysicalPrizeForm';
import AmazonGiftCardForm from './AmazonGiftCardForm';
import ClaimStatus from './ClaimStatus';
import styles from './Claim.module.css';

export default function ClaimModal({
  isOpen,
  onClose,
  wonPrize,
  onSubmit,
  isSubmitting,
  claimError
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    email: ''
  });

  if (!isOpen || !wonPrize) return null;

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe confetti fallback
      }
    }
  };

  const isPhysical = wonPrize.type === 'PHYSICAL';
  const isAlreadySubmitted = wonPrize.status === 'SUBMITTED' || wonPrize.status === 'COMPLETED' || wonPrize.status === 'PROCESSING';

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalBackdrop} onClick={onClose} />
      
      <div className={styles.modalContent}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.trophyCircle}>
              <Trophy size={20} className={styles.goldTrophy} />
            </div>
            <div>
              <span className={styles.congratsBadge}>WINNER VERIFICATION</span>
              <h3 className={styles.modalTitle}>Claim Your Prize</h3>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Verification Summary (Spec Section 27) */}
        <div className={styles.verificationCard}>
          <div className={styles.verifyRow}>
            <span className={styles.verifyLabel}>Won Prize:</span>
            <span className={styles.verifyValue}>{wonPrize.name}</span>
          </div>
          <div className={styles.verifyRow}>
            <span className={styles.verifyLabel}>Winner Status:</span>
            <span className={styles.verifyBadge}>Winner ✓</span>
          </div>
          <div className={styles.verifyRow}>
            <span className={styles.verifyLabel}>Claim Deadline:</span>
            <span className={styles.verifyDeadline}>Within {wonPrize.claimDeadline || '7 days'}</span>
          </div>
        </div>

        {/* Claim State Status if already submitted */}
        {isAlreadySubmitted ? (
          <div className={styles.modalBody}>
            <ClaimStatus status={wonPrize.status} />
            <div className={styles.actionRow}>
              <button type="button" className={styles.doneBtn} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className={styles.modalBody}>
            {claimError && (
              <div className={styles.errorBox}>
                <AlertCircle size={16} />
                <span>{claimError}</span>
              </div>
            )}

            {/* Dynamic Form per Prize Type (Spec Section 28 & 29) */}
            {isPhysical ? (
              <PhysicalPrizeForm
                formData={formData}
                onChange={handleFieldChange}
                disabled={isSubmitting}
              />
            ) : (
              <AmazonGiftCardForm
                formData={formData}
                onChange={handleFieldChange}
                disabled={isSubmitting}
              />
            )}

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    <span>Submitting Claim...</span>
                  </>
                ) : (
                  <span>Submit Claim</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
