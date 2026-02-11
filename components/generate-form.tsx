"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createGeneration } from '@/app/actions/generate';

interface GenerateFormProps {
  hasOpenAiKey: boolean;
  hasGeminiKey: boolean;
}

const STYLES = [
  'cinematic',
  'noir',
  'anime',
  'documentary',
  'scifi',
  'fantasy',
  'horror',
  'comedy',
];

const MUSIC_VIBES = [
  'epic',
  'suspenseful',
  'calm',
  'upbeat',
  'dark',
  'whimsical',
  'none',
];

export function GenerateForm({ hasOpenAiKey, hasGeminiKey }: GenerateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [premise, setPremise] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [musicVibe, setMusicVibe] = useState('epic');
  const [provider, setProvider] = useState(hasOpenAiKey ? 'openai' : 'gemini');
  const [duration, setDuration] = useState('30');
  
  const canGenerate = hasOpenAiKey || hasGeminiKey;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!premise.trim()) {
      alert('Please enter a premise for your film');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await createGeneration({
        premise: premise.trim(),
        style,
        musicVibe,
        provider,
        duration: parseInt(duration, 10),
      });
      
      // Redirect to the generation detail page
      router.push(`/generation/${result.id}`);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to start generation. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="premise">Premise</Label>
        <Textarea
          id="premise"
          placeholder="A detective discovers that reality is a simulation..."
          value={premise}
          onChange={(e) => setPremise(e.target.value)}
          rows={4}
          className="bg-zinc-800 border-zinc-700 resize-none"
          required
        />
        <p className="text-xs text-zinc-500">
          Describe your story idea in 1-3 sentences
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="style" className="bg-zinc-800 border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {STYLES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="music-vibe">Music Vibe</Label>
          <Select value={musicVibe} onValueChange={setMusicVibe}>
            <SelectTrigger id="music-vibe" className="bg-zinc-800 border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {MUSIC_VIBES.map((m) => (
                <SelectItem key={m} value={m} className="capitalize">
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="provider">AI Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger id="provider" className="bg-zinc-800 border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {hasOpenAiKey && (
                <SelectItem value="openai">OpenAI</SelectItem>
              )}
              {hasGeminiKey && (
                <SelectItem value="gemini">Google Gemini</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (seconds)</Label>
          <Input
            id="duration"
            type="number"
            min="10"
            max="120"
            step="10"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={isLoading || !canGenerate}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Generating...' : 'Generate Short Film'}
      </Button>
      
      {!canGenerate && (
        <p className="text-sm text-red-400 text-center">
          Please add API keys in Settings to generate films
        </p>
      )}
    </form>
  );
}
