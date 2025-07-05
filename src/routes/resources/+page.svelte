<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';

	import Phone from '@lucide/svelte/icons/phone';
	import Wifi from '@lucide/svelte/icons/wifi';

	import Calendar from '@lucide/svelte/icons/calendar';

	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { resources } from '@/lib/data/resources';

	const categories = [...new Set(resources.map(r => r.category))];

	function getResourcesByCategory(category: string) {
		return resources.filter(r => r.category === category);
	}

	function openResource(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<svelte:head>
	<title>Resources | Meet in Korea</title>
	<meta
		name="description"
		content="Essential resources for visiting Korea - travel guides, language learning, transportation, and practical information"
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Resources for Korea</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
			Essential resources to help you navigate Korea with confidence. From official government websites to language learning platforms, find everything you need for your Korean adventure.
		</p>
	</div>

	<!-- Categories -->
	<div class="space-y-8">
		{#each categories as category}
			<section>
				<h2 class="mb-6 text-2xl font-semibold">{category}</h2>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each getResourcesByCategory(category) as resource}
						<Card.Root class="group cursor-pointer transition-all hover:shadow-lg" onclick={() => openResource(resource.url)}>
							<Card.Header>
								<div class="flex items-start justify-between">
									<div class="flex items-center gap-3">
										<svelte:component this={resource.icon} class="h-5 w-5 text-primary" />
										<div>
											<Card.Title class="text-base">{resource.title}</Card.Title>
											{#if resource.badge}
												<Badge variant="secondary" class="mt-1 text-xs">
													{resource.badge}
												</Badge>
											{/if}
										</div>
									</div>
									<ExternalLink class="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							</Card.Header>
							<Card.Content>
								<p class="text-muted-foreground text-sm leading-relaxed">
									{resource.description}
								</p>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			</section>
			{#if category !== categories[categories.length - 1]}
				<Separator />
			{/if}
		{/each}
	</div>

	<!-- Quick Tips Section -->
	<section class="mt-12">
		<h2 class="mb-6 text-2xl font-semibold">Quick Tips</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Phone class="h-5 w-5 text-primary" />
						Emergency Numbers
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2">
					<p class="text-sm"><strong>Police:</strong> 112</p>
					<p class="text-sm"><strong>Fire/Ambulance:</strong> 119</p>
					<p class="text-sm"><strong>Tourist Hotline:</strong> 1330</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Wifi class="h-5 w-5 text-primary" />
						Internet & Apps
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2">
					<p class="text-sm"><strong>Free WiFi:</strong> Available in most public areas</p>
					<p class="text-sm"><strong>Essential Apps:</strong> KakaoMap, Naver Map, Google Translate</p>
					<p class="text-sm"><strong>Payment:</strong> Credit cards widely accepted</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Calendar class="h-5 w-5 text-primary" />
						Best Times to Visit
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2">
					<p class="text-sm"><strong>Spring:</strong> Cherry blossoms (March-April)</p>
					<p class="text-sm"><strong>Fall:</strong> Beautiful autumn colors (October-November)</p>
					<p class="text-sm"><strong>Avoid:</strong> Monsoon season (July-August)</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>
</div>
