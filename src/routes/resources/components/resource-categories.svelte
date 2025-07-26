<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { getIconComponent } from '$lib/utils/icons';

	const { categories, getResourcesByCategory, openResource } = $props();
</script>

<div class="space-y-8">
	{#each categories as category}
		<section>
			<h2 class="mb-6 text-2xl font-semibold">{category}</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each getResourcesByCategory(category) as resource}
					{@const IconComponent = getIconComponent(resource.icon_name)}
					<Card.Root
						class="group cursor-pointer transition-all hover:shadow-lg"
						onclick={() => openResource(resource.url)}
					>
						<Card.Header>
							<div class="flex items-start justify-between">
								<div class="flex items-start gap-3">
									<IconComponent class="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
									<div class="min-w-0 flex-1">
										<Card.Title class="text-base leading-tight">{resource.title}</Card.Title>
										{#if resource.badge}
											<Badge variant="secondary" class="mt-1 text-xs">
												{resource.badge}
											</Badge>
										{/if}
									</div>
								</div>
								<ExternalLink
									class="text-muted-foreground h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
								/>
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
