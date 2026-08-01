-- =======================================================
-- HERITAGE ANTIQUES - SUPABASE DATABASE SCHEMA (SQL)
-- Execute this SQL in your Supabase Dashboard -> SQL Editor
-- =======================================================

-- 1. PROFILES TABLE (Stores registered user profiles & addresses)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'United Kingdom',
    postal_code TEXT,
    role TEXT DEFAULT 'Customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Profiles Insert & Select" ON public.profiles FOR ALL USING (true);

-- 2. INQUIRIES TABLE (Stores private acquisition requests)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collector_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    artifact_title TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Inquiries Insert & Select" ON public.inquiries FOR ALL USING (true);

-- 3. SAVED SHORTLIST TABLE (Stores collector saved artifacts)
CREATE TABLE IF NOT EXISTS public.saved_shortlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    artifact_id TEXT NOT NULL,
    artifact_title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Saved Shortlist
ALTER TABLE public.saved_shortlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Shortlist Operations" ON public.saved_shortlist FOR ALL USING (true);

-- 4. ORDERS TABLE (Stores purchases and escrow orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    customer_email TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    shipping_address TEXT,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Orders Insert & Select" ON public.orders FOR ALL USING (true);

-- 5. PRODUCTS / ARTIFACTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    era TEXT NOT NULL,
    origin TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    description TEXT,
    certificate_number TEXT,
    stock INTEGER DEFAULT 1,
    status TEXT DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Products Read" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow Admin Products Insert & Update" ON public.products FOR ALL USING (true);
