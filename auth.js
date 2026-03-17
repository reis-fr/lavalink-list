import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

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
    secrets[key] = randomBytes(32).toString('hex');
    writeFileSync(secretsPath, JSON.stringify(secrets, null, 2));
  }

  return secrets[key];
};

// Get Discord credentials from environment variables or use defaults
const DISCORD_ID = process.env.DISCORD_ID || 'YOUR_DISCORD_CLIENT_ID';
const DISCORD_SECRET = process.env.DISCORD_SECRET || 'YOUR_DISCORD_CLIENT_SECRET';

export const authOptions = {
  providers: [
    DiscordProvider({
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
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
