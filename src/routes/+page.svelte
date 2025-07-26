<script lang="ts">
	import HomeSection from '@/lib/components/home-carousel-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';
	import type { AppEvent, AppLocation, Community } from '@/lib/types';
	import type { PageData } from './$types';
	import SearchHome from '@/lib/components/search-home.svelte';

	const { data }: { data: PageData } = $props();

	const locations = $derived(data.locations as AppLocation[]);
	const events = $derived(data.events as AppEvent[]);
	const featuredLocations = $derived(data.featuredLocations as AppLocation[]);
	const trendingEvents = $derived(data.trendingEvents as AppEvent[]);
	const featuredCommunities = $derived(data.featuredCommunities as Community[]);
	const carouselLocations = $derived([...locations].sort(() => Math.random() - 0.5));
	const carouselEvents = $derived([...events].sort(() => Math.random() - 0.5));
	const user = $derived(data.user);

	const FIRST_CARROUSEL_DELAY = 5000;
	const SECOND_CARROUSEL_DELAY = 4500;
</script>

<svelte:head>
	<title>Next Roots</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

{#if !data}
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Skeleton for header -->
		<div class="mb-6 sm:mb-8">
			<div class="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
			<div class="h-4 w-96 animate-pulse rounded bg-gray-200"></div>
		</div>

		<!-- Skeleton for search -->
		<div class="mb-8 h-16 animate-pulse rounded-lg bg-gray-200"></div>

		<!-- Skeleton for carousel sections -->
		<div class="space-y-8">
			<div>
				<div class="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each Array(4) as _}
						<div class="h-48 animate-pulse rounded-lg bg-gray-200"></div>
					{/each}
				</div>
			</div>

			<div>
				<div class="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each Array(4) as _}
						<div class="h-48 animate-pulse rounded-lg bg-gray-200"></div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<h1 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">
			NextRoots
		</h1>

		<!-- Search Section -->
		<SearchHome />

		<HomeSection sectionTitle="Locations" carouselItems={carouselLocations} carouselDelay={5000} />
		<HomeSection sectionTitle="Events" carouselItems={carouselEvents} carouselDelay={4500} />
		<TrendingSection
			sectionTitle="Top locations"
			sectionItems={featuredLocations}
			urlSection="locations"
			{user}
		/>

		{#if trendingEvents.length > 0}
			<TrendingSection
				sectionTitle="Trending events"
				sectionItems={trendingEvents}
				urlSection="events"
				{user}
			/>
		{/if}

		<TrendingSection
			sectionTitle="Popular communities"
			sectionItems={featuredCommunities}
			urlSection="communities"
			{user}
		/>
	</div>
{/if}
