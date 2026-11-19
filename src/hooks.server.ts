import { building } from '$app/environment'
import { sequence } from '@sveltejs/kit/hooks'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { getTextDirection } from '$lib/paraglide/runtime'
import { paraglideMiddleware } from '$lib/paraglide/server'
import { auth } from '$lib/server/auth'
import type { Handle } from '@sveltejs/kit'

const handleLocale: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) =>
		resolve(
			{ ...event, request },
			{
				transformPageChunk: ({ html }) =>
					html.replace('%lang%', locale).replace('%dir%', getTextDirection(locale))
			}
		)
	)

const handleAuth: Handle = async ({ event, resolve }) => {
	if (!building) {
		const session = await auth.api.getSession({ headers: event.request.headers })
		event.locals.user = session?.user ?? null
		event.locals.session = session?.session ?? null
	}

	return svelteKitHandler({ auth, event, resolve, building })
}

export const handle = sequence(handleLocale, handleAuth)
