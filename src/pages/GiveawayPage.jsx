import React, { useState } from 'react';
import { useGiveaway } from '../hooks/useGiveaway';
import { useAuth } from '../hooks/useAuth';
import { useWinners } from '../hooks/useWinners';
import { useClaim } from '../hooks/useClaim';

// Core Components matching the visual references & specification
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DevStateSwitcher from '../components/common/DevStateSwitcher';

import Hero from '../components/Hero/Hero';
import GiveawayBanner from '../components/GiveawayBanner/GiveawayBanner';
import PrizeCards from '../components/PrizeCards/PrizeCards';
import HowToParticipate from '../components/HowToParticipate/HowToParticipate';
import TrustSection from '../components/TrustSection/TrustSection';

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
      {/* 1. Winner Slider Ticker (Social Proof ticker from Spec Section 18) */}
      <WinnerSlider items={sliderMessages} />

      {/* 2. Top Navigation Bar */}
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
          /* Main Complete Giveaway Page - Matching Image 2 and Image 1 Precisely */
          <div className="container py-3">
            {/* Winner Notification Banner if logged-in user won (Spec Section 26) */}
            {user?.wonPrize && (
              <WinnerBanner
                wonPrize={user.wonPrize}
                onClaimClick={openClaim}
              />
            )}

            {/* Top Giveaway Section Header & Stats (Image 2) */}
            <Hero
              giveaway={giveaway}
              status={giveawayStatus}
            />

            {/* User Active Entries Pill Bar */}
            <EntryDisplay
              onEarnMore={() => alert("Complete daily check-in tasks or invite friends to earn more entries!")}
              onLoginClick={() => loginAs('ELIGIBLE_USER')}
            />

            {/* Main 2-Column Section (Image 2: Featured Giveaways on Left, How to Participate on Right) */}
            <div className="row g-4 mb-4 align-items-stretch">
              {/* Left Column (Approx 73% width) */}
              <div className="col-lg-8">
                <PrizeCards
                  prizes={prizes}
                  onSelectPrize={(prize) => setSelectedPrize(prize)}
                />
              </div>

              {/* Right Column (Approx 27% width) */}
              <div className="col-lg-4">
                <HowToParticipate onRulesClick={handleScrollToRules} />
              </div>
            </div>

            {/* Bottom 4 Trust Cards Strip (Image 2) */}
            <TrustSection />

            {/* Exclusive Giveaway Rewards Banner Card (Image 1) */}
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
