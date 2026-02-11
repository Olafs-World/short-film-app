"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Generation } from '@/lib/db';

interface GenerationViewProps {
  generation: Generation;
}

export function GenerationView({ generation: initialGeneration }: GenerationViewProps) {
  const [generation, setGeneration] = useState(initialGeneration);
  const [progress, setProgress] = useState(0);
  
  // Simulate progress for demo purposes
  useEffect(() => {
    if (generation.status === 'pending' || generation.status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 5;
        });
      }, 1000);
      
      // Simulate completion after 10 seconds (for demo)
      const timeout = setTimeout(() => {
        setGeneration({
          ...generation,
          status: 'completed',
          video_url: '/placeholder-video.mp4', // Placeholder
        });
        setProgress(100);
      }, 10000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [generation.status]);
  
  if (generation.status === 'failed') {
    return (
      <Card className="bg-red-900/20 border-red-800">
        <CardHeader>
          <CardTitle className="text-red-400">Generation Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-200">
            {generation.error_message || 'An error occurred during generation. Please try again.'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (generation.status === 'pending' || generation.status === 'processing') {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Generating Your Film...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="text-center text-sm text-zinc-400">
            <p>This may take a few minutes. Feel free to close this page and check back later.</p>
            <p className="mt-2">Progress: {Math.round(progress)}%</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-zinc-300">Analyzing premise...</span>
            </div>
            {progress > 20 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zinc-300">Generating scenes...</span>
              </div>
            )}
            {progress > 50 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zinc-300">Creating visuals...</span>
              </div>
            )}
            {progress > 80 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zinc-300">Adding music...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (generation.status === 'completed') {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Your Film is Ready!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg border border-zinc-700 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🎬</div>
              <p className="text-zinc-400">
                Video player placeholder
                <br />
                <span className="text-xs">
                  (Real video generation will be integrated with the Python backend)
                </span>
              </p>
            </div>
          </div>
          
          {/* Download Button */}
          <Button className="w-full" size="lg">
            Download Film
          </Button>
          
          <div className="text-center text-sm text-zinc-400">
            <p>
              Share your creation on social media!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return null;
}
