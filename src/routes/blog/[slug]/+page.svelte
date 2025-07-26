<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Clock from '@lucide/svelte/icons/clock';
	import User from '@lucide/svelte/icons/user';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Share2 from '@lucide/svelte/icons/share-2';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import BookmarkPlus from '@lucide/svelte/icons/bookmark-plus';

	interface BlogPost {
		id: number;
		slug: string;
		title: string;
		description: string;
		image: string;
		author: string;
		date: string;
		readTime: string;
		category: string;
		content: string;
	}

	// Mock blog data (in a real app, this would come from a database)
	const blogPosts: BlogPost[] = [
		{
			id: 1,
			slug: 'top-10-must-visit-cafes-in-seoul',
			title: 'Top 10 Must-Visit Cafes in Seoul',
			description:
				'Discover the most Instagram-worthy cafes in Seoul, from traditional Korean tea houses to modern specialty coffee shops.',
			image: 'https://source.unsplash.com/random/1200x600?cafe',
			author: 'Sarah Kim',
			date: '2024-01-15',
			readTime: '5 min read',
			category: 'Food & Culture',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Seoul's cafe culture is a vibrant blend of tradition and innovation, offering everything from centuries-old tea houses to cutting-edge specialty coffee shops. Whether you're a coffee connoisseur or simply looking for a cozy spot to relax, Seoul's cafes provide the perfect backdrop for both social gatherings and quiet contemplation.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">1. Traditional Korean Tea Houses</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Experience the authentic taste of Korean tea culture at traditional tea houses scattered throughout the city. These serene establishments offer a peaceful escape from the bustling city streets, serving premium Korean teas like green tea, barley tea, and traditional herbal blends.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">2. Modern Specialty Coffee Shops</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Seoul's specialty coffee scene has exploded in recent years, with baristas competing in international competitions and cafes serving single-origin beans from around the world. These establishments focus on the art of coffee making, from bean selection to brewing techniques.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">3. Instagram-Worthy Design Cafes</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Many cafes in Seoul are designed with social media in mind, featuring stunning interiors, unique architectural elements, and photogenic food presentations. These cafes have become popular destinations for both locals and tourists seeking the perfect Instagram shot.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">4. Themed Cafes</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					From cat cafes to book cafes, Seoul offers a variety of themed establishments that combine coffee culture with unique experiences. These cafes provide not just great beverages but also memorable experiences that go beyond traditional cafe offerings.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">5. Rooftop Cafes</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Take in breathtaking views of Seoul's skyline from rooftop cafes located throughout the city. These elevated establishments offer a unique perspective on the city while serving excellent coffee and light meals.
				</p>
			`
		},
		{
			id: 2,
			slug: 'complete-guide-to-korean-street-food',
			title: 'A Complete Guide to Korean Street Food',
			description:
				'Everything you need to know about Korean street food, from popular dishes to where to find the best vendors.',
			image: 'https://source.unsplash.com/random/1200x600?street-food',
			author: 'Mike Chen',
			date: '2024-01-12',
			readTime: '8 min read',
			category: 'Food & Culture',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Korean street food is a vibrant and essential part of the country's culinary landscape, offering quick, delicious, and affordable meals that reflect the rich flavors and traditions of Korean cuisine.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Popular Street Food Dishes</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					From tteokbokki (spicy rice cakes) to hotteok (sweet filled pancakes), Korean street food offers a diverse range of flavors and textures. Each dish tells a story of Korean culinary tradition and innovation.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Best Locations for Street Food</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Seoul's street food scene is concentrated in several key areas, including Myeongdong, Hongdae, and traditional markets like Gwangjang Market. Each location offers its own unique selection of street food specialties.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Seasonal Street Food</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Korean street food changes with the seasons, offering refreshing treats in summer and warming comfort foods in winter. Understanding these seasonal variations can enhance your street food experience.
				</p>
			`
		},
		{
			id: 3,
			slug: 'hidden-gems-in-busan-beyond-tourist-trail',
			title: 'Hidden Gems in Busan: Beyond the Tourist Trail',
			description:
				'Explore the lesser-known attractions in Busan that most tourists miss, from secret beaches to local markets.',
			image: 'https://source.unsplash.com/random/1200x600?busan',
			author: 'Emma Wilson',
			date: '2024-01-10',
			readTime: '6 min read',
			category: 'Travel',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Busan, Korea's second-largest city, offers much more than its famous beaches and seafood markets. Venture beyond the well-trodden tourist paths to discover authentic local experiences and hidden treasures.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Secret Beaches and Coastal Walks</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					While Haeundae Beach gets all the attention, Busan is home to numerous hidden beaches and coastal trails that offer peaceful escapes and stunning views without the crowds.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Local Markets and Neighborhoods</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Explore the authentic side of Busan through its local markets and residential neighborhoods, where you can experience daily life and discover unique local businesses and eateries.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Cultural and Historical Sites</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Busan's rich history is reflected in its temples, museums, and historical sites, many of which are overlooked by tourists but offer fascinating insights into the city's past and present.
				</p>
			`
		},
		{
			id: 4,
			slug: 'learning-korean-tips-from-language-exchange',
			title: 'Learning Korean: Tips from Language Exchange Meetups',
			description:
				'Practical advice for learning Korean through language exchange programs and cultural immersion.',
			image: 'https://source.unsplash.com/random/1200x600?language',
			author: 'David Park',
			date: '2024-01-08',
			readTime: '7 min read',
			category: 'Language & Culture',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Learning Korean through language exchange programs offers a unique opportunity to practice with native speakers while gaining cultural insights that go beyond textbook learning.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Finding Language Exchange Partners</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					There are numerous ways to find language exchange partners in Korea, from online platforms to local meetup groups and university programs. Each method offers different advantages for different learning styles.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Effective Learning Strategies</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Maximize your language exchange sessions by preparing topics in advance, using a mix of formal and informal language, and incorporating cultural elements into your conversations.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Cultural Immersion Activities</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Combine language learning with cultural activities like cooking classes, traditional crafts, and local festivals to enhance your understanding of Korean culture and language.
				</p>
			`
		},
		{
			id: 5,
			slug: 'kpop-culture-understanding-hallyu-wave',
			title: 'K-Pop Culture: Understanding the Hallyu Wave',
			description:
				'An in-depth look at the global phenomenon of K-Pop and its impact on Korean culture and tourism.',
			image: 'https://source.unsplash.com/random/1200x600?kpop',
			author: 'Lisa Thompson',
			date: '2024-01-05',
			readTime: '10 min read',
			category: 'Entertainment',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					The Hallyu Wave, or Korean Wave, has transformed Korea's cultural landscape and created unprecedented global interest in Korean entertainment, fashion, and lifestyle.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">The Rise of K-Pop</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					K-Pop's global success is the result of strategic planning, innovative production techniques, and the power of social media. Understanding this phenomenon requires looking at both the music and the business behind it.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Cultural Impact and Tourism</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					K-Pop has significantly boosted Korean tourism, with fans traveling from around the world to visit filming locations, attend concerts, and experience Korean culture firsthand.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Beyond Music: Fashion and Beauty</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					The K-Pop influence extends far beyond music, shaping global trends in fashion, beauty, and lifestyle. Korean beauty products and fashion brands have gained international recognition through K-Pop associations.
				</p>
			`
		},
		{
			id: 6,
			slug: 'traditional-korean-festivals-you-should-experience',
			title: 'Traditional Korean Festivals You Should Experience',
			description:
				'A year-round guide to the most important traditional festivals and celebrations in Korea.',
			image: 'https://source.unsplash.com/random/1200x600?festival',
			author: 'James Lee',
			date: '2024-01-03',
			readTime: '9 min read',
			category: 'Culture',
			content: `
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Korea's traditional festivals offer a window into the country's rich cultural heritage, providing opportunities to experience ancient customs, traditional performances, and community celebrations.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Spring Festivals</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Spring brings cherry blossom festivals and traditional celebrations that mark the beginning of the agricultural year. These festivals celebrate renewal and the beauty of nature.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Summer Celebrations</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Summer festivals focus on water, with traditional boat races, water fights, and celebrations that help communities stay cool while maintaining cultural traditions.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Autumn Harvest Festivals</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Autumn is harvest time, and festivals celebrate the bounty of the land with traditional foods, music, and dance performances that honor agricultural traditions.
				</p>
				
				<h2 class="text-xl sm:text-2xl font-semibold mb-4 mt-8">Winter Traditions</h2>
				<p class="mb-6 text-base sm:text-lg leading-relaxed">
					Winter festivals focus on family, community, and preparation for the new year, with traditional games, foods, and ceremonies that bring people together during the cold months.
				</p>
			`
		}
	];

	// Get the current post based on the slug
	let currentPost = $state<BlogPost | undefined>(undefined);
	let relatedPosts = $state<BlogPost[]>([]);
	let isBookmarked = $state(false);

	$effect(() => {
		const foundPost = blogPosts.find((post) => post.slug === $page.params.slug);
		currentPost = foundPost;
		relatedPosts = foundPost
			? blogPosts.filter((post) => post.id !== foundPost.id).slice(0, 3)
			: [];
	});

	// Format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Handle back navigation
	function goBack() {
		goto('/blog');
	}

	// Handle share functionality
	function sharePost() {
		if (navigator.share && currentPost) {
			navigator.share({
				title: currentPost.title,
				text: currentPost.description,
				url: window.location.href
			});
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
			// You could add a toast notification here
		}
	}

	// Handle bookmark functionality
	function toggleBookmark() {
		isBookmarked = !isBookmarked;
		// In a real app, you would save this to a database or localStorage
		if (isBookmarked) {
			// Add to bookmarks
			console.log('Added to bookmarks:', currentPost?.title);
		} else {
			// Remove from bookmarks
			console.log('Removed from bookmarks:', currentPost?.title);
		}
	}
</script>

<svelte:head>
	<title>{currentPost?.title || 'Blog Post'} | Next Roots</title>
	<meta
		name="description"
		content={currentPost?.description ||
			'Read our latest blog post about Korean culture, travel, and community'}
	/>
</svelte:head>

{#if currentPost}
	<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Back Button -->
		<div class="mb-6">
			<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
				<ArrowLeft class="h-4 w-4" />
				Back to Blog
			</Button.Root>
		</div>

		<!-- Hero Image -->
		<div class="mb-6 sm:mb-8">
			<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
				<img src={currentPost.image} alt={currentPost.title} class="h-full w-full object-cover" />
				<div class="absolute top-4 left-4">
					<span
						class="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
					>
						{currentPost.category}
					</span>
				</div>
			</div>
		</div>

		<!-- Article Header -->
		<header class="mb-8 sm:mb-12">
			<h1 class="mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
				{currentPost.title}
			</h1>
			<p class="text-muted-foreground mb-6 text-base leading-relaxed sm:mb-8 sm:text-lg">
				{currentPost.description}
			</p>

			<!-- Meta Information -->
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
				<div class="text-muted-foreground flex items-center gap-4 text-sm sm:text-base">
					<div class="flex items-center gap-2">
						<User class="h-4 w-4" />
						<span>{currentPost.author}</span>
					</div>
					<div class="flex items-center gap-2">
						<Calendar class="h-4 w-4" />
						<span>{formatDate(currentPost.date)}</span>
					</div>
					<div class="flex items-center gap-2">
						<Clock class="h-4 w-4" />
						<span>{currentPost.readTime}</span>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="flex items-center gap-2">
					<Button.Root variant="outline" size="icon" class="h-9 w-9" onclick={sharePost}>
						<Share2 class="h-4 w-4" />
					</Button.Root>
					<Button.Root variant="outline" size="icon" class="h-9 w-9" onclick={toggleBookmark}>
						{#if isBookmarked}
							<Bookmark class="h-4 w-4 fill-current" />
						{:else}
							<BookmarkPlus class="h-4 w-4" />
						{/if}
					</Button.Root>
				</div>
			</div>
		</header>

		<!-- Article Content -->
		<article class="prose prose-lg mb-12 max-w-none sm:mb-16">
			{@html currentPost.content}
		</article>

		<!-- Related Posts -->
		{#if relatedPosts.length > 0}
			<section class="border-t pt-8 sm:pt-12">
				<h2 class="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">Related Posts</h2>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{#each relatedPosts as post (post.id)}
						<Card.Root
							class="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
							onclick={() => goto(`/blog/${post.slug}`)}
						>
							<Card.Content class="p-0">
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={post.image}
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div class="absolute top-2 left-2">
										<span
											class="inline-flex items-center rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
										>
											{post.category}
										</span>
									</div>
								</div>

								<!-- Content -->
								<div class="p-4">
									<h3
										class="group-hover:text-primary mb-2 line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
									>
										{post.title}
									</h3>
									<p class="text-muted-foreground mb-3 line-clamp-2 text-sm">
										{post.description}
									</p>

									<!-- Meta Information -->
									<div class="text-muted-foreground flex items-center justify-between text-xs">
										<div class="flex items-center gap-1">
											<User class="h-3 w-3" />
											<span>{post.author}</span>
										</div>
										<div class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											<span>{formatDate(post.date)}</span>
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
	<div class="mx-auto max-w-4xl px-4 py-4 text-center sm:px-6 sm:py-6 md:px-8 md:py-8">
		<div class="mb-6">
			<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
				<ArrowLeft class="h-4 w-4" />
				Back to Blog
			</Button.Root>
		</div>

		<h1 class="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">Post Not Found</h1>
		<p class="text-muted-foreground mb-8 text-base sm:text-lg">
			The blog post you're looking for doesn't exist or has been moved.
		</p>
		<Button.Root onclick={goBack}>Return to Blog</Button.Root>
	</div>
{/if}
