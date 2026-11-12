-- VELOOP Rewards Giveaway Platform - Initial Schema Migration
-- Migration: 20261102_init_giveaway_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & WALLET BALANCES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE, -- linked to Supabase auth.users if available
    display_name TEXT NOT NULL,
    masked_id TEXT NOT NULL, -- e.g. 'VE****82'
    email TEXT NOT NULL,
    phone TEXT,
    ve_balance INTEGER NOT NULL DEFAULT 500 CHECK (ve_balance >= 0),
    sve_balance INTEGER NOT NULL DEFAULT 1200 CHECK (sve_balance >= 0),
    token_balance INTEGER NOT NULL DEFAULT 5000 CHECK (token_balance >= 0),
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. GIVEAWAYS TABLE (Lifecycle: UPCOMING -> ACTIVE -> ENDED -> ARCHIVED)
CREATE TABLE IF NOT EXISTS public.giveaways (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('UPCOMING', 'ACTIVE', 'ENDED', 'ARCHIVED')),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    total_participants INTEGER NOT NULL DEFAULT 0,
    banner_image TEXT,
    rules JSONB DEFAULT '[]'::jsonb,
    terms_and_conditions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRIZES TABLE
CREATE TABLE IF NOT EXISTS public.prizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    position INTEGER NOT NULL, -- 1 = 1st Prize, 2 = 2nd Prize, etc.
    badge_label TEXT DEFAULT 'EXCLUSIVE GIVEAWAY',
    type TEXT NOT NULL CHECK (type IN ('PHYSICAL', 'GIFT_CARD', 'DIGITAL')),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    entry_fee INTEGER NOT NULL,
    entry_currency TEXT NOT NULL CHECK (entry_currency IN ('VE', 'SVE', 'TOKEN')),
    winner_count INTEGER NOT NULL DEFAULT 1,
    value_display TEXT,
    claim_deadline_days INTEGER NOT NULL DEFAULT 7,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. GIVEAWAY PARTICIPATIONS
-- Enforces the business rule: One user = one participation per giveaway event
CREATE TABLE IF NOT EXISTS public.giveaway_participations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
    prize_id UUID NOT NULL REFERENCES public.prizes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    entry_currency TEXT NOT NULL,
    entry_amount INTEGER NOT NULL,
    device_hash TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'FLAGGED', 'CANCELLED')),
    transaction_id UUID,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_giveaway_event UNIQUE (user_id, giveaway_id)
);

-- 5. GIVEAWAY TRANSACTIONS (Financial Audit Trail)
CREATE TABLE IF NOT EXISTS public.giveaway_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
    prize_id UUID NOT NULL REFERENCES public.prizes(id) ON DELETE CASCADE,
    currency TEXT NOT NULL,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL DEFAULT 'ENTRY_FEE' CHECK (type IN ('ENTRY_FEE', 'REVERSAL')),
    status TEXT NOT NULL DEFAULT 'SUCCESS' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REVERSED')),
    balance_before INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. GIVEAWAY WINNERS
CREATE TABLE IF NOT EXISTS public.giveaway_winners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
    prize_id UUID NOT NULL REFERENCES public.prizes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    masked_display TEXT NOT NULL,
    selection_method TEXT DEFAULT 'AUTOMATED_RANDOM',
    status TEXT NOT NULL DEFAULT 'SELECTED' CHECK (status IN ('SELECTED', 'CLAIMED', 'EXPIRED')),
    selected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    claim_deadline TIMESTAMPTZ NOT NULL,
    CONSTRAINT unique_winner_prize_user UNIQUE (giveaway_id, prize_id, user_id)
);

