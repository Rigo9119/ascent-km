<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Heart from '@lucide/svelte/icons/heart';
	import * as Button from '$lib/components/ui/button/index.js';

  type ButtonSize = 'sm' | 'md' | 'lg' | 'default' | 'icon' | undefined;

	export let itemId: string;
	export let type: 'events' | 'locations' | 'communities';
	export let isFavorited = false;
	export let size;

	const dispatch = createEventDispatcher<{
		toggle: { isFavorited: boolean; message: string };
		error: { message: string };
	}>();

	let isLoading = false;

	async function toggleFavorite() {
		if (isLoading) return;

		isLoading = true;

		try {
			const response = await fetch('/api/favorites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type,
					itemId
				})
			});

			const result = await response.json();

			if (response.ok) {
				isFavorited = result.isFavorited;
				dispatch('toggle', {
					isFavorited: result.isFavorited,
					message: result.message
				});
			} else {
				dispatch('error', { message: result.error || 'Failed to toggle favorite' });
			}
		} catch (error) {
			console.error('Error toggling favorite:', error);
			dispatch('error', { message: 'Network error' });
		} finally {
			isLoading = false;
		}
	}

	$: buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';
	$: iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
</script>

<Button.Root
	variant={isFavorited ? 'default' : 'outline'}
	onclick={toggleFavorite}
	disabled={isLoading}
	class="transition-all duration-200 hover:scale-105 {isFavorited ? 'bg-rose-500 hover:bg-rose-600' : ''}"
>
	<Heart
		class="transition-all duration-200 {isFavorited ? 'fill-current' : ''}"
		size={iconSize}
	/>
	{#if isLoading}
		<span class="ml-2">...</span>
	{/if}
</Button.Root> 