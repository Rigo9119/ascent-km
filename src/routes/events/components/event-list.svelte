<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { format } from 'date-fns';
	import type { Event } from '$lib/data/events';

	let { filteredEvents } = $props<{ filteredEvents: Event[] }>();

	function getCategoryColor(category: string): string {
		const colors = {
			cultural: 'bg-blue-100 text-blue-800',
			food: 'bg-orange-100 text-orange-800',
			music: 'bg-purple-100 text-purple-800',
			sports: 'bg-green-100 text-green-800',
			technology: 'bg-gray-100 text-gray-800',
			social: 'bg-pink-100 text-pink-800'
		};
		return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	}
</script>

<div class="flex items-center justify-between mb-6">
	<div>
		<h1 class="text-3xl font-bold">Upcoming Events</h1>
		<p class="text-muted-foreground">
			{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
		</p>
	</div>
</div>

{#if filteredEvents.length === 0}
	<Card>
		<CardContent class="flex items-center justify-center h-32">
			<p class="text-muted-foreground">No events found for the selected criteria</p>
		</CardContent>
	</Card>
{:else}
	<div class="grid gap-4">
		{#each filteredEvents as event}
			<Card>
				<CardHeader>
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<CardTitle>{event.title}</CardTitle>
							<CardDescription class="mt-2">
								{format(event.date, 'EEEE, MMMM do, yyyy')} • {event.location}
							</CardDescription>
						</div>
						<span
							class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(
								event.category
							)}"
						>
							{event.category.charAt(0).toUpperCase() + event.category.slice(1)}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">{event.description}</p>
				</CardContent>
			</Card>
		{/each}
	</div>
{/if} 