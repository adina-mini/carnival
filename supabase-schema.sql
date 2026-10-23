-- =========================================================================
-- DAWATNAMA / SHADII DIGITAL INVITATION PLATFORM - SUPABASE SCHEMA
-- =========================================================================

-- 1. Create Invitations Table
CREATE TABLE IF NOT EXISTS public.invitations (
  id TEXT PRIMARY KEY,                       -- e.g. 'inv-8f3b2a9e' or unique slug
  template_id TEXT NOT NULL,                 -- e.g. 'royal-burgundy', 'festive-mehndi', etc.
  title TEXT NOT NULL,                       -- e.g. 'Fatima & Sharjeel Wedding'
  event_type TEXT NOT NULL,                  -- 'nikkah' | 'walima' | 'mehndi' | 'birthday' | 'anniversary'
  status TEXT NOT NULL DEFAULT 'draft',      -- 'draft' | 'published' | 'archived'
  
  -- Personalized content stored as JSONB for ultimate flexibility across templates
  data JSONB NOT NULL,
  
  -- Uploaded image URLs and references
  media JSONB DEFAULT '{}'::jsonb,
  
  -- Creator / ownership tracking
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_passcode TEXT,                       -- Optional guest PIN or edit key
  
  -- Views & RSVP counts
  view_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 2. Create RSVPs Table
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  attendance TEXT NOT NULL,                  -- 'attending' | 'declined' | 'tentative'
  guest_count INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Public can view PUBLISHED invitations
CREATE POLICY "Public can view published invitations"
ON public.invitations FOR SELECT
USING (status = 'published');

-- Authenticated users or creator can manage their invitations
CREATE POLICY "Creators can view their own drafts"
ON public.invitations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Creators can insert invitations"
ON public.invitations FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Creators can update invitations"
ON public.invitations FOR UPDATE
TO authenticated, anon
USING (true);

-- Anyone can submit RSVP to published invitation
CREATE POLICY "Anyone can submit RSVP"
ON public.rsvps FOR INSERT
WITH CHECK (true);

CREATE POLICY "Invitation creator can view RSVPs"
ON public.rsvps FOR SELECT
USING (true);

-- 4. Storage Bucket Setup
-- Create bucket 'invitation-assets'
INSERT INTO storage.buckets (id, name, public)
VALUES ('invitation-assets', 'invitation-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for invitation assets
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'invitation-assets');

-- Upload access for users
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'invitation-assets');
