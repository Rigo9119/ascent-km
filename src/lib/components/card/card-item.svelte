<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Heart from '@lucide/svelte/icons/heart';
	import { goto } from '$app/navigation';
	import type { Item } from '@/lib/types';
	import type { User } from '@supabase/supabase-js';

	const { cardItem, urlSection, user }: { cardItem: Item; urlSection: string; user?: User } = $props();

	function handleFavorite(item: Item) {
		// Implement favorite logic here
		console.log('Favorited:', item.name);
	}

	function viewDetails(itemId: string | number) {
		goto(`/${urlSection}/${itemId}`);
	}
</script>

<Card.Root class="flex h-full flex-col py-0">
	<Card.Header class="relative p-0">
		<img src={cardItem.image_url} alt={cardItem.name} class="h-40 w-full rounded-t-lg object-cover" />
		{#if user}
			<Button
				variant="ghost"
				size="icon"
				class="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
				onclick={() => handleFavorite(cardItem)}
			>
				<Heart class="h-5 w-5 text-red-500" />
			</Button>
		{/if}
	</Card.Header>
	<Card.Content class="flex-grow p-4">
		<h3 class="font-semibold">{cardItem.name}</h3>
		<p class="text-sm text-gray-500">
			{('location' in cardItem ? cardItem.location : 'N/A') ||
				('address' in cardItem ? cardItem.address : 'N/A')}
		</p>
		<p class="mt-2 text-sm">{cardItem.description}</p>
	</Card.Content>
	<Card.Footer class="p-4 pt-0">
		<Button class="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onclick={() => viewDetails(cardItem.id)}
			>More</Button
		>
	</Card.Footer>
</Card.Root>
