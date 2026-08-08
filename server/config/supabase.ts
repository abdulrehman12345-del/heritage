import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://dcvgsgxfmetfqfzrvfbe.supabase.co';

const supabaseKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_b4XyfPPiW7T3JAff-7e2ag_PttQuiYF';

export const supabaseServer = createClient(supabaseUrl, supabaseKey);
