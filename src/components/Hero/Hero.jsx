import React from 'react';
import { Gift, Users, Trophy, Clock, Sparkles } from 'lucide-react';
import { gift1Img, gift2Img } from '../../lib/mockData';
import styles from './Hero.module.css';

export default function Hero({ giveaway, status = 'ACTIVE' }) {
  return (
    <section className={styles.heroSection}>
      {/* Top Brand Logo */}
      <div className={styles.brandRow}>
        <div className={styles.brandContainer}>
          <div className={styles.vrLogo}>
            <span className={styles.vrText}>VR</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>VELOOP</span>
            <span className={styles.brandSub}>REWARDS</span>
          </div>
        </div>
      </div>

      {/* Main Header Container with Left and Right Floating 3D Gift Boxes */}
      <div className={styles.heroCenter}>
        {/* Left 3D Gift on Pedestal */}
        <div className={`${styles.giftBoxWrapper} ${styles.leftGift}`}>
          <div className={styles.giftAura} />
          <img src={gift1Img} alt="Gift Box" className={styles.giftImg} />
          <div className={styles.pedestal} />
        </div>

        {/* Center Text */}
        <div className={styles.centerContent}>
          <div className={styles.exclusivePill}>
            <Gift size={14} className={styles.giftIcon} />
            <span>EXCLUSIVE GIVEAWAYS</span>
          </div>

          <h1 className={styles.mainTitle}>
            Giveaway <span className={styles.gradientText}>Section</span>
          </h1>

          <p className={styles.subtitle}>
            Join exciting giveaways, complete simple tasks and <br />
            win amazing rewards from VELoop Rewards.
          </p>

          <div className={styles.tagline}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>More participation, more chances to win!</span>
            <Sparkles size={14} className={styles.sparkleIcon} />
          </div>
        </div>

        {/* Right 3D Gift on Pedestal */}
        <div className={`${styles.giftBoxWrapper} ${styles.rightGift}`}>
          <div className={styles.giftAura} />
          <img src={gift2Img} alt="Gift Box" className={styles.giftImg} />
          <div className={styles.pedestal} />
        </div>
      </div>

      {/* 4 Statistics Cards Strip (Matching Image 2) */}
      <div className={styles.statsStrip}>
        {/* Stat 1: Total Giveaways */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconCircle} ${styles.purpleIconCircle}`}>
            <Gift size={20} className={styles.iconPurple} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Giveaways</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>24</span>
              <span className={styles.statUnit}>Active</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Total Participants */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconCircle} ${styles.blueIconCircle}`}>
            <Users size={20} className={styles.iconBlue} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Participants</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>8.5K+</span>
              <span className={styles.statUnitBlue}>Users</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Prizes Won */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconCircle} ${styles.greenIconCircle}`}>
            <Trophy size={20} className={styles.iconGreen} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Prizes Won</span>
            <div className={styles.statValueRow}>
              <span className={styles.statNumber}>1.2K+</span>
              <span className={styles.statUnitGreen}>Rewards</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Ends In Countdown */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconCircle} ${styles.orangeIconCircle}`}>
            <Clock size={20} className={styles.iconOrange} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Ends In</span>
            <div className={styles.statValueRow}>
              <span className={styles.countdownDigit}>12d : 08h : 45m</span>
            </div>
            <span className={styles.statSubText}>Remaining</span>
          </div>
        </div>
      </div>
    </section>
  );
}
