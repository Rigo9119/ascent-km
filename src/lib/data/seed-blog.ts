import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
	throw new Error('Supabase URL or Service Key is missing from environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const blogPosts = [
	{
		slug: 'top-10-must-visit-cafes-in-seoul',
		title: 'Top 10 Must-Visit Cafes in Seoul',
		description:
			'Discover the most Instagram-worthy cafes in Seoul, from traditional Korean tea houses to modern specialty coffee shops.',
		image: 'https://source.unsplash.com/random/1200x600?cafe',
		author_name: 'Sarah Kim',
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
			`,
		read_time: 5,
		is_published: true,
		published_at: '2024-01-15T12:00:00Z'
	},
	{
		slug: 'complete-guide-to-korean-street-food',
		title: 'A Complete Guide to Korean Street Food',
		description:
			'Everything you need to know about Korean street food, from popular dishes to where to find the best vendors.',
		image: 'https://source.unsplash.com/random/1200x600?street-food',
		author_name: 'Mike Chen',
		category: 'Food & Culture',
		content: `...`, // Content omitted for brevity
		read_time: 8,
		is_published: true,
		published_at: '2024-01-12T12:00:00Z'
	},
	{
		slug: 'hidden-gems-in-busan-beyond-tourist-trail',
		title: 'Hidden Gems in Busan: Beyond the Tourist Trail',
		description:
			'Explore the lesser-known attractions in Busan that most tourists miss, from secret beaches to local markets.',
		image: 'https://source.unsplash.com/random/1200x600?busan',
		author_name: 'Emma Wilson',
		category: 'Travel',
		content: `...`, // Content omitted for brevity
		read_time: 6,
		is_published: true,
		published_at: '2024-01-10T12:00:00Z'
	},
	{
		slug: 'learning-korean-tips-from-language-exchange',
		title: 'Learning Korean: Tips from Language Exchange Meetups',
		description:
			'Practical advice for learning Korean through language exchange programs and cultural immersion.',
		image: 'https://source.unsplash.com/random/1200x600?language',
		author_name: 'David Park',
		category: 'Lifestyle',
		content: `...`, // Content omitted for brevity
		read_time: 7,
		is_published: true,
		published_at: '2024-01-08T12:00:00Z'
	},
	{
		slug: 'kpop-culture-understanding-hallyu-wave',
		title: 'K-Pop Culture: Understanding the Hallyu Wave',
		description:
			'An in-depth look at the global phenomenon of K-Pop and its impact on Korean culture and tourism.',
		image: 'https://source.unsplash.com/random/1200x600?kpop',
		author_name: 'Lisa Thompson',
		category: 'Other',
		content: `...`, // Content omitted for brevity
		read_time: 10,
		is_published: true,
		published_at: '2024-01-05T12:00:00Z'
	},
	{
		slug: 'traditional-korean-festivals-you-should-experience',
		title: 'Traditional Korean Festivals You Should Experience',
		description:
			'A year-round guide to the most important traditional festivals and celebrations in Korea.',
		image: 'https://source.unsplash.com/random/1200x600?festival',
		author_name: 'James Lee',
		category: 'Events',
		content: `...`, // Content omitted for brevity
		read_time: 9,
		is_published: true,
		published_at: '2024-01-03T12:00:00Z'
	}
];

async function seedBlogPosts() {
	console.log('Starting to seed blog posts...');

	const postsToInsert = blogPosts.map((post) => ({
		slug: post.slug,
		title: post.title,
		description: post.description,
		image: post.image,
		author_name: post.author_name,
		category: post.category,
		content: post.content,
		read_time: post.read_time,
		is_published: post.is_published,
		published_at: post.published_at
	}));

	const { data, error } = await supabase.from('blog_posts').insert(postsToInsert);

	if (error) {
		console.error('Error seeding blog posts:', error);
	} else {
		console.log('Successfully seeded blog posts:', data);
	}
}

seedBlogPosts(); 