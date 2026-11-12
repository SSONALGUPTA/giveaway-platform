import React from 'react';
import { Gift, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { gift1Img } from '../../lib/mockData';
import giveawayTicketImg from '../../assets/Giveaway.png';
import styles from './GiveawayBanner.module.css';

export default function GiveawayBanner({ onEnterGiveaway }) {
  return (
    <div className={styles.bannerContainer}>
      {/* Top Left Badge */}
      <div className={styles.codePill}>
        <Gift size={14} className={styles.codeIcon} />
        <span>Giveaway Code</span>
      </div>

      <div className={styles.contentRow}>
        {/* Left Side: 3D Gift Box on Glowing Pedestal */}
        <div className={styles.giftVisualCol}>
          <div className={styles.glowAura} />
          <img src={gift1Img} alt="Gift Box" className={styles.giftBoxImg} />
          <div className={styles.glowRing} />
        </div>

        {/* Center Text & CTAs */}
        <div className={styles.centerCol}>
          <div className={styles.sparkleRow}>
            <Sparkles size={13} className={styles.sparkleIcon} />
            <span>Unlock Amazing Rewards</span>
            <Sparkles size={13} className={styles.sparkleIcon} />
          </div>

          <h2 className={styles.bannerTitle}>
            Exclusive Giveaway <br />
            <span className={styles.gradientRewards}>Rewards</span>
          </h2>

          <p className={styles.bannerDesc}>
            Enter special giveaway codes and unlock exciting <span className={styles.highlightText}>VEs rewards</span> instantly.
          </p>

          {/* 3 Mini Trust Features */}
          <div className={styles.featureRow}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Shield size={14} />
              </div>
              <div className={styles.featureText}>
                <strong>100% Safe</strong>
                <span>Secure & Trusted</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Zap size={14} />
              </div>
              <div className={styles.featureText}>
                <strong>Instant Rewards</strong>
                <span>Get Rewards Fast</span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Gift size={14} />
              </div>
              <div className={styles.featureText}>
                <strong>Exclusive VEs</strong>
                <span>Special for You</span>
              </div>
            </div>
          </div>

          {/* Enter Giveaway CTA Button */}
          <div className={styles.btnRow}>
            <button
              type="button"
              className={styles.enterBtn}
              onClick={onEnterGiveaway}
            >
              <span>Enter Giveaway</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Hand with Golden Giveaway Ticket (Giveaway.png) */}
        <div className={styles.ticketVisualCol}>
          <img src={giveawayTicketImg} alt="Giveaway Ticket" className={styles.ticketImg} />
        </div>
      </div>
    </div>
  );
}
