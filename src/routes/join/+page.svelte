<script lang="ts">
	import { enhance } from '$app/forms';
	import HeaderCard from '$lib/components/HeaderCard.svelte';
	import Rubric from '$lib/components/Rubric.svelte';
	import { disciplines, join } from '$lib/content/join';
	import { site } from '$lib/content/site';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let submitting = $state(false);

	let errors = $derived(form && 'errors' in form ? form.errors : undefined);
	let values = $derived(form && 'values' in form ? form.values : undefined);
	let joined = $derived(Boolean(form && 'joined' in form && form.joined) || Boolean(data.membership));
	let greeting = $derived(
		(form && 'name' in form ? form.name : undefined) ?? data.membership?.name ?? data.user?.name
	);
	/** Open the sign-in form when the address turned out to be taken. */
	let showSignin = $state(false);
	let signinOpen = $derived(
		showSignin ||
			Boolean(form && 'exists' in form && form.exists) ||
			Boolean(form && 'signin' in form && form.signin)
	);

	function track() {
		submitting = true;
		return async ({ update }: { update: (options?: { reset?: boolean }) => Promise<void> }) => {
			await update({ reset: false });
			submitting = false;
		};
	}
</script>

<svelte:head>
	<title>Join — {site.name}</title>
	<meta name="description" content={join.body[0]} />
</svelte:head>

<HeaderCard title={join.title} subtitle={join.subtitle} />

