<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { GoogleMap } from '@beyonk/svelte-googlemaps';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Clock from '@lucide/svelte/icons/clock';
	import Phone from '@lucide/svelte/icons/phone';
	import Globe from '@lucide/svelte/icons/globe';
	import Heart from '@lucide/svelte/icons/heart';
	import Share2 from '@lucide/svelte/icons/share-2';
	import { locations } from '$lib/data/locations';

	interface Location {
		id: number;
		name: string;
		description: string;
		address: string;
		lat: number;
		lng: number;
		image?: string;
		hours?: string;
		phone?: string;
		website?: string;
		price?: string;
		bestTime?: string;
		tips?: string[];
	}

	// Enhanced location data with additional details
	const enhancedLocations: Location[] = [
		{
			id: 1,
			name: 'Gyeongbokgung Palace',
			description: 'The main royal palace of the Joseon dynasty, Gyeongbokgung Palace is a stunning example of traditional Korean architecture and a must-visit destination in Seoul. Built in 1395, it served as the main royal palace for over 500 years and features beautiful gardens, pavilions, and the iconic Gwanghwamun Gate.',
			address: '161 Sajik-ro, Jongno-gu, Seoul, South Korea',
			lat: 37.5796,
			lng: 126.977,
			image: 'https://source.unsplash.com/random/1200x600?palace',
			hours: '9:00 AM - 6:00 PM (Closed on Tuesdays)',
			phone: '+82-2-3700-3900',
			website: 'https://www.royalpalace.go.kr',
			price: '₩3,000 (Adults)',
			bestTime: 'Spring (March-May) for cherry blossoms, Fall (September-November) for autumn colors',
			tips: [
				'Visit early morning to avoid crowds and see the changing of the guard ceremony',
				'Wear comfortable shoes as the palace grounds are extensive',
				'Rent a hanbok (traditional Korean dress) for free admission and great photos',
				'Combine with a visit to nearby Bukchon Hanok Village'
			]
		},
		{
			id: 2,
			name: 'N Seoul Tower',
			description: 'A communication and observation tower on Namsan Mountain in central Seoul, offering breathtaking panoramic views of the city. The tower stands 236 meters tall and is one of Seoul\'s most iconic landmarks, especially beautiful at night when the city lights up.',
			address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
			lat: 37.5512,
			lng: 126.9882,
			image: 'https://source.unsplash.com/random/1200x600?tower',
			hours: '10:00 AM - 11:00 PM',
			phone: '+82-2-3455-9277',
			website: 'https://www.seoultower.co.kr',
			price: '₩16,000 (Observatory)',
			bestTime: 'Sunset or evening for the best city views and romantic atmosphere',
			tips: [
				'Take the cable car up Namsan Mountain for a scenic ride',
				'Visit during sunset for spectacular views of the city',
				'Book a table at the rotating restaurant for a unique dining experience',
				'Bring a camera for amazing photo opportunities'
			]
		},
		{
			id: 3,
			name: 'Bukchon Hanok Village',
			description: 'A traditional Korean village with a long history located between Gyeongbok Palace, Changdeok Palace and Jongmyo Royal Shrine. This charming neighborhood features hundreds of traditional Korean houses (hanok) and offers visitors a glimpse into traditional Korean life.',
			address: 'Gyedong-gil, Jongno-gu, Seoul, South Korea',
			lat: 37.5828,
			lng: 126.9836,
			image: 'https://source.unsplash.com/random/1200x600?traditional-village',
			hours: 'Always open (Residential area)',
			phone: 'N/A',
			website: 'N/A',
			price: 'Free',
			bestTime: 'Early morning or late afternoon for fewer crowds and better photos',
			tips: [
				'Be respectful as this is a residential area - keep noise levels down',
				'Visit early morning for the best photos without crowds',
				'Wear comfortable shoes for walking on the hilly streets',
				'Many hanok offer traditional cultural experiences and tea ceremonies'
			]
		},
		{
			id: 4,
			name: 'Myeong-dong',
			description: 'One of the primary shopping districts in Seoul, Myeong-dong is a vibrant area known for its shopping, street food, and entertainment. This bustling district offers everything from international brands to local Korean cosmetics and street food vendors.',
			address: 'Myeongdong-gil, Jung-gu, Seoul, South Korea',
			lat: 37.5633,
			lng: 126.9842,
			image: 'https://source.unsplash.com/random/1200x600?shopping-district',
			hours: '10:00 AM - 10:00 PM (Most shops)',
			phone: 'N/A',
			website: 'N/A',
			price: 'Free (Shopping costs vary)',
			bestTime: 'Evening (6-10 PM) for the most vibrant atmosphere and street food',
			tips: [
				'Visit in the evening for the best street food experience',
				'Bring cash for street food vendors',
				'Look for tax-free shopping opportunities if you\'re a tourist',
				'Combine shopping with a visit to nearby Namsan Tower'
			]
		}
	];

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// Get the current location based on the slug (ID)
	let currentLocation = $state<Location | undefined>(undefined);
	let relatedLocations = $state<Location[]>([]);

	$effect(() => {
		const locationId = parseInt($page.params.slug);
		const foundLocation = enhancedLocations.find(loc => loc.id === locationId);
		currentLocation = foundLocation;
		relatedLocations = foundLocation 
			? enhancedLocations.filter(loc => loc.id !== foundLocation.id).slice(0, 3)
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
		content={currentLocation?.description || 'Discover amazing places to visit and meet people in Korea'}
	/>
</svelte:head>

{#if currentLocation}
	<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Back Button -->
		<div class="mb-6">
			<Button.Root 
				variant="ghost" 
				class="inline-flex items-center gap-2 text-sm" 
				onclick={goBack}
			>
				<ArrowLeft class="h-4 w-4" />
				Back to Locations
			</Button.Root>
		</div>

		<!-- Hero Image -->
		<div class="mb-6 sm:mb-8">
			<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
				<img
					src={currentLocation.image || 'https://source.unsplash.com/random/1200x600?korea'}
					alt={currentLocation.name}
					class="h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-black/20"></div>
				<div class="absolute bottom-4 left-4 right-4">
					<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
						{currentLocation.name}
					</h1>
					<div class="flex items-center gap-2 text-white/90">
						<MapPin class="h-4 w-4" />
						<span class="text-sm sm:text-base">{currentLocation.address}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
			<!-- Left Column - Main Content -->
			<div class="lg:col-span-2 space-y-6 sm:space-y-8">
				<!-- Description -->
				<section>
					<h2 class="text-xl sm:text-2xl font-semibold mb-4">About</h2>
					<p class="text-base sm:text-lg leading-relaxed text-muted-foreground">
						{currentLocation.description}
					</p>
				</section>

				<!-- Map -->
				<section>
					<h2 class="text-xl sm:text-2xl font-semibold mb-4">Location</h2>
					<div class="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
						{#if !apiKey}
							<div class="flex h-full items-center justify-center bg-muted rounded-lg">
								<p class="text-sm sm:text-base text-center px-4">Please add your Google Maps API key to see the map.</p>
							</div>
						{:else}
							<GoogleMap 
								{apiKey} 
								center={{ lat: currentLocation.lat, lng: currentLocation.lng }} 
								zoom={15} 
							/>
						{/if}
					</div>
				</section>

				<!-- Tips -->
				{#if currentLocation.tips && currentLocation.tips.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Tips for Visitors</h2>
						<ul class="space-y-3">
							{#each currentLocation.tips as tip}
								<li class="flex items-start gap-3">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-base text-muted-foreground">{tip}</p>
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
					<Button.Root 
						variant="outline" 
						size="icon" 
						class="h-10 w-10" 
						onclick={shareLocation}
					>
						<Share2 class="h-4 w-4" />
					</Button.Root>
					<Button.Root 
						variant="outline" 
						size="icon" 
						class="h-10 w-10"
						onclick={toggleFavorite}
					>
						<Heart class="h-4 w-4" />
					</Button.Root>
				</div>

				<!-- Information Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title>Information</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						{#if currentLocation.hours}
							<div class="flex items-center gap-3">
								<Clock class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Hours</p>
									<p class="text-sm text-muted-foreground">{currentLocation.hours}</p>
								</div>
							</div>
						{/if}

						{#if currentLocation.phone}
							<div class="flex items-center gap-3">
								<Phone class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Phone</p>
									<p class="text-sm text-muted-foreground">{currentLocation.phone}</p>
								</div>
							</div>
						{/if}

						{#if currentLocation.website && currentLocation.website !== 'N/A'}
							<div class="flex items-center gap-3">
								<Globe class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Website</p>
									<a href={currentLocation.website} target="_blank" rel="noopener noreferrer" class="text-sm text-primary hover:underline">
										Visit Website
									</a>
								</div>
							</div>
						{/if}

						{#if currentLocation.price}
							<div class="flex items-center gap-3">
								<div class="h-4 w-4 text-muted-foreground">₩</div>
								<div>
									<p class="text-sm font-medium">Price</p>
									<p class="text-sm text-muted-foreground">{currentLocation.price}</p>
								</div>
							</div>
						{/if}

						{#if currentLocation.bestTime}
							<div class="flex items-center gap-3">
								<Clock class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Best Time to Visit</p>
									<p class="text-sm text-muted-foreground">{currentLocation.bestTime}</p>
								</div>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>
		</div>

		<!-- Related Locations -->
		{#if relatedLocations.length > 0}
			<section class="mt-12 sm:mt-16 border-t pt-8 sm:pt-12">
				<h2 class="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Other Locations You Might Like</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{#each relatedLocations as location (location.id)}
						<Card.Root class="group overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer" onclick={() => goto(`/locations/${location.id}`)}>
							<Card.Content class="p-0">
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={location.image || 'https://source.unsplash.com/random/800x600?korea'}
										alt={location.name}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
								
								<!-- Content -->
								<div class="p-4">
									<h3 class="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
										{location.name}
									</h3>
									<p class="text-sm text-muted-foreground mb-3 line-clamp-2">
										{location.description}
									</p>
									
									<!-- Address -->
									<div class="flex items-center gap-1 text-xs text-muted-foreground">
										<MapPin class="h-3 w-3" />
										<span class="line-clamp-1">{location.address}</span>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			</section>
		{/if}
	</div>
{:else}
	<!-- 404 Not Found -->
	<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 text-center">
		<div class="mb-6">
			<Button.Root 
				variant="ghost" 
				class="inline-flex items-center gap-2 text-sm" 
				onclick={goBack}
			>
				<ArrowLeft class="h-4 w-4" />
				Back to Locations
			</Button.Root>
		</div>
		
		<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Location Not Found</h1>
		<p class="text-base sm:text-lg text-muted-foreground mb-8">
			The location you're looking for doesn't exist or has been moved.
		</p>
		<Button.Root onclick={goBack}>
			Return to Locations
		</Button.Root>
	</div>
{/if}