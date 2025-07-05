<script lang="ts">
	import type { Item } from '../types';
	import CardItem from './card/card-item.svelte';




	const {
		sectionTitle,
		sectionItems,
		urlSection
	}: { sectionTitle: string; sectionItems: Item[]; urlSection: string } = $props();
</script>

<section class="py-2">
	<h2 class="py-6 text-3xl font-semibold">{sectionTitle}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each sectionItems as item (item.id)}
			<CardItem cardItem={item} urlSection={urlSection} />
		{/each}
	</div>
</section>
