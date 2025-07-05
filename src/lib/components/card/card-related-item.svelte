<script lang="ts">
	import { goto } from '$app/navigation';
	import Calendar from '@lucide/svelte/icons/calendar';
	import { format } from 'date-fns';
	import * as Card from '$lib/components/ui/card/index.js';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import { getCategoryColor } from '@/lib/utils';
	import type { AppEvent, AppLocation, Community } from '@/lib/types';

	const { relatedItem, urlSegment }: { relatedItem: AppEvent | AppLocation | Community; urlSegment: string } = $props();

	function go() {
		goto(`/${urlSegment}/${relatedItem.id}`);
		//goto(`/locations/${location.id}`)
	}
</script>

<Card.Root
	class="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
	onclick={go}
>
	<Card.Content class="p-0">
		<!-- Image -->
		<div class="relative aspect-[4/3] overflow-hidden">
			<img
				src={relatedItem.image || 'https://source.unsplash.com/random/800x600?korea'}
				alt={relatedItem.name}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<!-- Category -->
			{#if 'category' in relatedItem && relatedItem.category}
				<div class="absolute top-2 left-2">
					<span
						class="rounded-full px-2 py-1 text-xs font-medium {getCategoryColor(
							relatedItem.category
						)}"
					>
						{relatedItem.category.charAt(0).toUpperCase() + relatedItem.category.slice(1)}
					</span>
				</div>
			{/if}
		</div>

		<!-- Content -->
		<div class="p-4">
			<h3
				class="group-hover:text-primary mb-2 line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
			>
				{relatedItem.name}
			</h3>
			<p class="text-muted-foreground mb-3 line-clamp-2 text-sm">
				{relatedItem.description}
			</p>

			<!-- Date and Location (for AppEvent) -->
			{#if 'date' in relatedItem && relatedItem.date}
				<div class="text-muted-foreground flex items-center justify-between text-xs">
					<div class="flex items-center gap-1">
						<Calendar class="h-3 w-3" />
						<span>{format(new Date(relatedItem.date), 'MMM do')}</span>
					</div>
					<div class="flex items-center gap-1">
						<MapPin class="h-3 w-3" />
						<span class="line-clamp-1"
							>{'location' in relatedItem ? relatedItem.location : 'N/A'}</span
						>
					</div>
				</div>
			{/if}

			<!-- Address (for AppLocation) -->
			{#if 'address' in relatedItem && relatedItem.address}
				<div class="text-muted-foreground flex items-center gap-1 text-xs">
					<MapPin class="h-3 w-3" />
					<span class="line-clamp-1">{relatedItem.address}</span>
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
