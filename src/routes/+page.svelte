<script lang="ts">
	import HomeSection from '@/lib/components/home-carousel-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';
	import { Input } from '$lib/components/ui/input';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { AppEvent, AppLocation, Community, Item } from '@/lib/types';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	
	const locations = $derived(data.appLocations as AppLocation[]);
	const events = $derived(data.appEvents as AppEvent[]);
	const featuredLocations = $derived(data.featuredLocations as AppLocation[]);
	const trendingEvents = $derived(data.trendingEvents as AppEvent[]);
	const communities = $derived(data.communities as Community[]);
	const featuredCommunities = $derived(data.featuredCommunities as Community[]);

	const carouselLocations = $derived([...locations].sort(() => Math.random() - 0.5))
	const carouselEvents = $derived([...events].sort(() => Math.random() - 0.5))
	const carouselCommunities = $derived([...communities].sort(() => Math.random() - 0.5))

	type SearchResult = ({ type: 'event' } & AppEvent) | ({ type: 'location' } & AppLocation) | ({ type: 'community' } & Community);

	let searchQuery = $state('');

	const filteredEvents = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return events.filter(
			(event) =>
				event.name.toLowerCase().includes(lowerCaseQuery) ||
				event.description.toLowerCase().includes(lowerCaseQuery)
		);
	}) as unknown as AppEvent[];

	const filteredLocations = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return locations.filter(
			(location) =>
				location.name.toLowerCase().includes(lowerCaseQuery) ||
				location.description.toLowerCase().includes(lowerCaseQuery)
		);
	}) as unknown as AppLocation[];

	const filteredCommunities = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return communities.filter(
			(community) =>
				community.name.toLowerCase().includes(lowerCaseQuery) ||
				community.description.toLowerCase().includes(lowerCaseQuery)
		);
	}) as unknown as Community[];

	const searchResults = $derived(() => {
		const eventResults = filteredEvents.map((event) => ({ ...event, type: 'event' as const }));
		const locationResults = filteredLocations.map((location) => ({
			...location,
			type: 'location' as const
		}));
		const communityResults = filteredCommunities.map((community) => ({
			...community,
			type: 'community' as const
		}));
		const results = [...eventResults, ...locationResults, ...communityResults];
		return results as any;
	}) as unknown as SearchResult[];
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
	<section class="my-4 sm:my-6 md:my-8">
		<div class="relative">
			<SearchIcon
				class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:h-5 sm:w-5"
			/>
			<Input
				bind:value={searchQuery}
				placeholder="Search for events, locations and communities"
				class="pl-8 text-base sm:pl-10 sm:text-lg"
			/>
		</div>

		{#if (searchResults ?? []).length > 0}
			<Card class="mt-3 sm:mt-4">
				<CardHeader class="pb-3 sm:pb-4">
					<CardTitle class="text-lg sm:text-xl">Search Results</CardTitle>
				</CardHeader>
				<CardContent class="grid gap-3 sm:gap-4">
					{#each searchResults as result (result)}
						{@const item = result as any}
						{#if item.type === 'event'}
							<a
								href={`/events/${item.id}`}
								class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
							>
								<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
								<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
								<span class="text-primary mt-2 inline-block text-xs font-bold uppercase">Event</span
								>
							</a>
						{:else if item.type === 'location'}
							<a
								href={`/locations/${item.id}`}
								class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
							>
								<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
								<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
								<span class="text-primary mt-2 inline-block text-xs font-bold uppercase"
									>Location</span
								>
							</a>
						{:else if item.type === 'community'}
							<a
								href={`/communities/${item.id}`}
								class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
							>
								<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
								<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
								<span class="text-primary mt-2 inline-block text-xs font-bold uppercase"
									>Community</span
								>
							</a>
						{/if}
					{/each}
				</CardContent>
			</Card>
		{/if}
	</section>

	<HomeSection
		sectionTitle="Locations"
		carouselItems={carouselLocations}
		carouselDelay={5000}
	/>
	<HomeSection
		sectionTitle="Events"
		carouselItems={carouselEvents}
		carouselDelay={4500}
	/>

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
