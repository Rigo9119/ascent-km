<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Heart from '@lucide/svelte/icons/heart';
	import type { Item } from '../trending-section.svelte';
  import { goto } from '$app/navigation';

  const { cardItem }: { cardItem: Item} = $props();

  function handleFavorite(item: Item) {
		// Implement favorite logic here
		console.log('Favorited:', item.name);
	}
console.log('item: ', cardItem)
	function viewDetails(itemId: string | number) {
		goto(`/locations/${itemId}`);
	}
</script>

<Card.Root class="flex h-full flex-col py-0">
  <Card.Header class="relative p-0">
    <img src={cardItem.image} alt={cardItem.name} class="h-40 w-full rounded-t-lg object-cover" />
    <Button
      variant="ghost"
      size="icon"
      class="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      onclick={() => handleFavorite(cardItem)}
    >
      <Heart class="h-5 w-5 text-red-500" />
    </Button>
  </Card.Header>
  <Card.Content class="flex-grow p-4">
    <h3 class="font-semibold">{cardItem.name}</h3>
    <p class="text-sm text-gray-500">{cardItem.address}</p>
    <p class="mt-2 text-sm">{cardItem.description}</p>
  </Card.Content>
  <Card.Footer class="p-4 pt-0">
    <Button class="w-full" onclick={() => viewDetails(cardItem.id)}>More</Button>
  </Card.Footer>
</Card.Root>