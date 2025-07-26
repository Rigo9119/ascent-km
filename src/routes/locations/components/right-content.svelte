<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Button from '$lib/components/ui/button/index.js';
	import Share2 from '@lucide/svelte/icons/share-2';
	import Heart from '@lucide/svelte/icons/heart';
	import Clock from '@lucide/svelte/icons/clock';
	import Phone from '@lucide/svelte/icons/phone';
	import Globe from '@lucide/svelte/icons/globe';
	import type { AppLocation } from '@/lib/types';
	//import { DateFormatter, Time } from '@internationalized/date';

	interface RightContentProps {
		shareLocation: () => void;
		toggleFavorite: () => void;
		currentLocation: AppLocation;
	}

	const { shareLocation, toggleFavorite, currentLocation }: RightContentProps = $props();

	// TODO: research how to format the hour using internationalized/date library
	function formatHours(hour: number) {
		const hour12 = hour % 12 === 0 ? 12 : hour % 12;
		const ampm = hour < 12 ? 'AM' : 'PM';
		return `${hour12}:00 ${ampm}`;
	}
</script>

<div class="space-y-6 sm:space-y-8">
	<!-- Action Buttons -->
	<div class="flex gap-2">
		<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={shareLocation}>
			<Share2 class="h-4 w-4" />
		</Button.Root>
		<Button.Root variant="outline" size="icon" class="h-10 w-10" onclick={toggleFavorite}>
			<Heart class="h-4 w-4" />
		</Button.Root>
	</div>

	<!-- Information Card -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Information</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="flex items-center gap-3">
				<Clock class="text-muted-foreground h-4 w-4" />
				<div>
					<p class="text-sm font-medium">Hours</p>
					<p class="text-muted-foreground text-sm">
						{currentLocation.open_hour ? formatHours(currentLocation.open_hour) : 'N/A'} - {currentLocation.close_hour
							? formatHours(currentLocation.close_hour)
							: 'N/A'}
					</p>
				</div>
			</div>

			{#if currentLocation?.phone}
				<div class="flex items-center gap-3">
					<Phone class="text-muted-foreground h-4 w-4" />
					<div>
						<p class="text-sm font-medium">Phone</p>
						<p class="text-muted-foreground text-sm">{currentLocation.phone}</p>
					</div>
				</div>
			{/if}

			{#if currentLocation?.website && currentLocation.website !== 'N/A'}
				<div class="flex items-center gap-3">
					<Globe class="text-muted-foreground h-4 w-4" />
					<div>
						<p class="text-sm font-medium">Website</p>
						<a
							href={currentLocation.website}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary text-sm hover:underline"
						>
							Visit Website
						</a>
					</div>
				</div>
			{/if}

			{#if currentLocation?.price}
				<div class="flex items-center gap-3">
					<div class="text-muted-foreground h-4 w-4">₩</div>
					<div>
						<p class="text-sm font-medium">Price</p>
						<p class="text-muted-foreground text-sm">{currentLocation.price}</p>
					</div>
				</div>
			{/if}

			{#if currentLocation?.best_time}
				<div class="flex items-center gap-3">
					<Clock class="text-muted-foreground h-4 w-4" />
					<div>
						<p class="text-sm font-medium">Best Time to Visit</p>
						<p class="text-muted-foreground text-sm">{currentLocation.best_time}</p>
					</div>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
