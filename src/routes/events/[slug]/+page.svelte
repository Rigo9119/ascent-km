<script lang="ts">
	import { page } from '$app/stores';
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
	import { getLocalTimeZone } from '@internationalized/date';
	import { events } from '$lib/data/events';

	interface EnhancedEvent {
		id: number;
		title: string;
		description: string;
		date: any;
		location: string;
		category: string;
		type: string;
		fee: boolean;
		image?: string;
		time?: string;
		capacity?: number;
		organizer?: string;
		contact?: string;
		website?: string;
		price?: string;
		requirements?: string[];
		highlights?: string[];
		longDescription?: string;
	}

	// Enhanced event data with additional details
	const enhancedEvents: EnhancedEvent[] = [
		{
			id: 1,
			title: 'Seoul Lantern Festival',
			description: 'A festival of lights on the Cheonggyecheon Stream.',
			date: events[0].date,
			location: 'Cheonggyecheon Stream, Seoul',
			category: 'cultural',
			type: 'public',
			fee: false,
			image: 'https://source.unsplash.com/random/1200x600?lantern-festival',
			time: '6:00 PM - 10:00 PM',
			capacity: 5000,
			organizer: 'Seoul Metropolitan Government',
			contact: '+82-2-120',
			website: 'https://www.seoul.go.kr',
			price: 'Free',
			requirements: ['No registration required', 'All ages welcome', 'Bring your own camera'],
			highlights: [
				'Thousands of beautiful lanterns lighting up the stream',
				'Traditional Korean lantern making workshops',
				'Cultural performances and music',
				'Food stalls with local Korean cuisine',
				'Photo opportunities with illuminated landmarks'
			],
			longDescription: 'The Seoul Lantern Festival is one of the most magical events in Korea, transforming the Cheonggyecheon Stream into a breathtaking display of light and color. This annual festival celebrates Korean culture and tradition through the art of lantern making, featuring thousands of handcrafted lanterns that tell stories of Korea\'s rich heritage. Visitors can enjoy traditional performances, participate in lantern-making workshops, and savor delicious Korean street food while taking in the spectacular light displays.'
		},
		{
			id: 2,
			title: 'Korean BBQ Meetup',
			description: 'Join us for an authentic Korean BBQ experience and meet new people',
			date: events[1].date,
			location: 'Gangnam District, Seoul',
			type: 'private',
			category: 'food',
			fee: true,
			image: 'https://source.unsplash.com/random/1200x600?korean-bbq',
			time: '7:00 PM - 10:00 PM',
			capacity: 20,
			organizer: 'Seoul Foodies Group',
			contact: 'seoulfoodies@email.com',
			website: 'https://www.seoulfoodies.com',
			price: '₩35,000 per person',
			requirements: ['Pre-registration required', 'Ages 18+', 'Dietary restrictions accommodated'],
			highlights: [
				'All-you-can-eat Korean BBQ experience',
				'Learn proper grilling techniques from locals',
				'Meet fellow food enthusiasts and travelers',
				'Includes side dishes and beverages',
				'Vegetarian options available'
			],
			longDescription: 'Experience the authentic taste of Korea at our exclusive BBQ meetup! This intimate gathering brings together food lovers from around the world to share in the traditional Korean BBQ experience. You\'ll learn the proper techniques for grilling various cuts of meat, discover the art of wrapping meat in fresh lettuce with garlic and ssamjang, and enjoy a variety of banchan (side dishes) that complement the meal perfectly. This is not just a dining experience - it\'s a cultural exchange where you\'ll make new friends while learning about Korean food culture.'
		},
		{
			id: 3,
			title: 'K-Pop Dance Workshop',
			description: 'Learn the latest K-pop dance moves with professional instructors',
			date: events[2].date,
			location: 'Hongdae, Seoul',
			type: 'public',
			category: 'music',
			fee: true,
			image: 'https://source.unsplash.com/random/1200x600?dance-workshop',
			time: '2:00 PM - 5:00 PM',
			capacity: 30,
			organizer: 'Hongdae Dance Academy',
			contact: '+82-2-1234-5678',
			website: 'https://www.hongdaedance.com',
			price: '₩50,000 per person',
			requirements: ['Pre-registration required', 'Comfortable dance clothes', 'Water bottle'],
			highlights: [
				'Learn choreography from the latest K-pop hits',
				'Professional dance instructors with industry experience',
				'Video recording of your performance',
				'Certificate of participation',
				'Networking with fellow K-pop enthusiasts'
			],
			longDescription: 'Step into the world of K-pop with our intensive dance workshop! Whether you\'re a complete beginner or an experienced dancer, our professional instructors will guide you through the latest choreography from popular K-pop groups. The workshop includes warm-up exercises, step-by-step instruction, and plenty of practice time to perfect your moves. You\'ll also learn about the history and evolution of K-pop dance styles, and get insider tips on how to improve your performance skills.'
		},
		{
			id: 4,
			title: 'Busan International Film Festival',
			description: 'Attend Asia\'s most prestigious film festival',
			date: events[3].date,
			location: 'Busan Cinema Center',
			type: 'public',
			category: 'cultural',
			fee: true,
			image: 'https://source.unsplash.com/random/1200x600?film-festival',
			time: '10:00 AM - 11:00 PM (Daily)',
			capacity: 1000,
			organizer: 'Busan International Film Festival Committee',
			contact: '+82-51-780-6000',
			website: 'https://www.biff.kr',
			price: '₩15,000 - ₩25,000 per screening',
			requirements: ['Advance ticket purchase recommended', 'Valid ID required', 'Dress code: Smart casual'],
			highlights: [
				'World premieres of Asian cinema',
				'Meet and greet sessions with directors',
				'Panel discussions and workshops',
				'Red carpet events and galas',
				'International film market'
			],
			longDescription: 'The Busan International Film Festival (BIFF) is Asia\'s most prestigious film festival, showcasing the best of Asian cinema and providing a platform for emerging filmmakers. The festival features world premieres, retrospectives, and special screenings, along with industry networking events and educational programs. Visitors can attend film screenings, participate in Q&A sessions with directors, and explore the beautiful coastal city of Busan while experiencing the vibrant atmosphere of this world-class cultural event.'
		},
		{
			id: 5,
			title: 'Seoul Marathon',
			description: 'Run through the beautiful streets of Seoul in this annual marathon',
			date: events[4].date,
			location: 'Seoul Olympic Stadium',
			type: 'public',
			category: 'sports',
			fee: true,
			image: 'https://source.unsplash.com/random/1200x600?marathon',
			time: '8:00 AM - 2:00 PM',
			capacity: 25000,
			organizer: 'Seoul Sports Council',
			contact: '+82-2-2345-6789',
			website: 'https://www.seoulmarathon.kr',
			price: '₩80,000 (Full), ₩60,000 (Half), ₩40,000 (10K)',
			requirements: ['Medical certificate required', 'Age 18+ for full marathon', 'Proper running gear'],
			highlights: [
				'Scenic route through Seoul\'s landmarks',
				'Professional timing and certification',
				'Medal and finisher certificate',
				'Post-race celebration and refreshments',
				'International runner support'
			],
			longDescription: 'Experience the thrill of running through one of Asia\'s most beautiful cities! The Seoul Marathon takes participants on a scenic journey through the heart of Seoul, passing by iconic landmarks such as Gyeongbokgung Palace, N Seoul Tower, and the Han River. The race offers multiple distance options to accommodate runners of all levels, from beginners to elite athletes. The event includes comprehensive support services, including aid stations, medical support, and enthusiastic crowds cheering you on throughout the course.'
		}
	];

	// Get the current event based on the slug (ID)
	let currentEvent = $state<EnhancedEvent | undefined>(undefined);
	let relatedEvents = $state<EnhancedEvent[]>([]);

	$effect(() => {
		const eventId = parseInt($page.params.slug);
		const foundEvent = enhancedEvents.find(event => event.id === eventId);
		currentEvent = foundEvent;
		relatedEvents = foundEvent 
			? enhancedEvents.filter(event => event.id !== foundEvent.id).slice(0, 3)
			: [];
	});

	// Handle back navigation
	function goBack() {
		goto('/events');
	}

	// Handle share functionality
	function shareEvent() {
		if (navigator.share && currentEvent) {
			navigator.share({
				title: currentEvent.title,
				text: currentEvent.description,
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
		console.log('Toggled favorite for:', currentEvent?.title);
	}

	// Handle registration
	function registerForEvent() {
		if (currentEvent) {
			console.log('Registering for event:', currentEvent.title);
			// In a real app, this would open a registration form or payment process
			alert(`Registration for ${currentEvent.title} would open here!`);
		}
	}

	function getCategoryColor(category: string): string {
		const colors = {
			cultural: 'bg-blue-100 text-blue-800',
			food: 'bg-orange-100 text-orange-800',
			music: 'bg-purple-100 text-purple-800',
			sports: 'bg-green-100 text-green-800',
			technology: 'bg-gray-100 text-gray-800',
			social: 'bg-pink-100 text-pink-800'
		};
		return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	}

	function getTypeColor(type: string): string {
		const colors = {
			public: 'bg-green-100 text-green-800',
			private: 'bg-red-100 text-red-800'
		};
		return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	}

	function getFeeColor(fee: boolean): string {
		return fee ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800';
	}
</script>

<svelte:head>
	<title>{currentEvent?.title || 'Event'} | Meet in Korea</title>
	<meta
		name="description"
		content={currentEvent?.description || 'Discover exciting events happening in Korea'}
	/>
</svelte:head>

{#if currentEvent}
	<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Back Button -->
		<div class="mb-6">
			<Button.Root 
				variant="ghost" 
				class="inline-flex items-center gap-2 text-sm" 
				onclick={goBack}
			>
				<ArrowLeft class="h-4 w-4" />
				Back to Events
			</Button.Root>
		</div>

		<!-- Hero Image -->
		<div class="mb-6 sm:mb-8">
			<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
				<img
					src={currentEvent.image || 'https://source.unsplash.com/random/1200x600?event'}
					alt={currentEvent.title}
					class="h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-black/20"></div>
				<div class="absolute bottom-4 left-4 right-4">
					<div class="flex flex-wrap gap-2 mb-3">
						<span class="px-3 py-1 text-sm font-medium rounded-full {getCategoryColor(currentEvent.category)}">
							{currentEvent.category.charAt(0).toUpperCase() + currentEvent.category.slice(1)}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full {getTypeColor(currentEvent.type)}">
							{currentEvent.type.charAt(0).toUpperCase() + currentEvent.type.slice(1)}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full {getFeeColor(currentEvent.fee)}">
							{currentEvent.fee ? 'Paid Event' : 'Free Event'}
						</span>
					</div>
					<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
						{currentEvent.title}
					</h1>
					<div class="flex items-center gap-4 text-white/90">
						<div class="flex items-center gap-2">
							<Calendar class="h-4 w-4" />
							<span class="text-sm sm:text-base">
								{format(currentEvent.date.toDate(getLocalTimeZone()), 'EEEE, MMMM do, yyyy')}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<MapPin class="h-4 w-4" />
							<span class="text-sm sm:text-base">{currentEvent.location}</span>
						</div>
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
					<h2 class="text-xl sm:text-2xl font-semibold mb-4">About This Event</h2>
					<p class="text-base sm:text-lg leading-relaxed text-muted-foreground">
						{currentEvent.longDescription || currentEvent.description}
					</p>
				</section>

				<!-- Event Highlights -->
				{#if currentEvent.highlights && currentEvent.highlights.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Event Highlights</h2>
						<ul class="space-y-3">
							{#each currentEvent.highlights as highlight}
								<li class="flex items-start gap-3">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-base text-muted-foreground">{highlight}</p>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Requirements -->
				{#if currentEvent.requirements && currentEvent.requirements.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Requirements</h2>
						<ul class="space-y-3">
							{#each currentEvent.requirements as requirement}
								<li class="flex items-start gap-3">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-base text-muted-foreground">{requirement}</p>
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
						onclick={shareEvent}
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
							<p class="text-2xl font-bold text-primary">{currentEvent.price}</p>
							<p class="text-sm text-muted-foreground">
								{currentEvent.fee ? 'Paid Event' : 'Free Event'}
							</p>
						</div>
						
						<Button.Root class="w-full" onclick={registerForEvent}>
							{currentEvent.fee ? 'Buy Tickets' : 'Register Now'}
						</Button.Root>
					</Card.Content>
				</Card.Root>

				<!-- Event Details Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title>Event Details</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						{#if currentEvent.time}
							<div class="flex items-center gap-3">
								<Clock class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Time</p>
									<p class="text-sm text-muted-foreground">{currentEvent.time}</p>
								</div>
							</div>
						{/if}

						<div class="flex items-center gap-3">
							<MapPin class="h-4 w-4 text-muted-foreground" />
							<div>
								<p class="text-sm font-medium">Location</p>
								<p class="text-sm text-muted-foreground">{currentEvent.location}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<Calendar class="h-4 w-4 text-muted-foreground" />
							<div>
								<p class="text-sm font-medium">Date</p>
								<p class="text-sm text-muted-foreground">
									{format(currentEvent.date.toDate(getLocalTimeZone()), 'EEEE, MMMM do, yyyy')}
								</p>
							</div>
						</div>

						{#if currentEvent.capacity}
							<div class="flex items-center gap-3">
								<Users class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Capacity</p>
									<p class="text-sm text-muted-foreground">{currentEvent.capacity.toLocaleString()} people</p>
								</div>
							</div>
						{/if}

						{#if currentEvent.organizer}
							<div class="flex items-center gap-3">
								<Users class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Organizer</p>
									<p class="text-sm text-muted-foreground">{currentEvent.organizer}</p>
								</div>
							</div>
						{/if}

						{#if currentEvent.contact}
							<div class="flex items-center gap-3">
								<Clock class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Contact</p>
									<p class="text-sm text-muted-foreground">{currentEvent.contact}</p>
								</div>
							</div>
						{/if}

						{#if currentEvent.website && currentEvent.website !== 'N/A'}
							<div class="flex items-center gap-3">
								<Share2 class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Website</p>
									<a href={currentEvent.website} target="_blank" rel="noopener noreferrer" class="text-sm text-primary hover:underline">
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
			<section class="mt-12 sm:mt-16 border-t pt-8 sm:pt-12">
				<h2 class="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Other Events You Might Like</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{#each relatedEvents as event (event.id)}
						<Card.Root class="group overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer" onclick={() => goto(`/events/${event.id}`)}>
							<Card.Content class="p-0">
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={event.image || 'https://source.unsplash.com/random/800x600?event'}
										alt={event.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div class="absolute top-2 left-2">
										<span class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(event.category)}">
											{event.category.charAt(0).toUpperCase() + event.category.slice(1)}
										</span>
									</div>
								</div>
								
								<!-- Content -->
								<div class="p-4">
									<h3 class="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
										{event.title}
									</h3>
									<p class="text-sm text-muted-foreground mb-3 line-clamp-2">
										{event.description}
									</p>
									
									<!-- Date and Location -->
									<div class="flex items-center justify-between text-xs text-muted-foreground">
										<div class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											<span>{format(event.date.toDate(getLocalTimeZone()), 'MMM do')}</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin class="h-3 w-3" />
											<span class="line-clamp-1">{event.location}</span>
										</div>
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
				Back to Events
			</Button.Root>
		</div>
		
		<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Event Not Found</h1>
		<p class="text-base sm:text-lg text-muted-foreground mb-8">
			The event you're looking for doesn't exist or has been moved.
		</p>
		<Button.Root onclick={goBack}>
			Return to Events
		</Button.Root>
	</div>
{/if}