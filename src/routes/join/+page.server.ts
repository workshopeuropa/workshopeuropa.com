import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { membership } from '$lib/server/db/schema';
import { disciplines } from '$lib/content/join';
import type { Actions, PageServerLoad } from './$types';

const MIN_PASSWORD = 8;

type Values = {
	name: string;
	email: string;
	discipline: string;
	city: string;
	link: string;
	note: string;
};

function read(data: FormData): Values {
	const get = (key: string) => String(data.get(key) ?? '').trim();
	return {
		name: get('name'),
		email: get('email'),
		discipline: get('discipline'),
		city: get('city'),
		link: get('link'),
		note: get('note')
	};
}

function validate(values: Values, password: string, needsPassword: boolean) {
	const errors: Record<string, string> = {};

	if (!values.name) errors.name = 'We need something to call you.';
	else if (values.name.length > 80) errors.name = 'That is longer than we can fit on an envelope.';

	if (!values.email) errors.email = 'An address, so we can write back.';
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = 'That does not look like an email address.';

	if (needsPassword) {
		if (!password) errors.password = 'Pick a password so you can come back.';
		else if (password.length < MIN_PASSWORD)
			errors.password = `At least ${MIN_PASSWORD} characters, please.`;
	}

	if (!values.discipline) errors.discipline = 'Pick the closest one.';
	else if (!disciplines.includes(values.discipline as (typeof disciplines)[number]))
		errors.discipline = 'Pick one from the list.';

	if (values.link) {
		try {
			const url = new URL(values.link);
			if (!/^https?:$/.test(url.protocol)) errors.link = 'Links should start with http or https.';
		} catch {
			errors.link = 'That link does not parse. Include the https://.';
		}
	}

	if (values.note.length > 600) errors.note = 'Six hundred characters is plenty for now.';

	return errors;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return { membership: null };

	const [row] = await db
		.select()
		.from(membership)
		.where(eq(membership.userId, locals.user.id))
		.limit(1);

	return { membership: row ?? null };
};

export const actions: Actions = {
	join: async ({ request, locals }) => {
		const data = await request.formData();
		const values = read(data);
		const password = String(data.get('password') ?? '');
		const needsPassword = !locals.user;

		const errors = validate(values, password, needsPassword);
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		let userId = locals.user?.id;

		if (!userId) {
			try {
				// The sveltekitCookies plugin writes the session cookie for us.
				const result = await auth.api.signUpEmail({
					body: { name: values.name, email: values.email, password },
					headers: request.headers
				});
				userId = result.user.id;
			} catch (error) {
				if (error instanceof APIError) {
					const exists = String(error.body?.code ?? '').startsWith('USER_ALREADY_EXISTS');
					const message = exists
						? 'That address is already on the list. Sign in below instead.'
						: (error.body?.message ?? 'That did not go through. Try again?');
					const failure: Record<string, string> = { email: message };
					return fail(400, { errors: failure, values, exists });
				}
				throw error;
			}
		}

		const [existing] = await db
			.select({ id: membership.id })
			.from(membership)
			.where(eq(membership.userId, userId))
			.limit(1);

		if (existing) {
			await db
				.update(membership)
				.set({
					name: values.name,
					email: values.email,
					discipline: values.discipline,
					city: values.city || null,
					link: values.link || null,
					note: values.note || null
				})
				.where(eq(membership.id, existing.id));
		} else {
			await db.insert(membership).values({
				userId,
				name: values.name,
				email: values.email,
				discipline: values.discipline,
				city: values.city || null,
				link: values.link || null,
				note: values.note || null
			});
		}

		return { joined: true, name: values.name };
	},

	/** For people who joined already and are back. */
	signin: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim();
		const password = String(data.get('password') ?? '');

		if (!email || !password) {
			const errors: Record<string, string> = {};
			if (!email) errors.signinEmail = 'Which address did you use?';
			if (!password) errors.signinPassword = 'And the password.';
			return fail(400, { errors, signin: true });
		}

		try {
			await auth.api.signInEmail({ body: { email, password }, headers: request.headers });
		} catch (error) {
			if (error instanceof APIError) {
				const errors: Record<string, string> = {
					signinPassword: error.body?.message ?? 'That pair did not match.'
				};
				return fail(400, { errors, signin: true });
			}
			throw error;
		}

		// Reload so the request carries the new session cookie.
		redirect(303, '/join');
	},

	signout: async ({ request }) => {
		await auth.api.signOut({ headers: request.headers });
		redirect(303, '/join');
	}
};
