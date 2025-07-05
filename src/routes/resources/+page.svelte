<script lang="ts">
	import QuickTips from './components/quick-tips.svelte';
	import ResourceCategories from './components/resource-categories.svelte';
	import type { Resource } from '@/lib/types';

	export let data: { resources: Resource[] };

	const { resources } = data;

	const categories = [...new Set(resources.map((r) => r.category))];

	function getResourcesByCategory(category: string) {
		return resources.filter((r) => r.category === category);
	}

	function openResource(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<svelte:head>
	<title>Resources | Meet in Korea</title>
	<meta
		name="description"
		content="Essential resources for visiting Korea - travel guides, language learning, transportation, and practical information"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header -->
	<div class="mb-8 text-left">
		<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-rose-600">
			Resources for Korea
		</h1>
		<p class="text-muted-foreground">
			Essential resources to help you navigate Korea with confidence. From official government
			websites to language learning platforms, find everything you need for your Korean adventure.
		</p>
	</div>

	<!-- Categories -->
	<ResourceCategories
    {categories}
    {getResourcesByCategory}
    {openResource}
  />

	<!-- Quick Tips Section -->
	<QuickTips />
</div>
