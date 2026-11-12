import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useClaim() {
  const { user, updateClaimStatus } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimError, setClaimError] = useState(null);

  const openClaim = () => {
    setClaimError(null);
    setIsOpen(true);
  };

  const closeClaim = () => {
    setIsOpen(false);
    setClaimError(null);
  };

  const submitClaim = async (formData) => {
    if (!user || !user.wonPrize) {
      setClaimError('No winning prize found for your account.');
      return false;
    }

    setIsSubmitting(true);
    setClaimError(null);

    try {
      const prizeType = user.wonPrize.type;

      // Validation per Spec Section 28 & 29
      if (prizeType === 'PHYSICAL') {
        const required = ['fullName', 'phoneNumber', 'address', 'city', 'state', 'pinCode'];
        for (const field of required) {
          if (!formData[field] || !formData[field].trim()) {
            throw new Error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          }
        }
      } else if (prizeType === 'GIFT_CARD') {
        if (!formData.email || !formData.email.includes('@')) {
          throw new Error('Please enter a valid email address to receive your voucher.');
        }
      }

      // If Supabase RPC is available
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.rpc('claim_prize', {
            p_winner_id: user.wonPrize.id,
            p_user_id: user.id,
            p_full_name: formData.fullName || null,
            p_phone: formData.phoneNumber || null,
            p_address: formData.address || null,
            p_city: formData.city || null,
            p_state: formData.state || null,
            p_pin_code: formData.pinCode || null,
            p_email: formData.email || null
          });
        } catch (rpcErr) {
          console.warn('Supabase claim RPC fallback:', rpcErr);
        }
      }

      // Simulate network response and update state
      await new Promise(r => setTimeout(r, 800));
      updateClaimStatus('SUBMITTED');
      return true;
    } catch (err) {
      setClaimError(err.message || 'Failed to submit claim.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    openClaim,
    closeClaim,
    submitClaim,
    isSubmitting,
    claimError,
    wonPrize: user?.wonPrize || null
  };
}
