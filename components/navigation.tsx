"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  
  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Short Film
        </Link>
        
        {isSignedIn && (
          <div className="flex items-center gap-6">
            <Link
              href="/generate"
              className={`text-sm transition-colors ${
                pathname === '/generate' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Generate
            </Link>
            <Link
              href="/history"
              className={`text-sm transition-colors ${
                pathname === '/history' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              History
            </Link>
            <Link
              href="/settings"
              className={`text-sm transition-colors ${
                pathname === '/settings' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Settings
            </Link>
            <UserButton />
          </div>
        )}
        
        {!isSignedIn && pathname === '/' && (
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
