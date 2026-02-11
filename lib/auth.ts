/**
 * Clerk Authentication Helpers
 * 
 * Reusable pattern for Clerk + Next.js auth
 * Copy this file to new projects for consistent auth handling
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/**
 * Get the current user's ID (throws if not authenticated)
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return userId;
}

/**
 * Get the current user object (throws if not authenticated)
 */
export async function requireUser() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return user;
}

/**
 * Get the current user ID (returns null if not authenticated)
 */
export async function getOptionalAuth() {
  const { userId } = await auth();
  return userId;
}

/**
 * Get the current user object (returns null if not authenticated)
 */
export async function getOptionalUser() {
  const user = await currentUser();
  return user;
}
