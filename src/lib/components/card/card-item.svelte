<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Heart from '@lucide/svelte/icons/heart';
	import { goto } from '$app/navigation';
	import type { Item } from '@/lib/types';

	const { cardItem, urlSection }: { cardItem: Item; urlSection: string } = $props();

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
		<img src={cardItem.image} alt={cardItem.name} class="h-40 w-full rounded-t-lg object-cover" />
		<Button
			variant="ghost"
			size="icon"
			class="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
			onclick={() => handleFavorite(cardItem)}
		>
			<Heart class="h-5 w-5 text-red-500" />
		</Button>
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
		<Button class="w-full bg-rose-500 hover:bg-rose-600" onclick={() => viewDetails(cardItem.id)}
			>More</Button
		>
	</Card.Footer>
</Card.Root>
