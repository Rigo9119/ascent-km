<script lang="ts">
	import type { PageData } from '../$types';
	import QuickTips from './components/quick-tips.svelte';
	import ResourceCategories from './components/resource-categories.svelte';
	import type { Resource } from '@/lib/types';

	const { data }: { data: PageData } = $props();

	const { resources } = data;

	const categories = [...new Set(resources.map((resource: Resource) => resource.category))];

	function getResourcesByCategory(category: string) {
		return resources.filter((resource: Resource) => resource.category === category);
	}

	function openResource(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<svelte:head>
	<title>Resources | Next Roots</title>
	<meta
		name="description"
		content="Essential resources for visiting Korea - travel guides, language learning, transportation, and practical information"
	/>
</svelte:head>

{#if !data}
	<div>
		<p>Loading...resources page</p>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Header -->
		<div class="mb-8 text-left">
			<h1 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">
				Resources for Korea
			</h1>
			<p class="text-muted-foreground">
				Essential resources to help you navigate Korea with confidence. From official government
				websites to language learning platforms, find everything you need for your Korean adventure.
			</p>
		</div>

		<!-- Categories -->
		<ResourceCategories {categories} {getResourcesByCategory} {openResource} />

		<!-- Quick Tips Section -->
		<QuickTips />
	</div>
{/if}
