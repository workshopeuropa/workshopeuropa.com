import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { db } from './db';
import * as schema from './db/schema';

if (!env.BETTER_AUTH_SECRET && !dev) {
	throw new Error('BETTER_AUTH_SECRET is required in production. See .env.example.');
}

export const auth = betterAuth({
	appName: 'Workshop Europa',
	secret: env.BETTER_AUTH_SECRET ?? 'dev-only-insecure-secret-change-me',
	baseURL: env.BETTER_AUTH_URL,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification
		}
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8
	},
	session: {
		expiresIn: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24
	},
	advanced: {
		useSecureCookies: !dev
	},
	// Must stay last: it is what writes Better Auth's cookies through
	// SvelteKit when the API is called from a load function or form action.
	plugins: [sveltekitCookies(getRequestEvent)]
});

export type Session = typeof auth.$Infer.Session.session;
export type SessionUser = typeof auth.$Infer.Session.user;
