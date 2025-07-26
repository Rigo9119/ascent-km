<script lang="ts">
	import type { AnyFieldApi } from '@tanstack/svelte-form';

	let { field }: { field: AnyFieldApi } = $props();
</script>

{#if field.state.meta.isTouched}
	{#each field.state.meta.errors as error, index (index)}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{/each}
	{field.state.meta.isValidating ? 'Validating...' : ''}
{/if}
