<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import Button from '@/lib/components/ui/button/button.svelte';
	import type { PageServerData } from '../$types';
	import NestedComments from '@/lib/components/discussions/nested-comments.svelte';

	interface DiscussionPageData {
		discussionId: string;
	}

	const { data }: { data: DiscussionPageData } = $props();
	const { discussionId } = data;

	// Mock nested comments data
	const mockComments = [
		{
			id: 1,
			author: 'Alice',
			text: 'This is a great topic!',
			replies: [
				{
					id: 2,
					author: 'Bob',
					text: 'I agree with Alice.',
					replies: [
						{
							id: 3,
							author: 'Charlie',
							text: 'Me too! Any resources to share?',
							replies: []
						}
					]
				},
				{
					id: 4,
					author: 'Diana',
					text: 'Thanks for starting this discussion.',
					replies: []
				}
			]
		},
		{
			id: 5,
			author: 'Eve',
			text: 'Looking forward to more replies.',
			replies: []
		}
	];

	// Add mock author data
	const author = {
		name: 'John Doe',
		avatar: 'https://i.pravatar.cc/100?img=1',
		bio: 'Community enthusiast. Loves hiking and Korean BBQ.',
		joined: '2022-01-15',
		posts: 42,
		karma: 1280
	};

	// Add mock data for popular and related communities
	const popularCommunities = [
		{ name: 'Seoul Foodies', url: '/communities/seoul-foodies' },
		{ name: 'Hiking Buddies', url: '/communities/hiking-buddies' },
		{ name: 'K-Drama Fans', url: '/communities/kdrama-fans' },
	];
	const relatedCommunities = [
		{ name: 'Language Exchange', url: '/communities/language-exchange' },
		{ name: 'Travel Korea', url: '/communities/travel-korea' },
	];
</script>

<div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
	<!-- Main Discussion & Comments (Scrollable) -->
	<div class="flex max-h-[80vh] flex-col overflow-y-auto pr-2 md:col-span-2">
		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Discussion: {discussionId}</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-muted-foreground mb-6 min-h-[40px]">
					<!-- TODO: Render discussion content here -->
					No content to show.
				</div>
			</CardContent>
		</Card>

		<section class="mb-8">
			<h2 class="mb-4 text-lg font-semibold">Replies</h2>
			<NestedComments comments={mockComments} />
		</section>
	</div>

	<!-- Sticky Author Info -->
	<aside class="sticky top-8 h-fit md:col-span-1">
		<Card>
			<CardHeader>
				<div class="flex flex-col items-center gap-2">
					<img
						src={author.avatar}
						alt={author.name}
						class="mb-2 h-20 w-20 rounded-full border-2 border-rose-400"
					/>
					<CardTitle class="text-center">{author.name}</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<div class="text-muted-foreground mb-2 text-center">{author.bio}</div>
				<div class="flex flex-col gap-1 text-sm">
					<span><b>Joined:</b> {author.joined}</span>
					<span><b>Posts:</b> {author.posts}</span>
					<span><b>Karma:</b> {author.karma}</span>
				</div>
			</CardContent>
		</Card>

		<!-- Popular Communities Card -->
		<Card class="mt-6">
			<CardHeader>
				<CardTitle class="text-base">Popular Communities</CardTitle>
			</CardHeader>
			<CardContent>
				<ul class="flex flex-col gap-2">
					{#each popularCommunities as community}
						<li>
							<a href={community.url} class="text-rose-600 hover:underline">{community.name}</a>
						</li>
					{/each}
				</ul>
			</CardContent>
		</Card>

		<!-- Related Communities Card -->
		<Card class="mt-6">
			<CardHeader>
				<CardTitle class="text-base">Related Communities</CardTitle>
			</CardHeader>
			<CardContent>
				<ul class="flex flex-col gap-2">
					{#each relatedCommunities as community}
						<li>
							<a href={community.url} class="text-rose-600 hover:underline">{community.name}</a>
						</li>
					{/each}
				</ul>
			</CardContent>
		</Card>
	</aside>
</div>
