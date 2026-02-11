"use server";

import { requireAuth } from '@/lib/auth';
import { getUserClient, type Generation } from '@/lib/db';

export async function createGeneration(data: {
  premise: string;
  style: string;
  musicVibe: string;
  provider: string;
  duration: number;
}) {
  const userId = await requireAuth();
  const { client } = getUserClient(userId);
  
  const generation: Generation = {
    user_id: userId,
    premise: data.premise,
    style: data.style,
    music_vibe: data.musicVibe,
    provider: data.provider,
    duration: data.duration,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const { data: result, error } = await client
    .from('generations')
    .insert(generation)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating generation:', error);
    throw new Error('Failed to create generation');
  }
  
  // TODO: Trigger actual video generation process
  // For now, this is a placeholder that just creates the database record
  
  return result;
}

export async function getGeneration(id: string) {
  const userId = await requireAuth();
  const { client } = getUserClient(userId);
  
  const { data, error } = await client
    .from('generations')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching generation:', error);
    throw new Error('Generation not found');
  }
  
  return data;
}

export async function getUserGenerations() {
  const userId = await requireAuth();
  const { client } = getUserClient(userId);
  
  const { data, error } = await client
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching generations:', error);
    throw new Error('Failed to fetch generations');
  }
  
  return data;
}
