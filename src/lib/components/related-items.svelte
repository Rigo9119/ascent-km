<script lang="ts">
	import { type Item } from '../types';
	import CardRelatedItem from './card/card-related-item.svelte';

	interface RelatedSectionProps {
		relatedItems: Item[];
	}

	const { relatedItems }: RelatedSectionProps = $props();

  // TODO: goBack route needs to be /{locations | event}/{slug}
</script>

<section class="mt-12 border-t pt-8 sm:mt-16 sm:pt-12">
	<h2 class="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">Other Locations You Might Like</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
		{#each relatedItems as relatedItem (relatedItem.id)}
      <CardRelatedItem relatedItem={relatedItem} goTo={'/'} />
		{/each}
	</div>
</section>
