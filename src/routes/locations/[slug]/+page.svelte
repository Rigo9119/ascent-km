<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Button from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { AppLocation } from '@/lib/types';
	import { locations } from '@/lib/data/locations';
	import HeroLocationsSlug from '@/routes/locations/components/hero-locations-slug.svelte';
	import RelatedItems from '@/lib/components/related-items.svelte';
	import RightContent from '../components/right-content.svelte';
	import LeftContent from '../components/left-content.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { locationSlug } = data;
	// Get the current location based on the slug (ID)
	let currentLocation = $state<AppLocation | undefined>(undefined);
	let relatedLocations = $state<AppLocation[]>([]);

	$effect(() => {
		const foundLocation = locations.find((loc) => loc.id === locationSlug);
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
	<HeroLocationsSlug
		heroSrc={currentLocation?.image as string}
		heroAlt={currentLocation?.name as string}
		heroName={currentLocation?.name as string}
		heroAddress={currentLocation?.address as string}
	/>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
		<!-- Left Column - Main Content -->
		<LeftContent currentLocation={currentLocation as AppLocation}/>

		<!-- Right Column - Sidebar -->
		<RightContent {shareLocation} {toggleFavorite} {currentLocation} />
	</div>

	<!-- Related Locations -->
	{#if relatedLocations.length > 0}
		<RelatedItems relatedItems={relatedLocations as AppLocation[]} />
	{/if}
</div>
