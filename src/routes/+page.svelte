<script lang="ts">
	import HomeSection from '@/routes/components/home-section.svelte';
	import TrendingSection from '@/routes/components/trending-section.svelte';
	import { Input } from '$lib/components/ui/input';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { events, type Event } from '$lib/data/events';
	import { locations, type Location } from '$lib/data/locations';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	type SearchResult =
		| ({ type: 'event' } & Event)
		| ({ type: 'location' } & Location);

	let searchQuery = $state('');

	const filteredEvents = $derived(() => {
		if (!searchQuery) return [];
		const lowerCaseQuery = searchQuery.toLowerCase();
		return events.filter(
			(event) =>
				event.title.toLowerCase().includes(lowerCaseQuery) ||
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

	const mockCarouselItems = [
		{
			name: 'thing 1'
		},
		{
			name: 'thing 2'
		},
		{
			name: 'trending 3'
		},
		{
			name: 'trending 4'
		}
	];
</script>

<svelte:head>
	<title>Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="w-full p-2">
	<h1 class="py-4 text-5xl font-bold">Incredible page</h1>

	<!-- Search Section -->
	<section class="my-8">
		<div class="relative">
			<SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
			<Input bind:value={searchQuery} placeholder="Search for events or locations..." class="pl-10 text-lg" />
		</div>

		{#if (searchResults ?? []).length > 0}
			<Card class="mt-4">
				<CardHeader>
					<CardTitle>Search Results</CardTitle>
				</CardHeader>
				<CardContent class="grid gap-4">
					{#each searchResults as result (result)}
						{@const item = result as any}
						{#if item.type === 'event'}
							<a href={'/events'} class="block p-4 rounded-lg hover:bg-muted">
								<h3 class="font-semibold">{item.title}</h3>
								<p class="text-sm text-muted-foreground">{item.description}</p>
								<span class="text-xs font-bold uppercase text-primary">Event</span>
							</a>
						{:else if item.type === 'location'}
							<a href={'/locations'} class="block p-4 rounded-lg hover:bg-muted">
								<h3 class="font-semibold">{item.name}</h3>
								<p class="text-sm text-muted-foreground">{item.description}</p>
								<span class="text-xs font-bold uppercase text-primary">Location</span>
							</a>
						{/if}
					{/each}
				</CardContent>
			</Card>
		{/if}
	</section>

	<HomeSection sectionTitle="Locations" carouselItems={mockCarouselItems} carouselDelay={5000} />
	<HomeSection sectionTitle="Events" carouselItems={mockCarouselItems} carouselDelay={4500} />

	<TrendingSection sectionTitle="Top locations" sectionItems={mockCarouselItems} />
	<TrendingSection sectionTitle="Trending events" sectionItems={mockCarouselItems} />
</div>
