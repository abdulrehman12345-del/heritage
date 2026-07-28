/// <reference types="vite/client" />
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env?.VITE_SUPABASE_URL as string) ||
  (import.meta.env?.NEXT_PUBLIC_SUPABASE_URL as string) ||
  'https://dcvgsgxfmetfqfzrvfbe.supabase.co';

const supabaseKey =
  (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  (import.meta.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ||
  'sb_publishable_b4XyfPPiW7T3JAff-7e2ag_PttQuiYF';

export const createServerClient = () => createSupabaseClient(supabaseUrl, supabaseKey);
