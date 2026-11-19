<script lang="ts">
	let { data }: { data: object } = $props()

	const json = $derived(JSON.stringify(data).replaceAll('<', '\\u003c'))
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
