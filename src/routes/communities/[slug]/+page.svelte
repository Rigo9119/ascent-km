<script lang="ts">
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
	import type { Community } from '@/lib/types';
	import { type PageData } from '../$types';

	interface CommunityPageProps {
		community: Community;
	}

	const { data }: { data: CommunityPageProps } = $props();

	let currentCommunity = $state(data.community);
	let relatedCommunities = $state<Community[]>([]);
	let isMember = $state(false);

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
	<title>{currentCommunity?.name || 'Community'} | Next Roots</title>
	<meta
		name="description"
		content={currentCommunity?.description ||
			'Join communities and connect with people who share your interests'}
	/>
</svelte:head>

{#if currentCommunity}
	<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<!-- Back Button -->
		<div class="mb-6">
			<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
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
				<div class="absolute right-4 bottom-4 left-4">
					<div class="mb-3 flex flex-wrap gap-2">
						<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
							{currentCommunity.category}
						</span>
						<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
							{currentCommunity.meeting_frequency}
						</span>
					</div>
					<h1 class="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
						{currentCommunity.name}
					</h1>
					<div class="flex items-center gap-4 text-white/90">
						<div class="flex items-center gap-2">
							<MapPin class="h-4 w-4" />
							<span class="text-sm sm:text-base">{currentCommunity.location}</span>
						</div>
						<div class="flex items-center gap-2">
							<Users class="h-4 w-4" />
							<span class="text-sm sm:text-base"
								>{formatMemberCount(currentCommunity.member_count)} members</span
							>
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
					<h2 class="mb-4 text-xl font-semibold sm:text-2xl">About This Community</h2>
					<p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
						{currentCommunity.long_description || currentCommunity.description}
					</p>
				</section>

				<!-- Tags -->
				{#if currentCommunity.tags && currentCommunity.tags.length > 0}
					<section>
						<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Tags</h2>
						<div class="flex flex-wrap gap-2">
							{#each currentCommunity.tags as tag}
								<span class="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
									{tag}
								</span>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Community Rules -->
				{#if currentCommunity.rules && currentCommunity.rules.length > 0}
					<section>
						<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Community Rules</h2>
						<ul class="space-y-3">
							{#each currentCommunity.rules as rule}
								<li class="flex items-start gap-3">
									<div class="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
									<p class="text-muted-foreground text-base">{rule}</p>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Upcoming Events -->
				{#if currentCommunity.upcoming_events && currentCommunity.upcoming_events.length > 0}
					<section>
						<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Upcoming Events</h2>
						<div class="space-y-4">
							{#each currentCommunity.upcoming_events as event}
								<Card.Root class="p-4">
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<h3 class="mb-2 text-lg font-semibold">{event.title}</h3>
											<p class="text-muted-foreground mb-2 text-sm">{event.description}</p>
											<div class="text-muted-foreground flex items-center gap-4 text-xs">
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
				{#if currentCommunity.recent_discussions && currentCommunity.recent_discussions.length > 0}
					<section>
						<h2 class="mb-4 text-xl font-semibold sm:text-2xl">Recent Discussions</h2>
						<div class="space-y-3">
							{#each currentCommunity.recent_discussions as discussion}
								<Card.Root class="p-4">
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<h3 class="mb-1 text-base font-semibold">{discussion.title}</h3>
											<div class="text-muted-foreground flex items-center gap-4 text-xs">
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
					<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={shareCommunity}>
						<Share2 class="h-4 w-4" />
					</Button.Root>
					<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={toggleFavorite}>
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
							<p class="text-primary text-2xl font-bold">
								{formatMemberCount(currentCommunity.member_count)}
							</p>
							<p class="text-muted-foreground text-sm">members</p>
						</div>

						<Button.Root
							class="w-full"
							variant={isMember ? 'outline' : 'default'}
							onclick={toggleMembership}
						>
							{#if isMember}
								<Minus class="mr-2 h-4 w-4" />
								Leave Community
							{:else}
								<Plus class="mr-2 h-4 w-4" />
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
							<Users class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Organizer</p>
								<p class="text-muted-foreground text-sm">{currentCommunity.organizer_id}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<Calendar class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Created</p>
								<p class="text-muted-foreground text-sm">
									{formatDate(currentCommunity.created_at)}
								</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<MapPin class="text-muted-foreground h-4 w-4" />
							<div>
								<p class="text-sm font-medium">Location</p>
								<p class="text-muted-foreground text-sm">{currentCommunity.location}</p>
							</div>
						</div>

						{#if currentCommunity.meeting_frequency}
							<div class="flex items-center gap-3">
								<Calendar class="text-muted-foreground h-4 w-4" />
								<div>
									<p class="text-sm font-medium">Meeting Frequency</p>
									<p class="text-muted-foreground text-sm">{currentCommunity.meeting_frequency}</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.next_meeting_details}
							<div class="flex items-center gap-3">
								<Calendar class="text-muted-foreground h-4 w-4" />
								<div>
									<p class="text-sm font-medium">Next Meeting</p>
									<p class="text-muted-foreground text-sm">
										{formatDate(currentCommunity.next_meeting_details)}
									</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.contact_email}
							<div class="flex items-center gap-3">
								<MessageCircle class="text-muted-foreground h-4 w-4" />
								<div>
									<p class="text-sm font-medium">Contact</p>
									<p class="text-muted-foreground text-sm">{currentCommunity.contact_email}</p>
								</div>
							</div>
						{/if}

						{#if currentCommunity.website && currentCommunity.website !== 'N/A'}
							<div class="flex items-center gap-3">
								<Share2 class="text-muted-foreground h-4 w-4" />
								<div>
									<p class="text-sm font-medium">Website</p>
									<a
										href={currentCommunity.website}
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

		<!-- Related Communities -->
		{#if relatedCommunities.length > 0}
			<section class="mt-12 border-t pt-8 sm:mt-16 sm:pt-12">
				<h2 class="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">
					Other Communities You Might Like
				</h2>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{#each relatedCommunities as community (community.id)}
						<Card.Root
							class="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
							onclick={() => goto(`/communities/${community.id}`)}
						>
							<Card.Content class="p-0">
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={community.image}
										alt={community.name}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div class="absolute top-2 left-2">
										<span
											class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
										>
											{community.category}
										</span>
									</div>
								</div>

								<!-- Content -->
								<div class="p-4">
									<h3
										class="group-hover:text-primary mb-2 line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
									>
										{community.name}
									</h3>
									<p class="text-muted-foreground mb-3 line-clamp-2 text-sm">
										{community.description}
									</p>

									<!-- Member count and location -->
									<div class="text-muted-foreground flex items-center justify-between text-xs">
										<div class="flex items-center gap-1">
											<Users class="h-3 w-3" />
											<span>{formatMemberCount(community.member_count)}</span>
										</div>
										<div class="flex items-center gap-1">
											<MapPin class="h-3 w-3" />
											<span class="line-clamp-1">{community.location}</span>
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
				Back to Communities
			</Button.Root>
		</div>

		<h1 class="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">Community Not Found</h1>
		<p class="text-muted-foreground mb-8 text-base sm:text-lg">
			The community you're looking for doesn't exist or has been moved.
		</p>
		<Button.Root onclick={goBack}>Return to Communities</Button.Root>
	</div>
{/if}
