<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Clock from '@lucide/svelte/icons/clock';
	import User from '@lucide/svelte/icons/user';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { goto } from '$app/navigation';

	// Mock blog data
	const blogPosts = [
		{
			id: 1,
			slug: 'top-10-must-visit-cafes-in-seoul',
			title: 'Top 10 Must-Visit Cafes in Seoul',
			description: 'Discover the most Instagram-worthy cafes in Seoul, from traditional Korean tea houses to modern specialty coffee shops.',
			image: 'https://source.unsplash.com/random/800x600?cafe',
			author: 'Sarah Kim',
			date: '2024-01-15',
			readTime: '5 min read',
			category: 'Food & Culture'
		},
		{
			id: 2,
			slug: 'complete-guide-to-korean-street-food',
			title: 'A Complete Guide to Korean Street Food',
			description: 'Everything you need to know about Korean street food, from popular dishes to where to find the best vendors.',
			image: 'https://source.unsplash.com/random/800x600?street-food',
			author: 'Mike Chen',
			date: '2024-01-12',
			readTime: '8 min read',
			category: 'Food & Culture'
		},
		{
			id: 3,
			slug: 'hidden-gems-in-busan-beyond-tourist-trail',
			title: 'Hidden Gems in Busan: Beyond the Tourist Trail',
			description: 'Explore the lesser-known attractions in Busan that most tourists miss, from secret beaches to local markets.',
			image: 'https://source.unsplash.com/random/800x600?busan',
			author: 'Emma Wilson',
			date: '2024-01-10',
			readTime: '6 min read',
			category: 'Travel'
		},
		{
			id: 4,
			slug: 'learning-korean-tips-from-language-exchange',
			title: 'Learning Korean: Tips from Language Exchange Meetups',
			description: 'Practical advice for learning Korean through language exchange programs and cultural immersion.',
			image: 'https://source.unsplash.com/random/800x600?language',
			author: 'David Park',
			date: '2024-01-08',
			readTime: '7 min read',
			category: 'Language & Culture'
		},
		{
			id: 5,
			slug: 'kpop-culture-understanding-hallyu-wave',
			title: 'K-Pop Culture: Understanding the Hallyu Wave',
			description: 'An in-depth look at the global phenomenon of K-Pop and its impact on Korean culture and tourism.',
			image: 'https://source.unsplash.com/random/800x600?kpop',
			author: 'Lisa Thompson',
			date: '2024-01-05',
			readTime: '10 min read',
			category: 'Entertainment'
		},
		{
			id: 6,
			slug: 'traditional-korean-festivals-you-should-experience',
			title: 'Traditional Korean Festivals You Should Experience',
			description: 'A year-round guide to the most important traditional festivals and celebrations in Korea.',
			image: 'https://source.unsplash.com/random/800x600?festival',
			author: 'James Lee',
			date: '2024-01-03',
			readTime: '9 min read',
			category: 'Culture'
		}
	];

	// Format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog | Meet in Korea</title>
	<meta
		name="description"
		content="Discover insights, tips, and stories about Korean culture, travel, food, and community"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header Section -->
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4">Blog</h1>
		<p class="text-sm sm:text-base text-muted-foreground">
			Discover insights, tips, and stories about Korean culture, travel, food, and community
		</p>
	</div>

	<!-- Blog Posts Grid -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each blogPosts as post (post.id)}
			<div class="group overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer h-full bg-card border rounded-lg" onclick={() => goto(`/blog/${post.slug}`)}>
				<!-- Image -->
				<div class="relative aspect-[4/3] overflow-hidden">
					<img
						src={post.image}
						alt={post.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<div class="absolute top-3 left-3">
						<span class="inline-flex items-center rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
							{post.category}
						</span>
					</div>
				</div>
				
				<!-- Content -->
				<div class="p-4 sm:p-5 flex flex-col h-full">
					<div class="flex-1">
						<h2 class="font-semibold text-lg sm:text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
							{post.title}
						</h2>
						<p class="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
							{post.description}
						</p>
						
						<!-- Meta Information -->
						<div class="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
							<div class="flex items-center gap-1">
								<User class="h-3 w-3 sm:h-4 sm:w-4" />
								<span>{post.author}</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="flex items-center gap-1">
									<Calendar class="h-3 w-3 sm:h-4 sm:w-4" />
									<span>{formatDate(post.date)}</span>
								</div>
								<div class="flex items-center gap-1">
									<Clock class="h-3 w-3 sm:h-4 sm:w-4" />
									<span>{post.readTime}</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Read More Button - Always at bottom left -->
					<div class="mt-auto pt-2">
						<a href="/blog/{post.slug}" class="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-primary/80 transition-colors" onclick={(e) => e.stopPropagation()}>
							Read More
							<ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Load More Button -->
	<div class="mt-8 sm:mt-12 text-center">
		<button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
			Load More Posts
		</button>
	</div>
</div> 