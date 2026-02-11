"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveApiKeys } from '@/app/actions/api-keys';

interface ApiKeyFormProps {
  initialOpenAiKey: string;
  initialGeminiKey: string;
  hasOpenAiKey: boolean;
  hasGeminiKey: boolean;
}

export function ApiKeyForm({
  initialOpenAiKey,
  initialGeminiKey,
  hasOpenAiKey,
  hasGeminiKey,
}: ApiKeyFormProps) {
  const [openAiKey, setOpenAiKey] = useState(initialOpenAiKey);
  const [geminiKey, setGeminiKey] = useState(initialGeminiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Only send keys that have been changed (not masked)
      const keysToSave: { openaiKey?: string; geminiKey?: string } = {};
      
      if (openAiKey && !openAiKey.includes('•')) {
        keysToSave.openaiKey = openAiKey;
      }
      
      if (geminiKey && !geminiKey.includes('•')) {
        keysToSave.geminiKey = geminiKey;
      }
      
      if (Object.keys(keysToSave).length === 0) {
        setMessage({ type: 'error', text: 'No changes to save' });
        return;
      }
      
      await saveApiKeys(keysToSave);
      
      setMessage({ type: 'success', text: 'API keys saved successfully!' });
      
      // Mask the keys after saving
      if (keysToSave.openaiKey) {
        setOpenAiKey('••••••••');
      }
      if (keysToSave.geminiKey) {
        setGeminiKey('••••••••');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save API keys. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="openai-key">OpenAI API Key</Label>
        <Input
          id="openai-key"
          type="password"
          placeholder={hasOpenAiKey ? 'Key is stored (enter new key to update)' : 'sk-...'}
          value={openAiKey}
          onChange={(e) => setOpenAiKey(e.target.value)}
          className="bg-zinc-800 border-zinc-700"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gemini-key">Gemini API Key</Label>
        <Input
          id="gemini-key"
          type="password"
          placeholder={hasGeminiKey ? 'Key is stored (enter new key to update)' : 'AIza...'}
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          className="bg-zinc-800 border-zinc-700"
        />
      </div>
      
      {message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-900/20 text-green-400 border border-green-800'
              : 'bg-red-900/20 text-red-400 border border-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save API Keys'}
      </Button>
    </form>
  );
}
