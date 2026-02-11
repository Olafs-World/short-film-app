/**
 * API Key Encryption/Decryption
 * 
 * Reusable pattern for securely storing user API keys
 * Uses AES-256-GCM encryption with a master key from env
 * Copy this file to new projects that need to store sensitive credentials
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { getUserClient, type UserApiKeys } from './db';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Get the encryption key from environment (must be 32 bytes)
 */
function getEncryptionKey(): Buffer {
  const secret = process.env.API_KEY_ENCRYPTION_SECRET;
  
  if (!secret) {
    throw new Error('API_KEY_ENCRYPTION_SECRET not set');
  }
  
  // Hash the secret to ensure it's exactly 32 bytes
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypt a plaintext API key
 */
export function encryptApiKey(plaintext: string): string {
  if (!plaintext) return '';
  
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Format: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt an encrypted API key
 */
export function decryptApiKey(encrypted: string): string {
  if (!encrypted) return '';
  
  const parts = encrypted.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format');
  }
  
  const [ivHex, authTagHex, encryptedData] = parts;
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Store encrypted API keys for a user
 */
export async function storeApiKeys(
  userId: string,
  keys: {
    openaiKey?: string;
    geminiKey?: string;
  }
): Promise<void> {
  const { client } = getUserClient(userId);
  
  const encryptedData: Partial<UserApiKeys> = {
    user_id: userId,
    updated_at: new Date().toISOString(),
  };
  
  if (keys.openaiKey !== undefined) {
    encryptedData.openai_key = keys.openaiKey ? encryptApiKey(keys.openaiKey) : null;
  }
  
  if (keys.geminiKey !== undefined) {
    encryptedData.gemini_key = keys.geminiKey ? encryptApiKey(keys.geminiKey) : null;
  }
  
  // Upsert: update if exists, insert if not
  const { error } = await client
    .from('user_api_keys')
    .upsert(encryptedData, {
      onConflict: 'user_id',
    });
  
  if (error) {
    console.error('Error storing API keys:', error);
    throw new Error('Failed to store API keys');
  }
}

/**
 * Retrieve and decrypt API keys for a user
 */
export async function getApiKeys(userId: string): Promise<{
  openaiKey: string | null;
  geminiKey: string | null;
}> {
  const { client } = getUserClient(userId);
  
  const { data, error } = await client
    .from('user_api_keys')
    .select('openai_key, gemini_key')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    // User hasn't stored keys yet
    if (error.code === 'PGRST116') {
      return { openaiKey: null, geminiKey: null };
    }
    console.error('Error fetching API keys:', error);
    throw new Error('Failed to fetch API keys');
  }
  
  return {
    openaiKey: data.openai_key ? decryptApiKey(data.openai_key) : null,
    geminiKey: data.gemini_key ? decryptApiKey(data.gemini_key) : null,
  };
}

/**
 * Delete all API keys for a user
 */
export async function deleteApiKeys(userId: string): Promise<void> {
  const { client } = getUserClient(userId);
  
  const { error } = await client
    .from('user_api_keys')
    .delete()
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error deleting API keys:', error);
    throw new Error('Failed to delete API keys');
  }
}
