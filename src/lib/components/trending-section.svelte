<script lang="ts">
	import type { Item } from '../types';
	import CardItem from './card/card-item.svelte';

	interface TrendingSectionProps {
		sectionTitle: string;
		sectionItems: Item[];
		urlSection: string;
	}

	const { sectionTitle, sectionItems, urlSection }: TrendingSectionProps = $props();
</script>

<section class="py-2">
	<h2 class="py-6 text-3xl font-semibold">{sectionTitle}</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each sectionItems as item (item.id)}
			<CardItem cardItem={item} {urlSection} />
		{/each}
	</div>
</section>
