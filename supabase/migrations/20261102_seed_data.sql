-- VELOOP Rewards Seed Data Migration
-- Migration: 20261102_seed_data.sql

-- 1. Insert Initial Profiles (Demo users for testing all states)
INSERT INTO public.profiles (id, display_name, masked_id, email, ve_balance, sve_balance, token_balance, role)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'Rahul Sharma', 'VE****25', 'rahul@example.com', 850, 1200, 5000, 'user'),
    ('a0000000-0000-0000-0000-000000000002', 'Priya Patel', 'VE****42', 'priya@example.com', 120, 300, 1000, 'user'), -- Insufficient VE balance user
    ('a0000000-0000-0000-0000-000000000003', 'Aman Verma', 'VE****82', 'aman@example.com', 600, 800, 2500, 'user'),   -- Winner profile
    ('a0000000-0000-0000-0000-000000000004', 'Ananya Roy', 'VE****91', 'ananya@example.com', 400, 600, 1500, 'user'),
    ('a0000000-0000-0000-0000-000000000005', 'Admin VELOOP', 'VE****00', 'admin@veloop.com', 99999, 99999, 99999, 'admin')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Active Giveaway: Summer Rewards Giveaway
INSERT INTO public.giveaways (id, slug, title, subtitle, description, status, start_at, end_at, total_participants)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'summer-rewards-2026',
    'Summer Rewards Giveaway',
    'EXCLUSIVE GIVEAWAYS',
    'Complete eligible activities, collect entries and get a chance to win premium devices and shopping vouchers.',
    'ACTIVE',
    NOW() - INTERVAL '3 days',
    NOW() + INTERVAL '12 days 8 hours 45 minutes',
    8542
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Previous Completed Giveaway
INSERT INTO public.giveaways (id, slug, title, subtitle, description, status, start_at, end_at, total_participants)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'august-reward-rush-2026',
    'August Reward Rush',
    'PREVIOUS GIVEAWAY',
    'Completed grand giveaway with 10 lucky winners across India.',
    'ENDED',
    NOW() - INTERVAL '35 days',
    NOW() - INTERVAL '5 days',
    14200
) ON CONFLICT (id) DO NOTHING;

-- 4. Insert Prizes for the Active Giveaway (per Specification Section 12, 20, 85)
INSERT INTO public.prizes (id, giveaway_id, slug, name, position, badge_label, type, description, image_url, entry_fee, entry_currency, winner_count, value_display, claim_deadline_days)
VALUES 
    (
        'c0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000001',
        'iphone-15-pro',
        'iPhone 15 Pro 128GB',
        1,
        '1ST PRIZE • GRAND REWARD',
        'PHYSICAL',
        'Titanium design with A17 Pro chip and next-generation Pro camera system. 1 Lucky Winner.',
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
        250,
        'VE',
        1,
        '₹1,34,900',
        7
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000001',
        'apple-watch',
        'Apple Watch Series 9 GPS',
        2,
        '2ND PRIZE • 3 WINNERS',
        'PHYSICAL',
        'Powerful S9 SiP with Double Tap gesture and bright Always-On Retina display.',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
        200,
        'VE',
        3,
        '₹41,900',
        7
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000001',
        'airpods',
        'AirPods Pro (2nd Gen) USB-C',
        3,
        '3RD PRIZE • 5 WINNERS',
        'PHYSICAL',
        'Pro-level Active Noise Cancellation and Adaptive Audio for exceptional sound.',
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
        500,
        'SVE',
        5,
        '₹24,900',
        7
    ),
    (
        'c0000000-0000-0000-0000-000000000004',
        'b0000000-0000-0000-0000-000000000001',
        'amazon-2000',
        '₹2,000 Amazon Gift Voucher',
        4,
        'LUCKY DRAW • 10 WINNERS',
        'GIFT_CARD',
        'Instant digital gift card delivered directly to your verified email address.',
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
        500,
        'VE',
        10,
        '₹2,000',
        14
    ),
    (
        'c0000000-0000-0000-0000-000000000005',
        'b0000000-0000-0000-0000-000000000001',
        'amazon-500',
        '₹500 Amazon Gift Voucher',
        5,
        'LUCKY DRAW • 15 WINNERS',
        'GIFT_CARD',
        'Shop millions of items on Amazon India with an instant gift voucher code.',
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        300,
        'VE',
        15,
        '₹500',
        14
    ),
    (
        'c0000000-0000-0000-0000-000000000006',
        'b0000000-0000-0000-0000-000000000001',
        'amazon-20',
        '₹20 Quick Reward Voucher',
        6,
        'COMMUNITY DRAW • 50 WINNERS',
        'GIFT_CARD',
        'Low-cost participation for everyday reward tokens.',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        2000,
        'TOKEN',
        50,
        '₹20',
        14
    )
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Winners from Previous Completed Giveaway (for Previous Winners Tab & Slider)
INSERT INTO public.giveaway_winners (id, giveaway_id, prize_id, user_id, masked_display, selection_method, status, selected_at, claim_deadline)
VALUES 
    (
        'd0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000002',
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000003',
        'VE****82',
        'AUTOMATED_RANDOM',
        'CLAIMED',
        NOW() - INTERVAL '5 days',
        NOW() + INTERVAL '2 days'
    ),
    (
        'd0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000002',
        'c0000000-0000-0000-0000-000000000002',
        'a0000000-0000-0000-0000-000000000002',
        'VE****42',
        'AUTOMATED_RANDOM',
        'CLAIMED',
        NOW() - INTERVAL '5 days',
        NOW() + INTERVAL '2 days'
    ),
    (
        'd0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000002',
        'c0000000-0000-0000-0000-000000000003',
        'a0000000-0000-0000-0000-000000000004',
        'VE****91',
        'AUTOMATED_RANDOM',
        'CLAIMED',
        NOW() - INTERVAL '5 days',
        NOW() + INTERVAL '2 days'
    )
ON CONFLICT (id) DO NOTHING;
