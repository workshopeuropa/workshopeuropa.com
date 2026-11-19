<script lang="ts">
	import { page } from '$app/state'
	import { m } from '$lib/paraglide/messages'
	import { deLocalizeHref, getLocale, locales, localizeHref, type Locale } from '$lib/paraglide/runtime'

	const languageNames = {
		en: 'English',
		sv: 'Svenska',
		da: 'Dansk',
		nb: 'Norsk bokmål',
		nn: 'Norsk nynorsk',
		de: 'Deutsch',
		fr: 'Français',
		es: 'Español',
		it: 'Italiano',
		pl: 'Polski',
		nl: 'Nederlands',
		'pt-PT': 'Português (Portugal)'
	} satisfies Record<Locale, string>

	let trigger: HTMLButtonElement
	let menu: HTMLUListElement
	const orderedLocales = locales.toSorted((a, b) => languageNames[a].localeCompare(languageNames[b], 'en'))
	let pageHref = $derived(deLocalizeHref(page.url.pathname + page.url.search + page.url.hash))

	function positionFallback(event: ToggleEvent) {
		if (event.newState !== 'open' || CSS.supports('top: anchor(bottom)')) return

		const { bottom, right } = trigger.getBoundingClientRect()
		const root = document.documentElement
		const rem = Number.parseFloat(getComputedStyle(root).fontSize)
		menu.style.setProperty('--menu-top', `${(bottom + window.scrollY) / rem}rem`)
		menu.style.setProperty('--menu-right', `${(root.clientWidth - right) / rem}rem`)
	}
</script>

<button type="button" popovertarget="language-menu" bind:this={trigger}>
	{languageNames[getLocale()]}
</button>

<ul id="language-menu" popover="auto" aria-label={m.language()} bind:this={menu} onbeforetoggle={positionFallback}>
	{#each orderedLocales as locale (locale)}
		<li>
			<a
				href={localizeHref(pageHref, { locale })}
				lang={locale}
				hreflang={locale}
				aria-current={locale === getLocale() ? 'true' : undefined}
				data-sveltekit-reload
				onclick={(event) => {
					if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
					menu.hidePopover()
					if (locale === getLocale()) {
						event.preventDefault()
						trigger.focus()
					}
				}}
			>{languageNames[locale]}</a>
		</li>
	{/each}
</ul>

<style>
	button {
		padding: 0;
		border: 0;
		background: transparent;
		font: inherit;
		letter-spacing: inherit;
		cursor: pointer;
		anchor-name: --language-trigger;
	}

	ul {
		position: absolute;
		inset: auto;
		top: calc(var(--menu-top) + 0.375rem);
		right: var(--menu-right);
		width: max-content;
		max-inline-size: calc(100% - 2rem);
		max-block-size: min(24rem, 55dvh);
		margin: 0;
		padding: 0.375rem 0.75rem;
		overflow: auto;
		border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
		border-radius: 0.25rem;
		background: var(--paper);
		color: var(--ink);
		font: inherit;
		box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 0.1);
	}

	@supports (top: anchor(bottom)) {
		ul {
			position: fixed;
			position-anchor: --language-trigger;
			top: calc(anchor(bottom) + 0.375rem);
			right: anchor(right);
			position-try-fallbacks: flip-block;
		}
	}

	li a {
		display: block;
		padding-block: 0.25rem;
		overflow-wrap: anywhere;
	}

	a[aria-current='true'] {
		font-weight: 500;
	}

	li a:hover {
		opacity: 0.6;
	}
</style>
