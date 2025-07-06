<script lang="ts">
	import HomeSection from '@/lib/components/home-carousel-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';
	import type { AppEvent, AppLocation, Community, Item } from '@/lib/types';
	import type { PageData } from './$types';
	import SearchHome from '@/lib/components/search-home.svelte';

	const { data }: { data: PageData } = $props();

	const locations = $derived(data.appLocations as AppLocation[]);
	const events = $derived(data.appEvents as AppEvent[]);
	const featuredLocations = $derived(data.featuredLocations as AppLocation[]);
	const trendingEvents = $derived(data.trendingEvents as AppEvent[]);
	const communities = $derived(data.communities as Community[]);
	const featuredCommunities = $derived(data.featuredCommunities as Community[]);
	const carouselLocations = $derived([...locations].sort(() => Math.random() - 0.5));
	const carouselEvents = $derived([...events].sort(() => Math.random() - 0.5));
</script>

<svelte:head>
	<title>Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<h1 class="mb-2 text-2xl font-bold text-rose-600 sm:mb-4 sm:text-3xl md:text-4xl">
		Meet in Korea
	</h1>

	<!-- Search Section -->
	<SearchHome />

	<HomeSection sectionTitle="Locations" carouselItems={carouselLocations} carouselDelay={5000} />
	<HomeSection sectionTitle="Events" carouselItems={carouselEvents} carouselDelay={4500} />
	<TrendingSection
		sectionTitle="Top locations"
		sectionItems={featuredLocations}
		urlSection="locations"
	/>
	<TrendingSection
		sectionTitle="Trending events"
		sectionItems={trendingEvents}
		urlSection="events"
	/>
	<TrendingSection
		sectionTitle="Popular communities"
		sectionItems={featuredCommunities}
		urlSection="communities"
	/>
</div>
