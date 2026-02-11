"use server";

import { requireAuth } from '@/lib/auth';
import { storeApiKeys } from '@/lib/api-keys';

export async function saveApiKeys(keys: {
  openaiKey?: string;
  geminiKey?: string;
}) {
  const userId = await requireAuth();
  
  await storeApiKeys(userId, keys);
  
  return { success: true };
}
