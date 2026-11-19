<script lang="ts">
	let { text, links }: { text: string; links: Record<string, { href: string; label: string }> } = $props()
</script>

{#each text.split(/(\{\w+\})/) as part}
	{@const link = Object.hasOwn(links, part) ? links[part] : undefined}
	{#if link}<a href={link.href}>{link.label}</a>{:else}{part}{/if}
{/each}
