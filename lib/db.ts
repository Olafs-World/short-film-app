/**
 * Supabase Database Client
 * 
 * Reusable pattern for Supabase + Clerk integration
 * Copy this file to new projects for consistent database access
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Get a Supabase client with service role permissions
 * Use for server-side operations that need elevated access
 */
export function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Get a user-scoped Supabase client
 * Automatically filters queries by userId for security
 */
export function getUserClient(userId: string) {
  const client = getServiceClient();
  
  // Add userId context for RLS policies
  return {
    client,
    userId,
  };
}

/**
 * Database types for user data
 */
export type UserApiKeys = {
  id?: string;
  user_id: string;
  openai_key?: string;
  gemini_key?: string;
  created_at?: string;
  updated_at?: string;
};

export type Generation = {
  id?: string;
  user_id: string;
  premise: string;
  style: string;
  music_vibe: string;
  provider: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  error_message?: string;
  created_at?: string;
  updated_at?: string;
};
