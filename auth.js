import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Generate or read secrets automatically
const getOrGenerateSecret = (key) => {
  const secretsPath = join(process.cwd(), '.auth-secrets.json');
  let secrets = {};

  if (existsSync(secretsPath)) {
    try {
      secrets = JSON.parse(readFileSync(secretsPath, 'utf-8'));
    } catch {
      secrets = {};
    }
  }

  if (!secrets[key]) {
    // Generate a random secret if not exists
    secrets[key] = require('crypto').randomBytes(32).toString('hex');
    writeFileSync(secretsPath, JSON.stringify(secrets, null, 2));
  }

  return secrets[key];
};

// Get Discord credentials from environment variables or use defaults
const DISCORD_ID = process.env.DISCORD_ID || 'YOUR_DISCORD_CLIENT_ID';
const DISCORD_SECRET = process.env.DISCORD_SECRET || 'YOUR_DISCORD_CLIENT_SECRET';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: DISCORD_ID,
      clientSecret: DISCORD_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || getOrGenerateSecret('NEXTAUTH_SECRET'),
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
