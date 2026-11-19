<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content/site';
	import { m } from '$lib/paraglide/messages'
	import { localizeHref } from '$lib/paraglide/runtime'
</script>

<svelte:head>
	<title>{page.status} — {site.name}</title>
</svelte:head>

<h1 class="page-title">{m.error_title()}</h1>

<section class="section">
	<p class="actions">
		<a class="action action--lead" href={localizeHref('/')}>{m.error_home()}</a>
	</p>
</section>
