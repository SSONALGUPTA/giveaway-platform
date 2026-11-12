-- VELOOP Rewards: Enable RLS Policies and Grant Permissions
-- Migration: 20261112_enable_rls_policies.sql

-- 1. Giveaways - Public Read Access
ALTER TABLE public.giveaways ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view giveaways" ON public.giveaways;
CREATE POLICY "Public can view giveaways" ON public.giveaways FOR SELECT USING (true);

-- 2. Prizes - Public Read Access
ALTER TABLE public.prizes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view prizes" ON public.prizes;
CREATE POLICY "Public can view prizes" ON public.prizes FOR SELECT USING (true);

-- 3. Profiles - Public Read/Write for demo testing
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can update profiles" ON public.profiles;
CREATE POLICY "Public can update profiles" ON public.profiles FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public can insert profiles" ON public.profiles;
CREATE POLICY "Public can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- 4. Giveaway Winners - Public Read Access
ALTER TABLE public.giveaway_winners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view winners" ON public.giveaway_winners;
CREATE POLICY "Public can view winners" ON public.giveaway_winners FOR SELECT USING (true);

-- 5. Participations & Transactions
ALTER TABLE public.giveaway_participations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view participations" ON public.giveaway_participations;
CREATE POLICY "Public can view participations" ON public.giveaway_participations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can insert participations" ON public.giveaway_participations;
CREATE POLICY "Public can insert participations" ON public.giveaway_participations FOR INSERT WITH CHECK (true);

ALTER TABLE public.giveaway_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view transactions" ON public.giveaway_transactions;
CREATE POLICY "Public can view transactions" ON public.giveaway_transactions FOR SELECT USING (true);

ALTER TABLE public.prize_claims ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view claims" ON public.prize_claims;
CREATE POLICY "Public can view claims" ON public.prize_claims FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can insert claims" ON public.prize_claims;
CREATE POLICY "Public can insert claims" ON public.prize_claims FOR INSERT WITH CHECK (true);

-- 6. Grant Permissions to anon and authenticated roles for RPC Functions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.join_giveaway TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_prize TO anon, authenticated, service_role;

