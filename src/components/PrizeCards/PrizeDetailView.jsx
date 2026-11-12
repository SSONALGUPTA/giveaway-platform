import React, { useState } from 'react';
import { ArrowLeft, Users, Clock, Trophy, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/format';
import { useAuth } from '../../hooks/useAuth';
import StatusBadge from '../StatusBadge/StatusBadge';
import Countdown from '../Countdown/Countdown';
import JoinConfirmationModal from './JoinConfirmationModal';
import styles from './PrizeDetailView.module.css';

export default function PrizeDetailView({
  prize,
  giveaway,
  giveawayStatus = 'ACTIVE',
  onBack,
  onJoinSuccess,
  onLoginClick
}) {
  const { user, isLoggedIn } = useAuth();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  if (!prize) return null;

  // Resolve user balance for prize's currency
  let userBalance = 0;
  if (user) {
    if (prize.entryCurrency === 'VE') userBalance = user.veBalance;
    else if (prize.entryCurrency === 'SVE') userBalance = user.sveBalance;
    else if (prize.entryCurrency === 'TOKEN') userBalance = user.tokenBalance;
  }

  const hasEnoughBalance = userBalance >= prize.entryFee;
  const isAlreadyJoined = (user?.participatedPrizes || []).includes(prize.id);
  const shortage = Math.max(0, prize.entryFee - userBalance);

  return (
    <div className={styles.detailPageWrapper}>
      {/* Top Breadcrumb Navigation (Spec Section 82) */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <button type="button" className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Giveaway Home</span>
          </button>
        </div>
      </div>

      <div className="container py-4">
        {/* Individual Hero Header (Spec Section 81 & 83) */}
        <div className={styles.heroCard}>
          <div className="row align-items-center g-4">
            {/* Visual Box */}
            <div className="col-lg-5">
              <div className={styles.imageWrapper}>
                <img src={prize.imageUrl} alt={prize.name} className={styles.prizeHeroImage} />
                <div className={styles.imageOverlay} />
                <span className={styles.floatingTag}>
                  {prize.positionLabel} • {prize.winnerCount === 1 ? '1 Winner' : `${prize.winnerCount} Winners`}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="col-lg-7">
              <div className={styles.badgeRow}>
                <StatusBadge status="EXCLUSIVE" label={prize.badgeLabel || "EXCLUSIVE GIVEAWAY"} />
                <StatusBadge status={giveawayStatus} />
              </div>

              <h1 className={styles.prizeTitle}>Win {prize.name}</h1>
              <p className={styles.prizeSubtitle}>
                {prize.description} Complete eligible participation before the countdown timer concludes.
              </p>

              {/* Status & Countdown (Spec Section 81) */}
              <div className={styles.countdownBox}>
                <Countdown targetDate={giveaway?.endAt} label="Giveaway Ends In" />
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Breakdown: Prize Details & Participation Flow */}
        <div className="row g-4 mt-2">
          {/* Left Column: Dedicated Prize Information Card (Spec Section 84) */}
          <div className="col-lg-6">
            <div className={styles.infoCard}>
              <h3 className={styles.cardHeaderTitle}>Prize Information</h3>
              <p className={styles.cardHeaderDesc}>Official specifications and allocation breakdown.</p>

              <div className={styles.specTable}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Prize Name:</span>
                  <span className={styles.specValue}>{prize.name}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Prize Tier:</span>
                  <span className={styles.specValue}>{prize.positionLabel}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Prize Category:</span>
                  <span className={styles.specValue}>{prize.type === 'PHYSICAL' ? 'Physical Electronics' : 'Digital Gift Voucher'}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Total Winners:</span>
                  <span className={styles.specValueHighlight}>
                    {prize.winnerCount === 1 ? '1 Winner (Guaranteed)' : `${prize.winnerCount} Lucky Winners`}
                  </span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Official Value:</span>
                  <span className={styles.specValue}>{prize.valueDisplay || 'Exclusive Reward'}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Current Participants:</span>
                  <span className={styles.specValue}>{(prize.participantsCount || 2340).toLocaleString()} Users</span>
                </div>
              </div>
            </div>

            {/* How This Giveaway Works (Spec Section 90) */}
            <div className={`${styles.infoCard} mt-4`}>
              <h3 className={styles.cardHeaderTitle}>How This Giveaway Works</h3>
              <div className={styles.timelineList}>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>01</span>
                  <div>
                    <strong className={styles.stepName}>Review the giveaway</strong>
                    <p className={styles.stepDetail}>Inspect the prize specifications, rules, and entry fee requirements.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>02</span>
                  <div>
                    <strong className={styles.stepName}>Check your eligibility & balance</strong>
                    <p className={styles.stepDetail}>Verify you have the required {prize.entryCurrency}s available in your wallet.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>03</span>
                  <div>
                    <strong className={styles.stepName}>Pay the required entry amount</strong>
                    <p className={styles.stepDetail}>Authoritatively deduct {formatCurrency(prize.entryFee, prize.entryCurrency)} via atomic transaction.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>04</span>
                  <div>
                    <strong className={styles.stepName}>Your participation is recorded</strong>
                    <p className={styles.stepDetail}>Your cryptographic entry is sealed into the draw pool.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>05</span>
                  <div>
                    <strong className={styles.stepName}>Winner is selected & claims prize</strong>
                    <p className={styles.stepDetail}>Once the timer hits zero, winners are announced and claim delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Entry Fee, Balance Check & Action Card (Spec Section 85-88) */}
          <div className="col-lg-6">
            <div className={`${styles.infoCard} ${styles.entryActionCard}`}>
              <div className={styles.actionHeader}>
                <span className={styles.cardHeaderTitle}>Participation & Entry Fee</span>
                <span className={`${styles.currencyTag} ${styles['tag_' + prize.entryCurrency]}`}>
                  {prize.entryCurrency} Required
                </span>
              </div>

              {/* Exact Cost Breakdown */}
              <div className={styles.costBox}>
                <span className={styles.costLabel}>Official Entry Fee</span>
                <span className={styles.costNumber}>
                  {formatCurrency(prize.entryFee, prize.entryCurrency)}
                </span>
                <span className={styles.costSub}>Authoritative server-side price</span>
              </div>

              {/* Balance Verification (Spec Section 87 & 88) */}
              {isLoggedIn ? (
                <div className={styles.balanceStatusBox}>
                  <div className={styles.balanceRow}>
                    <span>Your Current {prize.entryCurrency} Balance:</span>
                    <strong className={styles.balanceAmount}>
                      {formatCurrency(userBalance, prize.entryCurrency)}
                    </strong>
                  </div>

                  {isAlreadyJoined ? (
                    <div className={styles.alreadyBanner}>
                      <CheckCircle2 size={18} className={styles.checkIcon} />
                      <span>✓ You're Already Participating in this giveaway.</span>
                    </div>
                  ) : hasEnoughBalance ? (
                    <div className={styles.eligibleBanner}>
                      <CheckCircle2 size={18} className={styles.checkIcon} />
                      <span>✓ You have enough {prize.entryCurrency}s to enter!</span>
                    </div>
                  ) : (
                    <div className={styles.insufficientBanner}>
                      <AlertTriangle size={18} className={styles.alertIcon} />
                      <div>
                        <strong>Insufficient {prize.entryCurrency}s</strong>
                        <p className={styles.needText}>
                          You need {shortage.toLocaleString()} more {prize.entryCurrency}s to enter.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.visitorNotice}>
                  <p>You must be signed in to verify your wallet balance and participate.</p>
                </div>
              )}

              {/* Action Button: Opens Entry Confirmation Modal (Spec Section 94) */}
              <div className={styles.actionBtnRow}>
                {!isLoggedIn ? (
                  <button type="button" className={styles.mainCtaBtn} onClick={onLoginClick}>
                    Login to Participate
                  </button>
                ) : isAlreadyJoined ? (
                  <button type="button" className={styles.joinedBtn} disabled>
                    ✓ You're Participating
                  </button>
                ) : !hasEnoughBalance ? (
                  <button type="button" className={styles.earnMoreBtn}>
                    <span>Earn More {prize.entryCurrency}s</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.mainCtaBtn}
                    onClick={() => setIsJoinModalOpen(true)}
                  >
                    <span>Join for {formatCurrency(prize.entryFee, prize.entryCurrency)}</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>

              {/* Trust disclaimer */}
              <div className={styles.securityPill}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <span>Protected by single-entry verification and encrypted audit logs.</span>
              </div>
            </div>

            {/* Terms & Conditions (Spec Section 91 & 92) */}
            <div className={`${styles.infoCard} mt-4`}>
              <h3 className={styles.cardHeaderTitle}>Important Terms & Conditions</h3>
              <ul className={styles.termsList}>
                <li><strong>Eligibility:</strong> Open to verified accounts with completed phone authentication.</li>
                <li><strong>Single Entry:</strong> Only 1 participation allowed per member for this event.</li>
                <li><strong>Refund Policy:</strong> Entry fees are non-refundable once participation is recorded.</li>
                <li><strong>Claim Window:</strong> Winners must submit claim details within {prize.claimDeadlineDays || 7} days.</li>
                <li><strong>Disqualification:</strong> Multiple accounts from the same user/device will forfeit entry.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <JoinConfirmationModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        prize={prize}
        onConfirmJoin={onJoinSuccess}
        onEarnMore={() => alert(`To earn more ${prize.entryCurrency}s, complete daily reward check-ins or referral missions!`)}
        onLoginClick={onLoginClick}
      />
    </div>
  );
}
