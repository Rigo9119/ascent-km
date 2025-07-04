<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { GoogleMap } from '@beyonk/svelte-googlemaps';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import Clock from '@lucide/svelte/icons/clock';
	import Phone from '@lucide/svelte/icons/phone';
	import Globe from '@lucide/svelte/icons/globe';
	import Heart from '@lucide/svelte/icons/heart';
	import Share2 from '@lucide/svelte/icons/share-2';
	import type { AppLocation } from '@/lib/types';
	import { locations } from '@/lib/data/locations';
	import HeroSlug from '@/lib/components/hero-slug.svelte';
	import RelatedItems from '@/lib/components/related-items.svelte';

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// Get the current location based on the slug (ID)
	let currentLocation = $state<AppLocation | undefined>(undefined);
	let relatedLocations = $state<AppLocation[]>([]);

	$effect(() => {
		const locationId = parseInt($page.params.slug);
		const foundLocation = locations.find((loc) => loc.id === locationId);
		currentLocation = foundLocation;
		relatedLocations = foundLocation
			? locations.filter((loc) => loc.id !== foundLocation.id).slice(0, 3)
			: [];
	});

	// Handle back navigation
	function goBack() {
		goto('/locations');
	}

	// Handle share functionality
	function shareLocation() {
		if (navigator.share && currentLocation) {
			navigator.share({
				title: currentLocation.name,
				text: currentLocation.description,
				url: window.location.href
			});
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
			// You could add a toast notification here
		}
	}

	// Handle favorite functionality
	function toggleFavorite() {
		// In a real app, you would save this to a database or localStorage
		console.log('Toggled favorite for:', currentLocation?.name);
	}
</script>

<svelte:head>
	<title>{currentLocation?.name || 'Location'} | Meet in Korea</title>
	<meta
		name="description"
		content={currentLocation?.description ||
			'Discover amazing places to visit and meet people in Korea'}
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Back Button -->
	<div class="mb-6">
		<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
			<ArrowLeft class="h-4 w-4" />
			Back to Locations
		</Button.Root>
	</div>

	<!-- Hero Image -->
	<HeroSlug
		heroSrc={currentLocation?.image as string}
		heroAlt={currentLocation?.name as string}
		heroName={currentLocation?.name as string}
		heroAddress={currentLocation?.address as string}
	/>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
		<!-- Left Column - Main Content -->
		<div class="space-y-6 sm:space-y-8 lg:col-span-2">
			<!-- Description -->
			<section>
				<h2 class="mb-4 text-xl font-semibold sm:text-2xl">About</h2>
				<p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
					{currentLocation?.description}
				</p>
			</section>

			<!-- Map -->
			<section>
				<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Location</h2>
				<div class="h-64 overflow-hidden rounded-lg sm:h-80 md:h-96">
					{#if !apiKey}
						<div class="bg-muted flex h-full items-center justify-center rounded-lg">
							<p class="px-4 text-center text-sm sm:text-base">
								Please add your Google Maps API key to see the map.
							</p>
						</div>
					{:else}
						<GoogleMap
							{apiKey}
							center={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}
							zoom={15}
						/>
					{/if}
				</div>
			</section>

			<!-- Tips -->
			{#if currentLocation?.tips && currentLocation.tips.length > 0}
				<section>
					<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Tips for Visitors</h2>
					<ul class="space-y-3">
						{#each currentLocation.tips as tip}
							<li class="flex items-start gap-3">
								<div class="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
								<p class="text-muted-foreground text-base">{tip}</p>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>

		<!-- Right Column - Sidebar -->
		<div class="space-y-6 sm:space-y-8">
			<!-- Action Buttons -->
			<div class="flex gap-2">
				<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={shareLocation}>
					<Share2 class="h-4 w-4" />
				</Button.Root>
				<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={toggleFavorite}>
					<Heart class="h-4 w-4" />
				</Button.Root>
			</div>

			<!-- Information Card -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Information</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					{#if currentLocation?.openHour}
						<div class="flex items-center gap-3">
							<Clock class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Hours</p>
								<p class="text-muted-foreground text-sm">
									{currentLocation.openHour} - {currentLocation.closeHour}
								</p>
							</div>
						</div>
					{/if}

					{#if currentLocation?.phone}
						<div class="flex items-center gap-3">
							<Phone class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Phone</p>
								<p class="text-muted-foreground text-sm">{currentLocation.phone}</p>
							</div>
						</div>
					{/if}

					{#if currentLocation?.website && currentLocation.website !== 'N/A'}
						<div class="flex items-center gap-3">
							<Globe class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Website</p>
								<a
									href={currentLocation.website}
									target="_blank"
									rel="noopener noreferrer"
									class="text-primary text-sm hover:underline"
								>
									Visit Website
								</a>
							</div>
						</div>
					{/if}

					{#if currentLocation?.price}
						<div class="flex items-center gap-3">
							<div class="text-muted-foreground h-4 w-4">₩</div>
							<div>
								<p class="text-sm font-medium">Price</p>
								<p class="text-muted-foreground text-sm">{currentLocation.price}</p>
							</div>
						</div>
					{/if}

					{#if currentLocation?.bestTime}
						<div class="flex items-center gap-3">
							<Clock class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Best Time to Visit</p>
								<p class="text-muted-foreground text-sm">{currentLocation.bestTime}</p>
							</div>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	</div>

	<!-- Related Locations -->
	{#if relatedLocations.length > 0}
		<RelatedItems relatedItems={relatedLocations as AppLocation[]}/>
	{/if}
</div>
