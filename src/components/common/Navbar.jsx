import React from 'react';
import { Gift, Wallet, ArrowLeft, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar({ onBackToHome, isDetailPage = false, onLoginClick }) {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand or Back Button */}
        <div className={styles.brandGroup}>
          {isDetailPage ? (
            <button type="button" className={styles.backBtn} onClick={onBackToHome}>
              <ArrowLeft size={18} />
              <span>Giveaway Home</span>
            </button>
          ) : (
            <div className={styles.brand}>
              <div className={styles.logoCircle}>
                <Gift size={20} className={styles.logoIcon} />
              </div>
              <div>
                <span className={styles.brandName}>VELOOP</span>
                <span className={styles.brandBadge}>REWARDS</span>
              </div>
            </div>
          )}
        </div>

        {/* User Balance Pills & Profile */}
        <div className={styles.userSection}>
          {isLoggedIn ? (
            <>
              {/* Balances */}
              <div className={styles.balancesContainer}>
                <div className={`${styles.balancePill} ${styles.vePill}`} title="VELOOP Energies (VEs)">
                  <span className={styles.pillLabel}>VE:</span>
                  <span className={styles.pillValue}>{user?.veBalance?.toLocaleString() || 0}</span>
                </div>
                <div className={`${styles.balancePill} ${styles.svePill}`} title="Special VEs (SVEs)">
                  <span className={styles.pillLabel}>SVE:</span>
                  <span className={styles.pillValue}>{user?.sveBalance?.toLocaleString() || 0}</span>
                </div>
                <div className={`${styles.balancePill} ${styles.tokenPill}`} title="Reward Tokens">
                  <span className={styles.pillLabel}>Tokens:</span>
                  <span className={styles.pillValue}>{user?.tokenBalance?.toLocaleString() || 0}</span>
                </div>
              </div>

              {/* Profile Chip */}
              <div className={styles.profileChip}>
                <div className={styles.userAvatar}>
                  {user?.displayName ? user.displayName[0] : 'U'}
                </div>
                <span className={styles.userName}>{user?.maskedId || user?.displayName}</span>
                <button type="button" className={styles.logoutBtn} onClick={logout} title="Sign Out">
                  <LogOut size={15} />
                </button>
              </div>
            </>
          ) : (
            <button type="button" className={styles.loginBtn} onClick={onLoginClick}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
