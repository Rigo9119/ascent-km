<script lang="ts">
	import CardItem from '$lib/components/card/card-item.svelte';
	import type { Community } from '@/lib/types';

	import type { PageData } from './$types';
	import Button from '@/lib/components/ui/button/button.svelte';
	import * as Sheet from '@/lib/components/ui/sheet';
	import CreateCommunityForm from './components/create-community-form.svelte';

	const { data }: { data: PageData } = $props();
	const user = data.user;

	const communities = $derived(data.communities as Community[]);
	const featuredCommunities = $derived(data.featuredCommunities as Community[]);
</script>

<svelte:head>
	<title>Communities | Next Roots</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header Section -->
	<div class="mb-6 sm:mb-8">
		<h1 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">
			Communities
		</h1>
		<div class="flex items-center justify-between gap-2">
			<p class="text-muted-foreground mb-0 text-sm sm:text-base">
				Join communities and connect with people who share your interests
			</p>
			<div class="flex gap-2">
				<Button
					href="/communities/discussions"
					class="border border-emerald-500 bg-white text-emerald-600 hover:bg-emerald-50"
					>View Discussions</Button
				>
				{#if user}
					<Sheet.Root>
						<Sheet.Trigger>
							<Button class="bg-emerald-500 hover:bg-emerald-600">Create Community</Button>
						</Sheet.Trigger>
						<Sheet.Content side="right">
							<Sheet.Header>
								<Sheet.Title>Create Community</Sheet.Title>
							</Sheet.Header>
							<CreateCommunityForm />
						</Sheet.Content>
					</Sheet.Root>
				{/if}
			</div>
		</div>
	</div>

	<!-- Recent Discussions Section -->
	<section class="mb-8">
		<h2 class="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">Recent Discussions</h2>
		<ul class="list-disc space-y-2 pl-6">
			<!-- Placeholder discussions -->
			<li>
				<a href="/communities/discussions/1" class="text-emerald-600 hover:underline"
					>How to find housing in Seoul?</a
				>
			</li>
			<li>
				<a href="/communities/discussions/2" class="text-emerald-600 hover:underline"
					>Best places to eat Korean BBQ</a
				>
			</li>
			<li>
				<a href="/communities/discussions/3" class="text-emerald-600 hover:underline"
					>Tips for learning Korean fast</a
				>
			</li>
			<li>
				<a href="/communities/discussions/4" class="text-emerald-600 hover:underline"
					>Making friends as an expat</a
				>
			</li>
		</ul>
	</section>

	<!-- Featured Communities Section -->
	{#if featuredCommunities.length > 0}
		<section class="mb-8">
			<h2 class="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">
				Featured Communities
			</h2>
			<div
				class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
			>
				{#each featuredCommunities as community (community.id)}
					<CardItem cardItem={community} urlSection="communities" />
				{/each}
			</div>
		</section>
	{/if}

	<!-- All Communities Section -->
	<section>
		<h2 class="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">All Communities</h2>
		<div
			class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
		>
			{#each communities as community (community.id)}
				<CardItem cardItem={community} urlSection="communities" />
			{/each}
		</div>
	</section>
</div>
