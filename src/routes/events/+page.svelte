<script lang="ts">
	import { isSameDay, parseAbsoluteToLocal } from '@internationalized/date';
	import { type DateValue, CalendarDate } from '@internationalized/date';
	import Filters from './components/filters.svelte';
	import EventList from './components/event-list.svelte';
	import { categories } from '@/lib/data/mock-data/categories';
	import Button from '@/lib/components/ui/button/button.svelte';
	import * as Sheet from '@/lib/components/ui/sheet';
	import type { User } from '@supabase/supabase-js';
	import CreateEventForm from './components/create-event-form.svelte';


	interface EventsPageData {
		appEvents: any[];
		locationsFilter: { value: string; label: string }[];
		user: User
	}

	const { data }: { data: EventsPageData } = $props();
	const { appEvents, locationsFilter, user } = data;

	const dateValue = $state<DateValue>(null as unknown as DateValue);
	const selectedCategory: string = $state<string>('all');
	const selectedType: string = $state<string>('all');
	const selectedLocation: string = $state<string>('all');
	const categoryOptions: { value: string; label: string }[] =
		$state<{ value: string; label: string }[]>(categories);

	const filteredEvents = $derived(
		appEvents.filter((event) => {
			const { year, month, day } = parseAbsoluteToLocal(event.date);
			const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
			const eventDate = new CalendarDate(year, month, day);
			const matchesDate = !dateValue || isSameDay(eventDate, dateValue);
			const matchesType = selectedType === 'all' || event.type === selectedType;
			const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
			return matchesCategory && matchesDate && matchesType && matchesLocation;
		})
	);
</script>

<svelte:head>
	<title>Events | Next Roots</title>
	<meta
		name="description"
		content="a wonderful page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6 sm:mb-8">
		<h1 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">Events</h1>
		<p class="text-muted-foreground text-sm sm:text-base">
			Discover exciting events happening in Korea
		</p>
	</div>

	<div class="grid gap-6 lg:grid-cols-[1fr_2fr]">
		<div class="order-1 lg:order-1">
			<Filters
				{dateValue}
				{selectedCategory}
				{selectedType}
				{selectedLocation}
				{locationsFilter}
				{categoryOptions}
			/>
			{#if user}
				<Sheet.Root>
					<Sheet.Trigger class='w-full'>
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
			<EventList {appEvents} />
		</div>
	</div>
</div>
