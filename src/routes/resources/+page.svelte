<script lang="ts">
	import { resources } from '@/lib/data/resources';
	import QuickTips from './components/quick-tips.svelte';
	import ResourceCategories from './components/resource-categories.svelte';

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

<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-3xl font-bold text-rose-600 sm:text-4xl md:text-5xl">
			Resources for Korea
		</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
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
