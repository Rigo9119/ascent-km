<script lang="ts">
	import { type DateValue } from '@internationalized/date';
	import Filters from './components/filters.svelte';
	import EventList from './components/event-list.svelte';
	import Button from '@/lib/components/ui/button/button.svelte';
	import * as Sheet from '@/lib/components/ui/sheet';
	import type { User } from '@supabase/supabase-js';
	import CreateEventForm from './components/create-event-form.svelte';
	import type { AppEvent } from '@/lib/types';

	interface EventsPageData {
		appEvents: AppEvent[];
		locationsFilterOptions: { value: string; label: string }[];
		categoriesFilterOptions: { value: string; label: string }[];
		user: User;
	}

	const { data }: { data: EventsPageData } = $props();
	const { appEvents, locationsFilterOptions, categoriesFilterOptions, user } = data;

	let filters = $state({
		category: 'all',
		date: null as unknown as DateValue,
		location: 'all',
		type: 'all'
	});

	let filteredEvents = $state([]);

	$effect(() => {
		if (!appEvents) {
			filteredEvents = [];
			return;
		}
		
		let result = [...appEvents];

		// Filter by category
		if (filters.category !== 'all') {
			result = result.filter(event => event.category_id === filters.category);
		}

		// Filter by location
		if (filters.location !== 'all') {
			result = result.filter(event => event.location_id === filters.location);
		}

		// Filter by date
		if (filters.date) {
			const filterDate = filters.date.toString();
			result = result.filter(event => {
				const eventDate = new Date(event.date).toISOString().split('T')[0];
				return eventDate === filterDate;
			});
		}

		// Filter by event type (assuming event_type_id maps to public/private)
		if (filters.type !== 'all') {
			result = result.filter(event => {
				// This would need to be adjusted based on your actual event type mapping
				return event.event_type_id === filters.type;
			});
		}

		filteredEvents = result;
	});

	let dateValue = $state<DateValue>(null as unknown as DateValue);

	function handleCategoryChange(value: string) {
		filters.category = value;
	}

	function handleLocationChange(value: string) {
		filters.location = value;
	}

	function handleTypeChange(value: string) {
		filters.type = value;
	}

	function handleDateChange(value: DateValue) {
		filters.date = value;
		dateValue = value;
	}

	function handleClearFilters() {
		filters.category = 'all';
		filters.location = 'all';
		filters.type = 'all';
		filters.date = null as unknown as DateValue;
		dateValue = null as unknown as DateValue;
	}
</script>

<svelte:head>
	<title>Events | Next Roots</title>
	<meta
		name="description"
		content="a wonderful page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

{#if !data}
	<div>
		<p>Loading events page .......</p>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<div class="mb-6 sm:mb-8">
			<h1 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">
				Events
			</h1>
			<p class="text-muted-foreground text-sm sm:text-base">
				Discover exciting events happening in Korea
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-[1fr_2fr]">
			<div class="order-1 lg:order-1">
				<Filters
					{dateValue}
					selectedCategory={filters.category}
					selectedType={filters.type}
					selectedLocation={filters.location}
					locationsOptions={locationsFilterOptions}
					categoriesOptions={categoriesFilterOptions}
					onCategoryChange={handleCategoryChange}
					onLocationChange={handleLocationChange}
					onTypeChange={handleTypeChange}
					onDateChange={handleDateChange}
					onClearFilters={handleClearFilters}
				/>
				{#if user}
					<Sheet.Root>
						<Sheet.Trigger class="w-full">
							<Button class="mt-4 w-full bg-emerald-500 hover:bg-emerald-600">Create Event</Button>
						</Sheet.Trigger>
						<Sheet.Content side="right">
							<Sheet.Header>
								<Sheet.Title>Create Event</Sheet.Title>
							</Sheet.Header>
							<CreateEventForm />
						</Sheet.Content>
					</Sheet.Root>
				{/if}
			</div>

			<div class="order-2 lg:order-2">
				<EventList appEvents={filteredEvents} />
			</div>
		</div>
	</div>
{/if}
