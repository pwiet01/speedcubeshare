import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import prismaClient from './prisma';

export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: prisma(prismaClient),

  getUserAttributes(data) {
    return {
      email: data.email,
      username: data.username,
      display_name: data.display_name,
    };
  },
});

export type Auth = typeof auth;
