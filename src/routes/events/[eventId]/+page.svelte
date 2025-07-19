<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Calendar from '@lucide/svelte/icons/calendar';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Clock from '@lucide/svelte/icons/clock';
	import Users from '@lucide/svelte/icons/users';
	import Share2 from '@lucide/svelte/icons/share-2';
	import Heart from '@lucide/svelte/icons/heart';
	import Ticket from '@lucide/svelte/icons/ticket';
	import { format } from 'date-fns';
	import type { AppEvent, AppEventWithJoinedData } from '@/lib/types';
	import { getCategoryColor, getTypeColor, getFeeColor } from '@/lib/utils';
	import RelatedItems from '@/lib/components/related-items.svelte';

	interface EventPageData {
		appEvent: AppEventWithJoinedData,
		urlSegments: string
	}

	let { data }: { data: EventPageData}= $props();
	const { appEvent, urlSegments } = data;

	let relatedEvents = $state<AppEvent[]>([] as AppEvent[]);

	function goBack() {
		goto('/events');
	}

	// Handle share functionality
	function shareEvent() {
		if (navigator.share && appEvent as unknown as AppEvent) {
			navigator.share({
				title: appEvent?.name,
				text: appEvent?.description,
				url: window.location.href
			});
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
			// You could add a toast notification here
		}
	}

	function toggleFavorite() {
		console.log('Toggled favorite for:', appEvent?.name);
	}

	function registerForEvent() {
		if (appEvent) {
			console.log('Registering for event:', appEvent.name);

			alert(`Registration for ${appEvent.name} would open here!`);
		}
	}
</script>

<svelte:head>
	<title>{appEvent?.name || 'Event'} | Next Roots</title>
	<meta
		name="description"
		content={appEvent?.description || 'Discover exciting events happening in Korea'}
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Back Button -->
	<div class="mb-6">
		<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
			<ArrowLeft class="h-4 w-4" />
			Back to Events
		</Button.Root>
	</div>

	<!-- Hero Image -->
	<div class="mb-6 sm:mb-8">
		<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
			<img
				src={appEvent?.image || 'https://source.unsplash.com/random/1200x600?event'}
				alt={appEvent?.name}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/20"></div>
			<div class="absolute right-4 bottom-4 left-4">
				<div class="mb-3 flex flex-wrap gap-2">
					<span
						class="rounded-full px-3 py-1 text-sm font-medium {getCategoryColor(
							appEvent?.category_name
						)}"
					>
						{appEvent?.category_name}
					</span>
					<span class="rounded-full px-3 py-1 text-sm font-medium {getFeeColor(appEvent?.is_free || false)}">
						{appEvent?.is_free ? 'Paid Event' : 'Free Event'}
					</span>
				</div>
				<h1 class="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
					{appEvent?.name}
				</h1>
				<div class="flex items-center gap-4 text-white/90">
					<div class="flex items-center gap-2">
						<Calendar class="h-4 w-4" />
						<span class="text-sm sm:text-base">
							{appEvent?.date ? format(appEvent.date, 'EEEE, MMMM do, yyyy') : 'N/A'}
						</span>
					</div>
					<div class="flex items-center gap-2">
						<MapPin class="h-4 w-4" />
						<span class="text-sm sm:text-base">
							{appEvent?.location_name}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
		<!-- Left Column - Main Content -->
		<div class="space-y-6 sm:space-y-8 lg:col-span-2">
			<!-- Description -->
			<section>
				<h2 class="mb-4 text-xl font-semibold sm:text-2xl">About This Event</h2>
				<p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
					{appEvent?.long_description || appEvent?.description}
				</p>
			</section>

			<!-- Event Highlights -->
			{#if appEvent?.highlights && appEvent.highlights.length > 0}
				<section>
					<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Event Highlights</h2>
					<ul class="space-y-3">
						{#each appEvent.highlights as highlight}
							<li class="flex items-start gap-3">
								<div class="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
								<p class="text-muted-foreground text-base">{highlight}</p>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
			<!-- Requirements -->
			{#if appEvent?.requirements && appEvent.requirements.length > 0}
				<section>
					<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Requirements</h2>
					<ul class="space-y-3">
						{#each appEvent.requirements as requirement}
							<li class="flex items-start gap-3">
								<div class="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
								<p class="text-muted-foreground text-base">{requirement}</p>
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
				<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={shareEvent}>
					<Share2 class="h-4 w-4" />
				</Button.Root>
				<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={toggleFavorite}>
					<Heart class="h-4 w-4" />
				</Button.Root>
			</div>

			<!-- Registration Card -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Ticket class="h-5 w-5" />
						Registration
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="text-center">
						<p class="text-primary text-2xl font-bold">{appEvent?.price}</p>
						<p class="text-muted-foreground text-sm">
							{appEvent?.is_free ? 'Paid Event' : 'Free Event'}
						</p>
					</div>

					<Button.Root class="w-full" onclick={registerForEvent}>
						{appEvent?.is_free ? 'Buy Tickets' : 'Register Now'}
					</Button.Root>
				</Card.Content>
			</Card.Root>

			<!-- Event Details Card -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Event Details</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					{#if appEvent?.time}
						<div class="flex items-center gap-3">
							<Clock class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Time</p>
								<p class="text-muted-foreground text-sm">{appEvent.time}</p>
							</div>
						</div>
					{/if}

					<div class="flex items-center gap-3">
						<MapPin class="text-muted-foreground h-4 w-4" />
						<div>
							<p class="text-sm font-medium">Location</p>
							<p class="text-muted-foreground text-sm">{appEvent?.location_name}</p>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<Calendar class="text-muted-foreground h-4 w-4" />
						<div>
							<p class="text-sm font-medium">Date</p>
							<p class="text-muted-foreground text-sm">
								{appEvent?.date ? format(new Date(appEvent.date), 'EEEE, MMMM do, yyyy') : 'N/A'}
							</p>
						</div>
					</div>

					{#if appEvent?.capacity}
						<div class="flex items-center gap-3">
							<Users class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Capacity</p>
								<p class="text-muted-foreground text-sm">
									{appEvent.capacity.toLocaleString()} people
								</p>
							</div>
						</div>
					{/if}

					{#if appEvent?.organizer}
						<div class="flex items-center gap-3">
							<Users class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Organizer</p>
								<p class="text-muted-foreground text-sm">{appEvent.organizer}</p>
							</div>
						</div>
					{/if}

					{#if appEvent?.contact}
						<div class="flex items-center gap-3">
							<Clock class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Contact</p>
								<p class="text-muted-foreground text-sm">{appEvent.contact}</p>
							</div>
						</div>
					{/if}

					{#if appEvent?.website && appEvent.website !== 'N/A'}
						<div class="flex items-center gap-3">
							<Share2 class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Website</p>
								<a
									href={appEvent.website}
									target="_blank"
									rel="noopener noreferrer"
									class="text-primary text-sm hover:underline"
								>
									Visit Website
								</a>
							</div>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	</div>

	<!-- Related Events -->
	{#if relatedEvents.length > 0}
		<RelatedItems relatedItems={relatedEvents as AppEvent[]} urlSegment={urlSegments[0]}/>
	{/if}
</div>