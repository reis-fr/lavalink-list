'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Music, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated Musical Waves Background */}
      <div className="fixed inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 flex items-end justify-center gap-2 h-96 bottom-0">
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-40 wave-animate-2"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-36 wave-animate-3"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-44 wave-animate-4"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-40 wave-animate-2"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-36 wave-animate-3"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-44 wave-animate-4"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Music className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Lavalink Dashboard</h1>
            <p className="text-muted-foreground">Manage your music server nodes</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/20 text-destructive rounded-lg text-sm">
              <p className="font-medium">Authentication Error</p>
              <p className="text-xs mt-1">
                {error === 'OAuthSignin' && 'Failed to sign in with Discord'}
                {error === 'OAuthCallback' && 'Discord returned an error'}
                {error === 'OAuthCreateAccount' && 'Failed to create account'}
                {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount'].includes(error) && error}
              </p>
            </div>
          )}

          {/* Discord Sign In Button */}
          <button
            onClick={() => signIn('discord', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition mb-4 group"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.492c-1.53-.742-3.247-1.139-5.085-1.139a.06.06 0 00-.06.06v.051c.671.111 1.83.432 2.976.9 1.9.558 3.12 1.7 4.402 3.334.57-.454 1.782-1.746 3.368-2.4a.066.066 0 00.022-.11 13.101 13.101 0 00-5.623-1.626.06.06 0 00-.06.062v.063a66.162 66.162 0 0114.91 1.27.066.066 0 00.06-.066V4.703a.066.066 0 00-.033-.057z"/>
            </svg>
            Continue with Discord
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our terms of service
          </p>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-primary hover:text-primary/80 text-sm font-medium transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
