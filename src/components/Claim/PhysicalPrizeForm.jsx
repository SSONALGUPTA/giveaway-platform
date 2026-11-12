import React from 'react';
import { User, Phone, MapPin, Building, Navigation, Hash } from 'lucide-react';
import styles from './Claim.module.css';

export default function PhysicalPrizeForm({ formData, onChange, disabled }) {
  return (
    <div className={styles.formFields}>
      {/* Full Name */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="claim-fullName">Full Name</label>
        <div className={styles.inputWrapper}>
          <User size={16} className={styles.inputIcon} />
          <input
            id="claim-fullName"
            type="text"
            className={styles.input}
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName || ''}
            onChange={(e) => onChange('fullName', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="claim-phone">Contact Phone Number</label>
        <div className={styles.inputWrapper}>
          <Phone size={16} className={styles.inputIcon} />
          <input
            id="claim-phone"
            type="tel"
            className={styles.input}
            placeholder="+91 98765 43210"
            value={formData.phoneNumber || ''}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* Street Address */}
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="claim-address">Complete Delivery Address</label>
        <div className={styles.inputWrapper}>
          <MapPin size={16} className={styles.inputIcon} />
          <textarea
            id="claim-address"
            className={styles.textarea}
            rows={2}
            placeholder="Flat/House No., Building Name, Street/Locality"
            value={formData.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* City, State, PIN */}
      <div className="row g-2">
        <div className="col-5">
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="claim-city">City</label>
            <div className={styles.inputWrapper}>
              <Building size={14} className={styles.inputIcon} />
              <input
                id="claim-city"
                type="text"
                className={styles.input}
                placeholder="Mumbai"
                value={formData.city || ''}
                onChange={(e) => onChange('city', e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="claim-state">State</label>
            <div className={styles.inputWrapper}>
              <Navigation size={14} className={styles.inputIcon} />
              <input
                id="claim-state"
                type="text"
                className={styles.input}
                placeholder="Maharashtra"
                value={formData.state || ''}
                onChange={(e) => onChange('state', e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="claim-pin">PIN</label>
            <div className={styles.inputWrapper}>
              <Hash size={14} className={styles.inputIcon} />
              <input
                id="claim-pin"
                type="text"
                className={styles.input}
                placeholder="400001"
                maxLength={6}
                value={formData.pinCode || ''}
                onChange={(e) => onChange('pinCode', e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
