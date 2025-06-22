<script lang="ts">
	import { GoogleMap } from '@beyonk/svelte-googlemaps';

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { locations } from '$lib/data/locations';

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<svelte:head>
	<title>Locations | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="h-full p-2">
	<section class="mb-4 h-1/2">
		{#if !apiKey}
			<div class="flex h-full items-center justify-center">
				<p class="text-2xl">Please add your Google Maps API key to see the map.</p>
			</div>
		{:else}
			<GoogleMap {apiKey} center={{ lat: 37.5665, lng: 126.978 }} zoom={10} />
		{/if}
	</section>
	<section>
		<ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each locations as location (location)}
				<li>
					<Card>
						<CardHeader>
							<CardTitle>{location.name}</CardTitle>
							<CardDescription>{location.address}</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{location.description}</p>
						</CardContent>
						<CardFooter>
							<p>Latitude: {location.lat}, Longitude: {location.lng}</p>
						</CardFooter>
					</Card>
				</li>
			{/each}
		</ul>
	</section>
</div>
