-- Fix for Sushi Fest Locale Deletion
-- Run this script in the Supabase SQL Editor to allow deleting restaurants
-- even if they have votes or reviews.

-- 1. Drop existing constraints
ALTER TABLE ratings DROP CONSTRAINT IF EXISTS ratings_locale_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_locale_id_fkey;
ALTER TABLE coupons DROP CONSTRAINT IF EXISTS coupons_redeemed_at_locale_fkey;

-- 2. Re-add with CASCADE to allow automatic deletion of related data
ALTER TABLE ratings 
ADD CONSTRAINT ratings_locale_id_fkey 
FOREIGN KEY (locale_id) REFERENCES locales(id) ON DELETE CASCADE;

ALTER TABLE votes 
ADD CONSTRAINT votes_locale_id_fkey 
FOREIGN KEY (locale_id) REFERENCES locales(id) ON DELETE CASCADE;

-- 3. For coupons, we NULL the reference so we don't lose the coupon record
ALTER TABLE coupons 
ADD CONSTRAINT coupons_redeemed_at_locale_fkey 
FOREIGN KEY (redeemed_at_locale) REFERENCES locales(id) ON DELETE SET NULL;
