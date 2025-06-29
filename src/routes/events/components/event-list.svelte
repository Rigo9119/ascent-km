<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { format } from 'date-fns';
	import { getLocalTimeZone } from '@internationalized/date';
	import type { Event } from '$lib/data/events';

	let { filteredEvents } = $props<{ filteredEvents: Event[] }>();
	let selectedEvent: Event | null = $state(null);
	let isModalOpen = $state(false);

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

	function getTypeColor(type: string): string {
		const colors = {
			public: 'bg-green-100 text-green-800',
			private: 'bg-red-100 text-red-800'
		};
		return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	}

	function getFeeColor(fee: boolean): string {
		return fee ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800';
	}

	function openEventModal(event: Event) {
		selectedEvent = event;
		isModalOpen = true;
	}

	function closeEventModal() {
		isModalOpen = false;
		selectedEvent = null;
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
						<div class="flex flex-col gap-2 items-end">
							<span
								class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(
									event.category
								)}"
							>
								{event.category.charAt(0).toUpperCase() + event.category.slice(1)}
							</span>
							<div class="flex gap-1">
								<span
									class="px-2 py-1 text-xs font-medium rounded-full {getTypeColor(event.type)}"
								>
									{event.type.charAt(0).toUpperCase() + event.type.slice(1)}
								</span>
								<span
									class="px-2 py-1 text-xs font-medium rounded-full {getFeeColor(event.fee)}"
								>
									{event.fee ? 'Paid' : 'Free'}
								</span>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">{event.description}</p>
				</CardContent>
				<CardContent class="pt-0 flex justify-end">
					<Button 
						variant="outline" 
						class="bg-black text-white" 
						onclick={() => openEventModal(event)}
					>
						View Details
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>
{/if}

<!-- Event Details Modal -->
<Sheet.Root bind:open={isModalOpen}>
	<Sheet.Content side="bottom" class="h-[80vh]">
		<Sheet.Header>
			<Sheet.Title class="text-xl font-bold">
				{selectedEvent?.title}
			</Sheet.Title>
			<Sheet.Description>
				Event details and information
			</Sheet.Description>
		</Sheet.Header>
		
		{#if selectedEvent}
			<div class="flex-1 overflow-y-auto p-6 space-y-6">
				<!-- Event Image Placeholder -->
				<div class="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
					<span class="text-muted-foreground">Event Image</span>
				</div>

				<!-- Event Info -->
				<div class="space-y-4">
					<div>
						<h3 class="font-semibold text-lg mb-2">Event Information</h3>
						<p class="text-muted-foreground">{selectedEvent.description}</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h4 class="font-medium mb-2">Date & Time</h4>
							<p class="text-sm text-muted-foreground">
								{format(selectedEvent.date.toDate(getLocalTimeZone()), 'EEEE, MMMM do, yyyy')}
							</p>
						</div>
						<div>
							<h4 class="font-medium mb-2">Location</h4>
							<p class="text-sm text-muted-foreground">{selectedEvent.location}</p>
						</div>
					</div>

					<!-- Badges -->
					<div class="flex flex-wrap gap-2">
						<span class="px-3 py-1 text-sm font-medium rounded-full {getCategoryColor(selectedEvent.category)}">
							{selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full {getTypeColor(selectedEvent.type)}">
							{selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full {getFeeColor(selectedEvent.fee)}">
							{selectedEvent.fee ? 'Paid Event' : 'Free Event'}
						</span>
					</div>

					<!-- Additional Details -->
					<div class="space-y-3">
						<h4 class="font-medium">Additional Information</h4>
						<div class="bg-muted/50 rounded-lg p-4 space-y-2">
							<div class="flex justify-between">
								<span class="text-sm text-muted-foreground">Event ID:</span>
								<span class="text-sm font-medium">#{selectedEvent.id}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-muted-foreground">Category:</span>
								<span class="text-sm font-medium capitalize">{selectedEvent.category}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-muted-foreground">Type:</span>
								<span class="text-sm font-medium capitalize">{selectedEvent.type}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-muted-foreground">Admission:</span>
								<span class="text-sm font-medium">{selectedEvent.fee ? 'Paid' : 'Free'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Sheet.Footer>
				<div class="flex gap-2 w-full">
					<Button variant="outline" class="flex-1" onclick={closeEventModal}>
						Close
					</Button>
					<Button class="flex-1">
						{selectedEvent.fee ? 'Buy Tickets' : 'Register'}
					</Button>
				</div>
			</Sheet.Footer>
		{/if}
	</Sheet.Content>
</Sheet.Root> 