-- 7. PRIZE CLAIMS (Protected fulfillment submission)
CREATE TABLE IF NOT EXISTS public.prize_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    winner_id UUID UNIQUE NOT NULL REFERENCES public.giveaway_winners(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    prize_id UUID NOT NULL REFERENCES public.prizes(id) ON DELETE CASCADE,
    prize_type TEXT NOT NULL CHECK (prize_type IN ('PHYSICAL', 'GIFT_CARD', 'DIGITAL')),
    full_name TEXT,
    phone_number TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pin_code TEXT,
    email_address TEXT,
    claim_status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (claim_status IN ('SUBMITTED', 'PROCESSING', 'COMPLETED', 'EXPIRED')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    notes TEXT
);

-- 8. FRAUD EVENTS
CREATE TABLE IF NOT EXISTS public.fraud_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id),
    giveaway_id UUID REFERENCES public.giveaways(id),
    device_hash TEXT,
    ip_address TEXT,
    risk_score INTEGER NOT NULL,
    reason TEXT NOT NULL,
    signals JSONB,
    action TEXT NOT NULL CHECK (action IN ('LOGGED', 'FLAGGED', 'BLOCKED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    giveaway_id UUID REFERENCES public.giveaways(id),
    amount INTEGER,
    currency TEXT,
    result TEXT NOT NULL,
    request_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ATOMIC JOIN GIVEAWAY FUNCTION (RPC)
CREATE OR REPLACE FUNCTION join_giveaway(
    p_giveaway_id UUID,
    p_prize_id UUID,
    p_user_id UUID,
    p_idempotency_key TEXT,
    p_device_hash TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_giveaway RECORD;
    v_prize RECORD;
    v_profile RECORD;
    v_existing_tx RECORD;
    v_balance_before INT;
    v_balance_after INT;
    v_tx_id UUID;
    v_participation_id UUID;
BEGIN
    -- 1. Idempotency Check
    IF p_idempotency_key IS NOT NULL THEN
        SELECT * INTO v_existing_tx FROM public.giveaway_transactions WHERE idempotency_key = p_idempotency_key;
        IF FOUND THEN
            RETURN jsonb_build_object('success', true, 'message', 'Request already processed', 'idempotent', true);
        END IF;
    END IF;

    -- 2. Validate Giveaway
    SELECT * INTO v_giveaway FROM public.giveaways WHERE id = p_giveaway_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'GIVEAWAY_NOT_FOUND';
    END IF;
    IF v_giveaway.status <> 'ACTIVE' THEN
        RAISE EXCEPTION 'GIVEAWAY_NOT_ACTIVE';
    END IF;
    IF NOW() < v_giveaway.start_at OR NOW() > v_giveaway.end_at THEN
        RAISE EXCEPTION 'GIVEAWAY_ENDED';
    END IF;

    -- 3. Check Duplicate Participation (Database-level guard)
    IF EXISTS (
        SELECT 1 FROM public.giveaway_participations 
        WHERE user_id = p_user_id AND giveaway_id = p_giveaway_id
    ) THEN
        RAISE EXCEPTION 'ALREADY_PARTICIPATING';
    END IF;

    -- 4. Validate Prize
    SELECT * INTO v_prize FROM public.prizes WHERE id = p_prize_id AND giveaway_id = p_giveaway_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'PRIZE_NOT_FOUND';
    END IF;

    -- 5. Lock User Profile for Atomic Balance Deduction
    SELECT * INTO v_profile FROM public.profiles WHERE id = p_user_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'USER_NOT_FOUND';
    END IF;

    -- 6. Check and Deduct Required Currency
    IF v_prize.entry_currency = 'VE' THEN
        v_balance_before := v_profile.ve_balance;
        IF v_balance_before < v_prize.entry_fee THEN
            RAISE EXCEPTION 'INSUFFICIENT_VE_BALANCE';
        END IF;
        v_balance_after := v_balance_before - v_prize.entry_fee;
        UPDATE public.profiles SET ve_balance = v_balance_after, updated_at = NOW() WHERE id = p_user_id;
    ELSIF v_prize.entry_currency = 'SVE' THEN
        v_balance_before := v_profile.sve_balance;
        IF v_balance_before < v_prize.entry_fee THEN
            RAISE EXCEPTION 'INSUFFICIENT_SVE_BALANCE';
        END IF;
        v_balance_after := v_balance_before - v_prize.entry_fee;
        UPDATE public.profiles SET sve_balance = v_balance_after, updated_at = NOW() WHERE id = p_user_id;
    ELSIF v_prize.entry_currency = 'TOKEN' THEN
        v_balance_before := v_profile.token_balance;
        IF v_balance_before < v_prize.entry_fee THEN
            RAISE EXCEPTION 'INSUFFICIENT_TOKEN_BALANCE';
        END IF;
        v_balance_after := v_balance_before - v_prize.entry_fee;
        UPDATE public.profiles SET token_balance = v_balance_after, updated_at = NOW() WHERE id = p_user_id;
    ELSE
        RAISE EXCEPTION 'INVALID_CURRENCY';
    END IF;

    -- 7. Record Transaction
    INSERT INTO public.giveaway_transactions (
        user_id, giveaway_id, prize_id, currency, amount, type, status,
        balance_before, balance_after, idempotency_key
    ) VALUES (
        p_user_id, p_giveaway_id, p_prize_id, v_prize.entry_currency, v_prize.entry_fee,
        'ENTRY_FEE', 'SUCCESS', v_balance_before, v_balance_after, p_idempotency_key
    ) RETURNING id INTO v_tx_id;

    -- 8. Record Participation
    INSERT INTO public.giveaway_participations (
        giveaway_id, prize_id, user_id, entry_currency, entry_amount,
        device_hash, status, transaction_id
    ) VALUES (
        p_giveaway_id, p_prize_id, p_user_id, v_prize.entry_currency, v_prize.entry_fee,
        p_device_hash, 'CONFIRMED', v_tx_id
    ) RETURNING id INTO v_participation_id;

    -- 9. Update Participant Count
    UPDATE public.giveaways SET total_participants = total_participants + 1 WHERE id = p_giveaway_id;

    -- 10. Audit Log
    INSERT INTO public.audit_logs (user_id, action, giveaway_id, amount, currency, result)
    VALUES (p_user_id, 'JOIN_GIVEAWAY', p_giveaway_id, v_prize.entry_fee, v_prize.entry_currency, 'SUCCESS');

    RETURN jsonb_build_object(
        'success', true,
        'participation_id', v_participation_id,
        'transaction_id', v_tx_id,
        'new_balance', v_balance_after,
        'currency', v_prize.entry_currency
    );
END;
$$;

-- ATOMIC PRIZE CLAIM FUNCTION (RPC)
CREATE OR REPLACE FUNCTION claim_prize(
    p_winner_id UUID,
    p_user_id UUID,
    p_full_name TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_address TEXT DEFAULT NULL,
    p_city TEXT DEFAULT NULL,
    p_state TEXT DEFAULT NULL,
    p_pin_code TEXT DEFAULT NULL,
    p_email TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_winner RECORD;
    v_prize RECORD;
    v_claim_id UUID;
BEGIN
    SELECT * INTO v_winner FROM public.giveaway_winners WHERE id = p_winner_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'WINNER_RECORD_NOT_FOUND';
    END IF;
    IF v_winner.user_id <> p_user_id THEN
        RAISE EXCEPTION 'UNAUTHORIZED_CLAIM';
    END IF;
    IF NOW() > v_winner.claim_deadline THEN
        UPDATE public.giveaway_winners SET status = 'EXPIRED' WHERE id = p_winner_id;
        RAISE EXCEPTION 'CLAIM_WINDOW_EXPIRED';
    END IF;

    SELECT * INTO v_prize FROM public.prizes WHERE id = v_winner.prize_id;

    -- Validate fields based on prize type
    IF v_prize.type = 'PHYSICAL' THEN
        IF p_full_name IS NULL OR p_phone IS NULL OR p_address IS NULL OR p_city IS NULL OR p_state IS NULL OR p_pin_code IS NULL THEN
            RAISE EXCEPTION 'MISSING_PHYSICAL_CLAIM_DETAILS';
        END IF;
    ELSIF v_prize.type = 'GIFT_CARD' THEN
        IF p_email IS NULL THEN
            RAISE EXCEPTION 'MISSING_EMAIL_ADDRESS';
        END IF;
    END IF;

    INSERT INTO public.prize_claims (
        winner_id, user_id, prize_id, prize_type,
        full_name, phone_number, address, city, state, pin_code, email_address,
        claim_status
    ) VALUES (
        p_winner_id, p_user_id, v_winner.prize_id, v_prize.type,
        p_full_name, p_phone, p_address, p_city, p_state, p_pin_code, p_email,
        'SUBMITTED'
    ) RETURNING id INTO v_claim_id;

    UPDATE public.giveaway_winners SET status = 'CLAIMED' WHERE id = p_winner_id;

    INSERT INTO public.audit_logs (user_id, action, giveaway_id, result)
    VALUES (p_user_id, 'CLAIM_SUBMITTED', v_winner.giveaway_id, 'SUCCESS');

    RETURN jsonb_build_object('success', true, 'claim_id', v_claim_id, 'status', 'SUBMITTED');
END;
$$;
