<script lang="ts">
	import { GoogleMap } from '@beyonk/svelte-googlemaps';

	import CardItem from '$lib/components/card/card-item.svelte';
	import { locations } from '$lib/data/locations';

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// Add a fallback image to each location if missing
	const locationsWithImages = locations.map((loc) => ({
		...loc,
		image: loc.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
	}));
</script>

<svelte:head>
	<title>Locations | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header Section -->
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4">Locations</h1>
		<p class="text-sm sm:text-base text-muted-foreground">
			Discover amazing places to visit and meet people in Korea
		</p>
	</div>

	<!-- Map Section -->
	<section class="mb-6 sm:mb-8">
		<div class="h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
			{#if !apiKey}
				<div class="flex h-full items-center justify-center bg-muted rounded-lg">
					<p class="text-sm sm:text-base md:text-lg text-center px-4">Please add your Google Maps API key to see the map.</p>
				</div>
			{:else}
				<GoogleMap {apiKey} center={{ lat: 37.5665, lng: 126.978 }} zoom={10} />
			{/if}
		</div>
	</section>

	<!-- Locations Grid Section -->
	<section>
		<h2 class="text-xl font-semibold sm:text-2xl md:text-3xl mb-4 sm:mb-6">Popular Locations</h2>
		<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
			{#each locationsWithImages as location (location.id)}
				<li>
					<CardItem cardItem={location} />
				</li>
			{/each}
		</ul>
	</section>
</div>
