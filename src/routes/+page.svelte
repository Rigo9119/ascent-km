<script lang="ts">
	import HomeSection from '@/lib/components/home-carousel-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';
	import { Input } from '$lib/components/ui/input';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { events} from '$lib/data/events';
	import { locations, } from '$lib/data/locations';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { AppEvent, AppLocation } from '@/lib/types';
	import { mockCarouselItems, mockCommunityItems } from '@/lib/data/home';

	type SearchResult =
		| ({ type: 'event' } & AppEvent)
		| ({ type: 'location' } & AppLocation);

	let searchQuery = $state('');

	const filteredEvents = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return events.filter(
			(event) =>
				event.name.toLowerCase().includes(lowerCaseQuery) ||
				event.description.toLowerCase().includes(lowerCaseQuery)
		);
	}) as unknown as Event[];

	const filteredLocations = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return locations.filter(
			(location) =>
				location.name.toLowerCase().includes(lowerCaseQuery) ||
				location.description.toLowerCase().includes(lowerCaseQuery)
		);
	}) as unknown as Location[];

	const searchResults = $derived(() => {
		const eventResults = filteredEvents.map((event) => ({ ...event, type: 'event' as const }));
		const locationResults = filteredLocations.map((location) => ({
			...location,
			type: 'location' as const
		}));
		const results = [...eventResults, ...locationResults];
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
	<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-rose-600">Meet in Korea</h1>

	<!-- Search Section -->
	<section class="my-4 sm:my-6 md:my-8">
		<div class="relative">
			<SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
			<Input bind:value={searchQuery} placeholder="Search for events, locations and communities" class="pl-8 sm:pl-10 text-base sm:text-lg" />
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
							<a href={'/events'} class="block p-3 sm:p-4 rounded-lg hover:bg-muted transition-colors">
								<h3 class="font-semibold text-sm sm:text-base">{item.title}</h3>
								<p class="text-xs sm:text-sm text-muted-foreground mt-1">{item.description}</p>
								<span class="text-xs font-bold uppercase text-primary mt-2 inline-block">Event</span>
							</a>
						{:else if item.type === 'location'}
							<a href={'/locations'} class="block p-3 sm:p-4 rounded-lg hover:bg-muted transition-colors">
								<h3 class="font-semibold text-sm sm:text-base">{item.name}</h3>
								<p class="text-xs sm:text-sm text-muted-foreground mt-1">{item.description}</p>
								<span class="text-xs font-bold uppercase text-primary mt-2 inline-block">Location</span>
							</a>
						{/if}
					{/each}
				</CardContent>
			</Card>
		{/if}
	</section>

	<HomeSection sectionTitle="Locations" carouselItems={mockCarouselItems} carouselDelay={5000} />
	<HomeSection sectionTitle="Events" carouselItems={mockCarouselItems} carouselDelay={4500} />

	<TrendingSection sectionTitle="Top locations" sectionItems={mockCarouselItems} urlSection="locations" />
	<TrendingSection sectionTitle="Trending events" sectionItems={mockCarouselItems} urlSection="events" />
	<TrendingSection sectionTitle="Popular communities" sectionItems={mockCommunityItems} urlSection="communities" />
	
</div>
