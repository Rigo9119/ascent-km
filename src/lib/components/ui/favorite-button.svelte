<script lang="ts">
	import { Heart } from '@lucide/svelte/icons';
	import { Button } from './button';
	import { createEventDispatcher } from 'svelte';

	type Props = {
		itemId: string;
		itemType: 'event' | 'location' | 'community';
		isFavorited?: boolean;
		disabled?: boolean;
		size?: 'sm' | 'md' | 'lg';
	};

	const { itemId, itemType, isFavorited = false, disabled = false, size = 'md' } = $props();
	const dispatch = createEventDispatcher();

	let loading = $state(false);
	let favorited = $state(isFavorited);

	async function toggleFavorite() {
		if (loading || disabled) return;

		loading = true;
		try {
			const endpoint = `/api/favorites/${itemType}s`;
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					[`${itemType}_id`]: itemId
				})
			});

			if (response.ok) {
				const result = await response.json();
				favorited = result.is_favorited;
				dispatch('toggle', {
					itemId,
					itemType,
					isFavorited: favorited,
					message: result.message
				});
			} else {
				console.error('Failed to toggle favorite');
			}
		} catch (error) {
			console.error('Error toggling favorite:', error);
		} finally {
			loading = false;
		}
	}

	// Update favorited state when prop changes
	$effect(() => {
		favorited = isFavorited;
	});
</script>

<Button
	variant={favorited ? 'default' : 'outline'}
	{size}
	onclick={toggleFavorite}
	disabled={loading || disabled}
	class="transition-all duration-200 hover:scale-105 {favorited
		? 'bg-rose-500 text-white hover:bg-rose-600'
		: 'hover:border-rose-200 hover:bg-rose-50'}"
>
	<Heart class="h-4 w-4 {favorited ? 'fill-current' : ''} {loading ? 'animate-pulse' : ''}" />
	{#if loading}
		<span class="ml-2 text-xs">...</span>
	{/if}
</Button>
