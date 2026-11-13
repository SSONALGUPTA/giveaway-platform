import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { gift1Img, gift2Img } from '../../lib/mockData';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Top Left Brand Logo (Matching Image 2) */}
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

      {/* Hero Center with Left and Right Floating 3D Gift Boxes on Glowing Pedestals */}
      <div className={styles.heroCenter}>
        {/* Left 3D Gift on Pedestal with Confetti */}
        <div className={`${styles.giftBoxWrapper} ${styles.leftGift}`}>
          <div className={styles.confettiParticle1} />
          <div className={styles.confettiParticle2} />
          <div className={styles.sparkleDot1} />
          <div className={styles.giftAura} />
          <img src={gift1Img} alt="Gift Box" className={styles.giftImg} />
          <div className={styles.pedestal} />
        </div>

        {/* Center Content */}
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

        {/* Right 3D Gift on Pedestal with Confetti */}
        <div className={`${styles.giftBoxWrapper} ${styles.rightGift}`}>
          <div className={styles.confettiParticle1} />
          <div className={styles.confettiParticle3} />
          <div className={styles.sparkleDot2} />
          <div className={styles.giftAura} />
          <img src={gift2Img} alt="Gift Box" className={styles.giftImg} />
          <div className={styles.pedestal} />
        </div>
      </div>
    </section>
  );
}