{#if joined}
	<section class="section">
		<div class="text">
			<h2 class="welcome">Nice to meet you</h2>
			<p class="lede">
				{#if greeting}Thank you, {greeting}.{/if} You are on the list.
			</p>
			<p>
				The next letter goes out at the end of the quarter. Meanwhile, the
				<a href="/projects">projects</a>.
			</p>
			{#if data.user}
				<form method="POST" action="?/signout" use:enhance>
					<button class="linkish" type="submit">Sign out</button>
				</form>
			{/if}
		</div>
	</section>
{:else}
	<section class="section">
		<div class="text">
			{#each join.body as paragraph, i (paragraph)}
				<p class={i === 0 ? 'lede' : ''}>{paragraph}</p>
			{/each}
		</div>
	</section>

	<section class="section" aria-labelledby="form">
		<Rubric id="form" note="Two minutes">Join the workshop</Rubric>

		<form method="POST" action="?/join" class="form" novalidate use:enhance={track}>
			<div class="field">
				<label for="name">Name</label>
				<input
					id="name"
					name="name"
					autocomplete="name"
					required
					value={values?.name ?? data.user?.name ?? ''}
					aria-invalid={errors?.name ? 'true' : undefined}
					aria-describedby={errors?.name ? 'name-error' : undefined}
				/>
				{#if errors?.name}<p class="error" id="name-error">{errors.name}</p>{/if}
			</div>

			<div class="field">
				<label for="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					value={values?.email ?? data.user?.email ?? ''}
					aria-invalid={errors?.email ? 'true' : undefined}
					aria-describedby={errors?.email ? 'email-error' : undefined}
				/>
				{#if errors?.email}<p class="error" id="email-error">{errors.email}</p>{/if}
			</div>

			{#if !data.user}
				<div class="field">
					<label for="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						minlength="8"
						required
						aria-invalid={errors?.password ? 'true' : undefined}
						aria-describedby={errors?.password ? 'password-error' : 'password-hint'}
					/>
					{#if errors?.password}
						<p class="error" id="password-error">{errors.password}</p>
					{:else}
						<p class="hint" id="password-hint">Eight characters or more, so you can come back.</p>
					{/if}
				</div>
			{/if}

			<div class="field">
				<label for="discipline">What you make</label>
				<select
					id="discipline"
					name="discipline"
					required
					aria-invalid={errors?.discipline ? 'true' : undefined}
					aria-describedby={errors?.discipline ? 'discipline-error' : undefined}
				>
					<option value="" disabled selected={!values?.discipline}>Choose one</option>
					{#each disciplines as discipline (discipline)}
						<option value={discipline} selected={values?.discipline === discipline}>
							{discipline}
						</option>
					{/each}
				</select>
				{#if errors?.discipline}<p class="error" id="discipline-error">{errors.discipline}</p>{/if}
			</div>

			<div class="field">
				<label for="city">City <span class="optional">optional</span></label>
				<input id="city" name="city" autocomplete="address-level2" value={values?.city ?? ''} />
			</div>

			<div class="field">
				<label for="link">A link to your work <span class="optional">optional</span></label>
				<input
					id="link"
					name="link"
					type="url"
					inputmode="url"
					placeholder="https://"
					value={values?.link ?? ''}
					aria-invalid={errors?.link ? 'true' : undefined}
					aria-describedby={errors?.link ? 'link-error' : undefined}
				/>
				{#if errors?.link}<p class="error" id="link-error">{errors.link}</p>{/if}
			</div>

			<div class="field">
				<label for="note">Anything else <span class="optional">optional</span></label>
				<textarea
					id="note"
					name="note"
					rows="3"
					maxlength="600"
					aria-invalid={errors?.note ? 'true' : undefined}
					aria-describedby={errors?.note ? 'note-error' : undefined}>{values?.note ?? ''}</textarea
				>
				{#if errors?.note}<p class="error" id="note-error">{errors.note}</p>{/if}
			</div>

			<button class="submit" type="submit" disabled={submitting}>
				{submitting ? 'Sending…' : 'Join the workshop'}
			</button>
		</form>
	</section>

	<section class="section">
		{#if signinOpen}
			<form method="POST" action="?/signin" class="form" novalidate use:enhance={track}>
				<h2 class="entry__title">Sign in</h2>

				<div class="field">
					<label for="signin-email">Email</label>
					<input
						id="signin-email"
						name="email"
						type="email"
						autocomplete="email"
						required
						aria-invalid={errors?.signinEmail ? 'true' : undefined}
						aria-describedby={errors?.signinEmail ? 'signin-email-error' : undefined}
					/>
					{#if errors?.signinEmail}
						<p class="error" id="signin-email-error">{errors.signinEmail}</p>
					{/if}
				</div>

				<div class="field">
					<label for="signin-password">Password</label>
					<input
						id="signin-password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						aria-invalid={errors?.signinPassword ? 'true' : undefined}
						aria-describedby={errors?.signinPassword ? 'signin-password-error' : undefined}
					/>
					{#if errors?.signinPassword}
						<p class="error" id="signin-password-error">{errors.signinPassword}</p>
					{/if}
				</div>

				<button class="submit" type="submit" disabled={submitting}>Sign in</button>
			</form>
		{:else}
			<div class="text">
				<p>
					Joined before? Your details are already on file.
					<button class="linkish" type="button" onclick={() => (showSignin = true)}
						>Sign in to update them</button
					>.
				</p>
			</div>
		{/if}
	</section>
{/if}

<style>
	.welcome {
		font-size: clamp(2rem, 1.4rem + 3vw, 3.4rem);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.01em;
	}

	.form {
		display: grid;
		gap: 1.15rem;
		width: min(100%, var(--column));
		margin-inline: auto;
	}

	.field {
		display: grid;
		gap: 0.3rem;
	}

	label {
		font-size: 0.9rem;
		font-style: italic;
	}

	.optional {
		color: var(--ink-soft);
		font-size: 0.8em;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.45rem 0.1rem;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--ink);
		border-radius: 0;
		font-size: 1.05rem;
	}

	textarea {
		resize: vertical;
		min-height: 4.5rem;
		line-height: 1.5;
	}

	select {
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, var(--ink) 50%),
			linear-gradient(135deg, var(--ink) 50%, transparent 50%);
		background-position:
			calc(100% - 12px) calc(50% + 1px),
			calc(100% - 7px) calc(50% + 1px);
		background-size:
			5px 5px,
			5px 5px;
		background-repeat: no-repeat;
		padding-right: 1.75rem;
	}

	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 2px;
	}

	[aria-invalid='true'] {
		border-bottom-width: 2px;
	}

	.hint,
	.error {
		font-size: 0.85rem;
		line-height: 1.35;
	}

	.hint {
		color: var(--ink-soft);
	}

	.error {
		font-style: italic;
	}

	.submit {
		justify-self: start;
		margin-top: 0.35rem;
		padding: 0.6rem 1.4rem;
		background: var(--card);
		border: 1px solid var(--ink);
		border-radius: 999px;
		cursor: pointer;
		font-size: 1rem;
		transition:
			transform 140ms ease,
			background 140ms ease;
	}

	.submit:hover:not(:disabled) {
		background: var(--ink);
		color: var(--paper);
	}

	.submit:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.linkish {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		font-size: inherit;
		font-style: italic;
		text-decoration: underline;
		text-decoration-thickness: from-font;
		text-underline-offset: 0.2em;
	}
</style>
