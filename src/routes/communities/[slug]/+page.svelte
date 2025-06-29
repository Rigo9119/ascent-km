<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Users from '@lucide/svelte/icons/users';
	import Calendar from '@lucide/svelte/icons/calendar';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import Share2 from '@lucide/svelte/icons/share-2';
	import Heart from '@lucide/svelte/icons/heart';
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import Star from '@lucide/svelte/icons/star';
	import { format } from 'date-fns';

	interface Community {
		id: number;
		name: string;
		description: string;
		image: string;
		address: string;
		category: string;
		memberCount: number;
		createdDate: string;
		organizer: string;
		contact?: string;
		website?: string;
		meetingFrequency?: string;
		nextMeeting?: string;
		longDescription?: string;
		tags?: string[];
		rules?: string[];
		upcomingEvents?: Array<{
			id: number;
			title: string;
			date: string;
			location: string;
			description: string;
		}>;
		recentDiscussions?: Array<{
			id: number;
			title: string;
			author: string;
			date: string;
			replies: number;
		}>;
	}

	// Enhanced community data with additional details
	const enhancedCommunities: Community[] = [
		{
			id: 1,
			name: 'K-Pop Fans',
			description: 'A community for K-Pop lovers to share news, music, and meetups.',
			image: 'https://source.unsplash.com/random/1200x600?kpop',
			address: 'Online',
			category: 'Entertainment',
			memberCount: 1250,
			createdDate: '2023-01-15',
			organizer: 'Sarah Kim',
			contact: 'kpopfans@email.com',
			website: 'https://www.kpopfans.kr',
			meetingFrequency: 'Weekly',
			nextMeeting: '2024-01-20T14:00:00',
			tags: ['K-Pop', 'Music', 'Dance', 'Korean Culture'],
			rules: [
				'Be respectful to all members and artists',
				'No hate speech or bullying',
				'Share only official content and news',
				'Keep discussions relevant to K-Pop'
			],
			longDescription: 'Welcome to the largest K-Pop community in Korea! We bring together fans from all over the world to celebrate Korean pop music and culture. Our community hosts regular meetups, dance workshops, album listening parties, and fan events. Whether you\'re a long-time K-Pop fan or just discovering this amazing music genre, you\'ll find a welcoming space here to connect with fellow enthusiasts.',
			upcomingEvents: [
				{
					id: 1,
					title: 'BTS Album Listening Party',
					date: '2024-01-25T19:00:00',
					location: 'Hongdae Music Cafe',
					description: 'Join us for a special listening party of the latest BTS album release.'
				},
				{
					id: 2,
					title: 'K-Pop Dance Workshop',
					date: '2024-02-01T15:00:00',
					location: 'Gangnam Dance Studio',
					description: 'Learn the latest K-Pop dance moves with professional instructors.'
				}
			],
			recentDiscussions: [
				{
					id: 1,
					title: 'Best K-Pop Albums of 2024',
					author: 'MusicLover123',
					date: '2024-01-18',
					replies: 45
				},
				{
					id: 2,
					title: 'Upcoming K-Pop Concerts in Seoul',
					author: 'ConcertGoer',
					date: '2024-01-17',
					replies: 32
				},
				{
					id: 3,
					title: 'K-Pop Fashion Trends Discussion',
					author: 'Fashionista',
					date: '2024-01-16',
					replies: 28
				}
			]
		},
		{
			id: 2,
			name: 'Korean Foodies',
			description: 'Discover and share the best Korean food spots and recipes.',
			image: 'https://source.unsplash.com/random/1200x600?korean-food',
			address: 'Seoul',
			category: 'Food & Culture',
			memberCount: 890,
			createdDate: '2023-03-10',
			organizer: 'Chef Min',
			contact: 'koreanfoodies@email.com',
			website: 'https://www.koreanfoodies.com',
			meetingFrequency: 'Bi-weekly',
			nextMeeting: '2024-01-22T18:00:00',
			tags: ['Korean Food', 'Cooking', 'Restaurants', 'Recipes'],
			rules: [
				'Share authentic Korean recipes and experiences',
				'Be respectful of different dietary preferences',
				'Include photos when sharing food',
				'No spam or promotional content'
			],
			longDescription: 'Calling all food lovers! Our Korean Foodies community is dedicated to exploring the rich and diverse world of Korean cuisine. From traditional dishes to modern fusion, we share recipes, restaurant recommendations, cooking tips, and organize food tours throughout Seoul. Whether you\'re a seasoned chef or just learning to cook Korean food, you\'ll find inspiration and friendship in our community.',
			upcomingEvents: [
				{
					id: 1,
					title: 'Traditional Korean Cooking Class',
					date: '2024-01-22T18:00:00',
					location: 'Seoul Cooking Academy',
					description: 'Learn to make authentic Korean dishes from scratch.'
				},
				{
					id: 2,
					title: 'Street Food Tour in Myeongdong',
					date: '2024-01-29T17:00:00',
					location: 'Myeongdong Street Food Market',
					description: 'Explore the best street food vendors in Seoul.'
				}
			],
			recentDiscussions: [
				{
					id: 1,
					title: 'Best Bibimbap Recipe',
					author: 'ChefMin',
					date: '2024-01-18',
					replies: 23
				},
				{
					id: 2,
					title: 'Hidden Gem Restaurants in Gangnam',
					author: 'FoodExplorer',
					date: '2024-01-17',
					replies: 19
				},
				{
					id: 3,
					title: 'Vegetarian Korean Food Options',
					author: 'VeggieLover',
					date: '2024-01-16',
					replies: 15
				}
			]
		},
		{
			id: 3,
			name: 'Language Exchange',
			description: 'Practice Korean and English with friendly members.',
			image: 'https://source.unsplash.com/random/1200x600?language',
			address: 'Various locations',
			category: 'Education',
			memberCount: 2100,
			createdDate: '2022-11-05',
			organizer: 'David Park',
			contact: 'languageexchange@email.com',
			website: 'https://www.languageexchange.kr',
			meetingFrequency: 'Daily',
			nextMeeting: '2024-01-19T20:00:00',
			tags: ['Language Learning', 'Korean', 'English', 'Cultural Exchange'],
			rules: [
				'Be patient and supportive of language learners',
				'Practice both Korean and English equally',
				'Correct mistakes kindly and constructively',
				'Respect cultural differences'
			],
			longDescription: 'Our Language Exchange community brings together Korean and English speakers for mutual learning and cultural exchange. We offer structured conversation sessions, grammar workshops, cultural discussions, and informal meetups. Whether you\'re a beginner or advanced learner, you\'ll find partners to practice with and improve your language skills in a friendly, supportive environment.',
			upcomingEvents: [
				{
					id: 1,
					title: 'Korean-English Conversation Club',
					date: '2024-01-19T20:00:00',
					location: 'Itaewon Community Center',
					description: 'Structured conversation practice for all levels.'
				},
				{
					id: 2,
					title: 'Grammar Workshop: Korean Particles',
					date: '2024-01-26T19:00:00',
					location: 'Online via Zoom',
					description: 'Learn the essential Korean particles with examples.'
				}
			],
			recentDiscussions: [
				{
					id: 1,
					title: 'Best Apps for Learning Korean',
					author: 'LanguageLearner',
					date: '2024-01-18',
					replies: 67
				},
				{
					id: 2,
					title: 'Common Korean Slang Words',
					author: 'KoreanNative',
					date: '2024-01-17',
					replies: 42
				},
				{
					id: 3,
					title: 'Study Group for TOPIK Exam',
					author: 'ExamPrep',
					date: '2024-01-16',
					replies: 38
				}
			]
		},
		{
			id: 4,
			name: 'Seoul Explorers',
			description: 'Join us to explore hidden gems and famous spots in Seoul.',
			image: 'https://source.unsplash.com/random/1200x600?seoul',
			address: 'Seoul',
			category: 'Travel & Adventure',
			memberCount: 750,
			createdDate: '2023-06-20',
			organizer: 'Emma Wilson',
			contact: 'seoulexplorers@email.com',
			website: 'https://www.seoulexplorers.com',
			meetingFrequency: 'Weekly',
			nextMeeting: '2024-01-21T10:00:00',
			tags: ['Seoul', 'Travel', 'Photography', 'Adventure'],
			rules: [
				'Share your discoveries and experiences',
				'Include photos and detailed descriptions',
				'Be respectful of local customs and people',
				'Follow safety guidelines during meetups'
			],
			longDescription: 'Discover the real Seoul with our community of explorers! We venture beyond the tourist trails to find hidden cafes, secret viewpoints, local markets, and authentic experiences that most visitors miss. Our members share insider tips, organize walking tours, and help newcomers navigate the city like locals. From historic neighborhoods to modern districts, we explore every corner of this amazing city.',
			upcomingEvents: [
				{
					id: 1,
					title: 'Bukchon Hanok Village Walking Tour',
					date: '2024-01-21T10:00:00',
					location: 'Bukchon Hanok Village',
					description: 'Explore traditional Korean architecture and culture.'
				},
				{
					id: 2,
					title: 'Sunset Photography at N Seoul Tower',
					date: '2024-01-28T17:00:00',
					location: 'N Seoul Tower',
					description: 'Capture stunning sunset views of Seoul skyline.'
				}
			],
			recentDiscussions: [
				{
					id: 1,
					title: 'Best Cherry Blossom Spots in Seoul',
					author: 'PhotoLover',
					date: '2024-01-18',
					replies: 34
				},
				{
					id: 2,
					title: 'Hidden Cafes in Hongdae',
					author: 'CafeHunter',
					date: '2024-01-17',
					replies: 26
				},
				{
					id: 3,
					title: 'Best Time to Visit Gyeongbokgung',
					author: 'HistoryBuff',
					date: '2024-01-16',
					replies: 22
				}
			]
		},
		{
			id: 5,
			name: 'Tech in Korea',
			description: 'Connect with tech enthusiasts and professionals in Korea.',
			image: 'https://source.unsplash.com/random/1200x600?technology',
			address: 'Online & Seoul',
			category: 'Technology',
			memberCount: 1100,
			createdDate: '2023-02-12',
			organizer: 'Mike Chen',
			contact: 'techinkorea@email.com',
			website: 'https://www.techinkorea.kr',
			meetingFrequency: 'Monthly',
			nextMeeting: '2024-01-30T19:00:00',
			tags: ['Technology', 'Startups', 'Innovation', 'Networking'],
			rules: [
				'Share relevant tech news and insights',
				'Be professional and constructive in discussions',
				'No self-promotion without value',
				'Respect intellectual property'
			],
			longDescription: 'Join Korea\'s premier tech community for professionals, entrepreneurs, and enthusiasts! We discuss the latest trends in Korean technology, share insights about the startup ecosystem, and provide networking opportunities. From AI and robotics to gaming and fintech, we cover all aspects of Korea\'s vibrant tech scene. Our community includes developers, investors, founders, and tech enthusiasts from around the world.',
			upcomingEvents: [
				{
					id: 1,
					title: 'AI in Korea: Trends and Opportunities',
					date: '2024-01-30T19:00:00',
					location: 'Gangnam Startup Hub',
					description: 'Panel discussion on AI developments in Korea.'
				},
				{
					id: 2,
					title: 'Tech Startup Pitch Night',
					date: '2024-02-06T18:00:00',
					location: 'Seoul Innovation Center',
					description: 'Watch Korean startups pitch their ideas to investors.'
				}
			],
			recentDiscussions: [
				{
					id: 1,
					title: 'Korean Gaming Industry Trends',
					author: 'GameDev',
					date: '2024-01-18',
					replies: 41
				},
				{
					id: 2,
					title: 'Best Coworking Spaces in Seoul',
					author: 'RemoteWorker',
					date: '2024-01-17',
					replies: 29
				},
				{
					id: 3,
					title: 'Korean Fintech Startups to Watch',
					author: 'FintechAnalyst',
					date: '2024-01-16',
					replies: 35
				}
			]
		}
	];

	// Get the current community based on the slug (ID)
	let currentCommunity = $state<Community | undefined>(undefined);
	let relatedCommunities = $state<Community[]>([]);
	let isMember = $state(false);

	$effect(() => {
		const communityId = parseInt($page.params.slug);
		const foundCommunity = enhancedCommunities.find(community => community.id === communityId);
		currentCommunity = foundCommunity;
		relatedCommunities = foundCommunity 
			? enhancedCommunities.filter(community => community.id !== foundCommunity.id).slice(0, 3)
			: [];
	});

	// Handle back navigation
	function goBack() {
		goto('/communities');
	}

	// Handle share functionality
	function shareCommunity() {
		if (navigator.share && currentCommunity) {
			navigator.share({
				title: currentCommunity.name,
				text: currentCommunity.description,
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
		console.log('Toggled favorite for:', currentCommunity?.name);
	}

	// Handle join/leave community
	function toggleMembership() {
		isMember = !isMember;
		if (isMember) {
			console.log('Joined community:', currentCommunity?.name);
		} else {
			console.log('Left community:', currentCommunity?.name);
		}
	}

	// Format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Format member count
	function formatMemberCount(count: number) {
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}k`;
		}
		return count.toString();
	}
</script>

<svelte:head>
	<title>{currentCommunity?.name || 'Community'} | Meet in Korea</title>
	<meta
		name="description"
		content={currentCommunity?.description || 'Join communities and connect with people who share your interests'}
	/>
</svelte:head>

{#if currentCommunity}
	<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Back Button -->
		<div class="mb-6">
			<Button.Root 
				variant="ghost" 
				class="inline-flex items-center gap-2 text-sm" 
				onclick={goBack}
			>
				<ArrowLeft class="h-4 w-4" />
				Back to Communities
			</Button.Root>
		</div>

		<!-- Hero Image -->
		<div class="mb-6 sm:mb-8">
			<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
				<img
					src={currentCommunity.image}
					alt={currentCommunity.name}
					class="h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-black/20"></div>
				<div class="absolute bottom-4 left-4 right-4">
					<div class="flex flex-wrap gap-2 mb-3">
						<span class="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
							{currentCommunity.category}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
							{currentCommunity.meetingFrequency}
						</span>
					</div>
					<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
						{currentCommunity.name}
					</h1>
					<div class="flex items-center gap-4 text-white/90">
						<div class="flex items-center gap-2">
							<MapPin class="h-4 w-4" />
							<span class="text-sm sm:text-base">{currentCommunity.address}</span>
						</div>
						<div class="flex items-center gap-2">
							<Users class="h-4 w-4" />
							<span class="text-sm sm:text-base">{formatMemberCount(currentCommunity.memberCount)} members</span>
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
					<h2 class="text-xl sm:text-2xl font-semibold mb-4">About This Community</h2>
					<p class="text-base sm:text-lg leading-relaxed text-muted-foreground">
						{currentCommunity.longDescription || currentCommunity.description}
					</p>
				</section>

				<!-- Tags -->
				{#if currentCommunity.tags && currentCommunity.tags.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Tags</h2>
						<div class="flex flex-wrap gap-2">
							{#each currentCommunity.tags as tag}
								<span class="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
									{tag}
								</span>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Community Rules -->
				{#if currentCommunity.rules && currentCommunity.rules.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Community Rules</h2>
						<ul class="space-y-3">
							{#each currentCommunity.rules as rule}
								<li class="flex items-start gap-3">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<p class="text-base text-muted-foreground">{rule}</p>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Upcoming Events -->
				{#if currentCommunity.upcomingEvents && currentCommunity.upcomingEvents.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Upcoming Events</h2>
						<div class="space-y-4">
							{#each currentCommunity.upcomingEvents as event}
								<Card.Root class="p-4">
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<h3 class="font-semibold text-lg mb-2">{event.title}</h3>
											<p class="text-sm text-muted-foreground mb-2">{event.description}</p>
											<div class="flex items-center gap-4 text-xs text-muted-foreground">
												<div class="flex items-center gap-1">
													<Calendar class="h-3 w-3" />
													<span>{formatDate(event.date)}</span>
												</div>
												<div class="flex items-center gap-1">
													<MapPin class="h-3 w-3" />
													<span>{event.location}</span>
												</div>
											</div>
										</div>
									</div>
								</Card.Root>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Recent Discussions -->
				{#if currentCommunity.recentDiscussions && currentCommunity.recentDiscussions.length > 0}
					<section>
						<h2 class="text-xl sm:text-2xl font-semibold mb-4">Recent Discussions</h2>
						<div class="space-y-3">
							{#each currentCommunity.recentDiscussions as discussion}
								<Card.Root class="p-4">
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<h3 class="font-semibold text-base mb-1">{discussion.title}</h3>
											<div class="flex items-center gap-4 text-xs text-muted-foreground">
												<span>by {discussion.author}</span>
												<span>{discussion.date}</span>
												<div class="flex items-center gap-1">
													<MessageCircle class="h-3 w-3" />
													<span>{discussion.replies} replies</span>
												</div>
											</div>
										</div>
									</div>
								</Card.Root>
							{/each}
						</div>
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
						onclick={shareCommunity}
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

				<!-- Join Community Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<Users class="h-5 w-5" />
							{isMember ? 'Leave Community' : 'Join Community'}
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="text-center">
							<p class="text-2xl font-bold text-primary">{formatMemberCount(currentCommunity.memberCount)}</p>
							<p class="text-sm text-muted-foreground">members</p>
						</div>
						
						<Button.Root 
							class="w-full" 
							variant={isMember ? "outline" : "default"}
							onclick={toggleMembership}
						>
							{#if isMember}
								<Minus class="h-4 w-4 mr-2" />
								Leave Community
							{:else}
								<Plus class="h-4 w-4 mr-2" />
								Join Community
							{/if}
						</Button.Root>
					</Card.Content>
				</Card.Root>

				<!-- Community Details Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title>Community Details</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="flex items-center gap-3">
							<Users class="h-4 w-4 text-muted-foreground" />
							<div>
								<p class="text-sm font-medium">Organizer</p>
								<p class="text-sm text-muted-foreground">{currentCommunity.organizer}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<Calendar class="h-4 w-4 text-muted-foreground" />
							<div>
								<p class="text-sm font-medium">Created</p>
								<p class="text-sm text-muted-foreground">{formatDate(currentCommunity.createdDate)}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<MapPin class="h-4 w-4 text-muted-foreground" />
							<div>
								<p class="text-sm font-medium">Location</p>
								<p class="text-sm text-muted-foreground">{currentCommunity.address}</p>
							</div>
						</div>

						{#if currentCommunity.meetingFrequency}
							<div class="flex items-center gap-3">
								<Calendar class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Meeting Frequency</p>
									<p class="text-sm text-muted-foreground">{currentCommunity.meetingFrequency}</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.nextMeeting}
							<div class="flex items-center gap-3">
								<Calendar class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Next Meeting</p>
									<p class="text-sm text-muted-foreground">{formatDate(currentCommunity.nextMeeting)}</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.contact}
							<div class="flex items-center gap-3">
								<MessageCircle class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Contact</p>
									<p class="text-sm text-muted-foreground">{currentCommunity.contact}</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.website && currentCommunity.website !== 'N/A'}
							<div class="flex items-center gap-3">
								<Share2 class="h-4 w-4 text-muted-foreground" />
								<div>
									<p class="text-sm font-medium">Website</p>
									<a href={currentCommunity.website} target="_blank" rel="noopener noreferrer" class="text-sm text-primary hover:underline">
										Visit Website
									</a>
								</div>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>
		</div>

		<!-- Related Communities -->
		{#if relatedCommunities.length > 0}
			<section class="mt-12 sm:mt-16 border-t pt-8 sm:pt-12">
				<h2 class="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Other Communities You Might Like</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{#each relatedCommunities as community (community.id)}
						<Card.Root class="group overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer" onclick={() => goto(`/communities/${community.id}`)}>
							<Card.Content class="p-0">
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={community.image}
										alt={community.name}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div class="absolute top-2 left-2">
										<span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
											{community.category}
										</span>
									</div>
								</div>
								
								<!-- Content -->
								<div class="p-4">
									<h3 class="font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
										{community.name}
									</h3>
									<p class="text-sm text-muted-foreground mb-3 line-clamp-2">
										{community.description}
									</p>
									
									<!-- Member count and location -->
									<div class="flex items-center justify-between text-xs text-muted-foreground">
										<div class="flex items-center gap-1">
											<Users class="h-3 w-3" />
											<span>{formatMemberCount(community.memberCount)}</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin class="h-3 w-3" />
											<span class="line-clamp-1">{community.address}</span>
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
				Back to Communities
			</Button.Root>
		</div>
		
		<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Community Not Found</h1>
		<p class="text-base sm:text-lg text-muted-foreground mb-8">
			The community you're looking for doesn't exist or has been moved.
		</p>
		<Button.Root onclick={goBack}>
			Return to Communities
		</Button.Root>
	</div>
{/if}