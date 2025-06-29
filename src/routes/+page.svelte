<script lang="ts">
	import HomeSection from '@/lib/components/home-carousel-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';
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
			id: 1,
			name: 'Gyeongbokgung Palace',
			address: '161 Sajik-ro, Jongno-gu, Seoul',
			description: 'The main royal palace of the Joseon dynasty.',
			image: 'https://source.unsplash.com/random/800x600?palace'
		},
		{
			id: 2,
			name: 'N Seoul Tower',
			address: '105 Namsangongwon-gil, Yongsan-gu, Seoul',
			description: 'An observation and communication tower on Namsan Mountain.',
			image: 'https://source.unsplash.com/random/800x600?tower'
		},
		{
			id: 3,
			name: 'Bukchon Hanok Village',
			address: 'Gye-dong-gil, Jongno-gu, Seoul',
			description: 'A traditional Korean village with a long history.',
			image: 'https://source.unsplash.com/random/800x600?village'
		},
		{
			id: 4,
			name: 'Myeongdong Shopping Street',
			address: 'Myeongdong-gil, Jung-gu, Seoul',
			description: 'One of the primary shopping districts in Seoul.',
			image: 'https://source.unsplash.com/random/800x600?street'
		}
	];

	const mockCommunityItems = [
		{
			id: 1,
			name: 'K-Pop Fans Seoul',
			address: 'Online & Seoul',
			description: 'A vibrant community for K-Pop lovers to share news, music, and organize meetups.',
			image: 'https://source.unsplash.com/random/800x600?kpop'
		},
		{
			id: 2,
			name: 'Korean Foodies',
			address: 'Seoul & Busan',
			description: 'Discover and share the best Korean food spots, recipes, and culinary experiences.',
			image: 'https://source.unsplash.com/random/800x600?korean-food'
		},
		{
			id: 3,
			name: 'Language Exchange Korea',
			address: 'Various locations',
			description: 'Practice Korean and English with friendly members in a supportive environment.',
			image: 'https://source.unsplash.com/random/800x600?language'
		},
		{
			id: 4,
			name: 'Seoul Explorers',
			address: 'Seoul',
			description: 'Join us to explore hidden gems and famous spots in Seoul with fellow adventurers.',
			image: 'https://source.unsplash.com/random/800x600?seoul'
		},
	];
</script>

<svelte:head>
	<title>Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<h1 class="py-2 text-2xl font-bold sm:py-4 sm:text-3xl md:text-4xl lg:text-5xl">Meet in Korea</h1>

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

	<TrendingSection sectionTitle="Top locations" sectionItems={mockCarouselItems} />
	<TrendingSection sectionTitle="Trending events" sectionItems={mockCarouselItems} />
	<TrendingSection sectionTitle="Popular communities" sectionItems={mockCommunityItems} />
	
</div>
