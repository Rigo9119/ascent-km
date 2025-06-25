<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Heart from '@lucide/svelte/icons/heart';
	import { goto } from '$app/navigation';

	interface Item {
		id: string | number;
		name: string;
		address: string;
		description: string;
		image: string;
	}

	const { sectionTitle, sectionItems }: { sectionTitle: string; sectionItems: Item[] } = $props();

	function handleFavorite(item: Item) {
		// Implement favorite logic here
		console.log('Favorited:', item.name);
	}

	function viewDetails(itemId: string | number) {
		goto(`/locations/${itemId}`);
	}
</script>

<section class="py-2">
	<h2 class="py-2 text-2xl font-semibold">{sectionTitle}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each sectionItems as item (item.id)}
			<Card.Root class="flex h-full flex-col">
				<Card.Header class="relative p-0">
					<img src={item.image} alt={item.name} class="h-40 w-full rounded-t-lg object-cover" />
					<Button
						variant="ghost"
						size="icon"
						class="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
						onclick={() => handleFavorite(item)}
					>
						<Heart class="h-5 w-5 text-red-500" />
					</Button>
				</Card.Header>
				<Card.Content class="flex-grow p-4">
					<h3 class="font-semibold">{item.name}</h3>
					<p class="text-sm text-gray-500">{item.address}</p>
					<p class="mt-2 text-sm">{item.description}</p>
				</Card.Content>
				<Card.Footer class="p-4 pt-0">
					<Button class="w-full" onclick={() => viewDetails(item.id)}>More</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
