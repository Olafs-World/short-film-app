# Short Film - AI Short Film Generator

Create stunning AI-generated short films from simple premises. Built with Next.js 14, Clerk, and Supabase.

## Features

- 🎬 AI-powered short film generation
- 🔐 Secure authentication with Clerk (Google + Email)
- 🔑 Encrypted API key storage (OpenAI & Gemini)
- 🎨 Multiple visual styles (cinematic, noir, anime, documentary, sci-fi, fantasy, horror, comedy)
- 🎵 Music integration with customizable vibes
- 📊 Real-time generation progress tracking
- 📜 Generation history
- 🌙 Beautiful dark mode UI with Tailwind + shadcn/ui

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: Clerk
- **Database**: Supabase
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

## Reusable Auth Pattern

This project implements a reusable Clerk + Supabase pattern in `/lib`:

- `lib/auth.ts` - Clerk authentication helpers
- `lib/db.ts` - Supabase client with user context
- `lib/api-keys.ts` - AES-256-GCM encrypted credential storage

Copy these files to new projects for consistent auth handling.

## Environment Variables

```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/generate
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/generate

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# API Key Encryption (32-byte secret)
API_KEY_ENCRYPTION_SECRET=your-32-byte-encryption-key-here
```

## Database Setup

Run the SQL in `supabase/schema.sql` to set up the required tables:

1. `user_api_keys` - Encrypted user API keys
2. `generations` - Film generation records

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deploy to Vercel:

```bash
# Deploy with Vercel CLI
vc

# Or connect your GitHub repo to Vercel
```

Make sure to add all environment variables in the Vercel dashboard.

## API Key Security

User API keys are encrypted using AES-256-GCM before storage. The encryption key is derived from `API_KEY_ENCRYPTION_SECRET` (hashed to 32 bytes). Keys are never stored in plaintext and are only decrypted server-side when needed.

## Future Integration

This web app currently has placeholder video generation. The real generation logic will be integrated with the [short-film CLI tool](https://github.com/Olafs-World/short-film) Python backend.

## Part of Olafs World

This is a project in the Olafs World ecosystem. The auth pattern is designed to be shared across future projects.

## License

MIT
