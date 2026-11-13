import React, { useState } from 'react';
import { useGiveaway } from '../hooks/useGiveaway';
import { useAuth } from '../hooks/useAuth';
import { useWinners } from '../hooks/useWinners';
import { useClaim } from '../hooks/useClaim';

// Core Components matching Image 2 visual design & specifications
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DevStateSwitcher from '../components/common/DevStateSwitcher';

import Hero from '../components/Hero/Hero';
import GiveawayStats from '../components/GiveawayStats/GiveawayStats';
import PrizeCards from '../components/PrizeCards/PrizeCards';
import HowToParticipate from '../components/HowToParticipate/HowToParticipate';
import TrustSection from '../components/TrustSection/TrustSection';

import GiveawayBanner from '../components/GiveawayBanner/GiveawayBanner';
import WinnerSlider from '../components/Winners/WinnerSlider';
import WinnerBanner from '../components/Winners/WinnerBanner';
import WinnersSection from '../components/Winners/WinnersSection';
import PrizeDetailView from '../components/PrizeCards/PrizeDetailView';
import EntryDisplay from '../components/EntryDisplay/EntryDisplay';
import Rules from '../components/Rules/Rules';
import FAQ from '../components/FAQ/FAQ';

import ClaimModal from '../components/Claim/ClaimModal';
import Loading from '../components/States/Loading';
import Empty from '../components/States/Empty';
import ErrorState from '../components/States/Error';

import styles from './GiveawayPage.module.css';

export default function GiveawayPage() {
  const { giveaway, prizes, giveawayStatus, isLoading, error, joinGiveaway, refresh } = useGiveaway();
  const { user, isLoggedIn, loginAs } = useAuth();
  const { sliderMessages, previousWinners, currentWinners } = useWinners(giveawayStatus);
  const { isOpen: isClaimOpen, openClaim, closeClaim, submitClaim, isSubmitting, claimError } = useClaim();

  // Selected Prize for dedicated detail view (Spec Section 79 & 103)
  const [selectedPrize, setSelectedPrize] = useState(null);

  // Smooth scroll
  const handleScrollToPrizes = () => {
    const el = document.getElementById('giveaway-prizes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToRules = () => {
    setSelectedPrize(null);
    setTimeout(() => {
      const el = document.getElementById('giveaway-rules');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleScrollToFaq = () => {
    setSelectedPrize(null);
    setTimeout(() => {
      const el = document.getElementById('giveaway-faq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <Navbar onLoginClick={() => loginAs('ELIGIBLE_USER')} />
        <ErrorState onRetry={refresh} />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Recent Winners Announcement Ticker */}
      <WinnerSlider items={sliderMessages} />

      {/* Top Navigation Bar with Balances */}
      <Navbar
        isDetailPage={Boolean(selectedPrize)}
        onBackToHome={() => setSelectedPrize(null)}
        onLoginClick={() => loginAs('ELIGIBLE_USER')}
      />

      <main className={styles.mainContent}>
        {/* If user is inspecting an Individual Giveaway Details Page (Spec Section 79 & 103) */}
        {selectedPrize ? (
          <PrizeDetailView
            prize={selectedPrize}
            giveaway={giveaway}
            giveawayStatus={giveawayStatus}
            onBack={() => setSelectedPrize(null)}
            onJoinSuccess={joinGiveaway}
            onLoginClick={() => loginAs('ELIGIBLE_USER')}
          />
        ) : (
          /* Main Complete Giveaway Page - Precise Recreation of Image 2 */
          <div className={styles.dashboardWrapper}>
            {/* Winner Notification Banner if logged-in user won (Spec Section 26) */}
            {user?.wonPrize && (
              <WinnerBanner
                wonPrize={user.wonPrize}
                onClaimClick={openClaim}
              />
            )}

            {/* Section 2: Hero Section matching Image 2 */}
            <Hero />

            {/* Section 3: Full-width Horizontal Statistics Banner matching Image 2 */}
            <GiveawayStats giveaway={giveaway} />

            {/* Section 4: Main Content Layout - 2-Column CSS Grid (72% Left / 28% Right) */}
            <div className={styles.mainContentGrid}>
              {/* Left Column: Featured Giveaways (4 Cards in one row) */}
              <PrizeCards
                prizes={prizes}
                onSelectPrize={(prize) => setSelectedPrize(prize)}
                onViewAll={handleScrollToRules}
              />

              {/* Right Column: How to Participate? Vertical Sidebar Card */}
              <HowToParticipate onRulesClick={handleScrollToRules} />
            </div>

            {/* Section 5: Trust and Benefits Section */}
            <TrustSection />

            {/* User Active Entries & Participation Tracker */}
            <EntryDisplay
              onEarnMore={() => alert("Complete daily check-in tasks or invite friends to earn more entries!")}
              onLoginClick={() => loginAs('ELIGIBLE_USER')}
            />

            {/* Exclusive Giveaway Rewards Banner Card (Image 1 reference) */}
            <GiveawayBanner onEnterGiveaway={handleScrollToPrizes} />

            {/* Winners & Previous Winners Showcase (Spec Section 21 & 22) */}
            <WinnersSection
              giveawayStatus={giveawayStatus}
              currentWinners={currentWinners}
              previousWinners={previousWinners}
            />

            {/* Official Rules & Guidelines Accordion (Spec Section 44) */}
            <Rules />

            {/* Interactive FAQ (Spec Section 45) */}
            <FAQ />
          </div>
        )}
      </main>

      {/* Footer (Spec Section 101) */}
      <Footer
        onHomeClick={() => setSelectedPrize(null)}
        onRulesClick={handleScrollToRules}
        onFaqClick={handleScrollToFaq}
      />

      {/* Winner Prize Claim Modal (Spec Section 28-31) */}
      <ClaimModal
        isOpen={isClaimOpen}
        onClose={closeClaim}
        wonPrize={user?.wonPrize}
        onSubmit={submitClaim}
        isSubmitting={isSubmitting}
        claimError={claimError}
      />

      {/* Floating State Simulator (Spec Section 54-59 & 69-70) */}
      <DevStateSwitcher />
    </div>
  );
}
