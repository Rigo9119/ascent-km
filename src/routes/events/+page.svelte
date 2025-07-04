<script lang="ts">
	import { events } from '$lib/data/events';
	import { isSameDay } from '@internationalized/date';
	import { today, getLocalTimeZone, type DateValue, CalendarDate } from '@internationalized/date';
	import Filters from './components/filters.svelte';
	import EventList from './components/event-list.svelte';
	import { categories } from '@/lib/data/categories';

	let dateValue = $state<DateValue>(null as unknown as DateValue);
	let selectedCategory: string = $state<string>('all');
	let selectedType: string = $state<string>('all');
	let selectedLocation: string = $state<string>('all');
	let categoryOptions: { value: string; label: string }[] =
		$state<{ value: string; label: string }[]>(categories);

	let filteredEvents = $derived(
		events.filter((event) => {
			const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
			const eventDate = new CalendarDate(event.date.getFullYear(), event.date.getMonth() + 1, event.date.getDate());
			const matchesDate = !dateValue || isSameDay(eventDate, dateValue);
			const matchesType = selectedType === 'all' || event.type === selectedType;
			const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
			return matchesCategory && matchesDate && matchesType && matchesLocation;
		})
	);

	const uniqueLocations = [...new Set(events.map((event) => event.location))];
</script>

<svelte:head>
	<title>Events | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderful page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-rose-600">Events</h1>
		<p class="text-sm sm:text-base text-muted-foreground">
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
				{uniqueLocations}
				{categoryOptions}
			/>
		</div>

		<div class="order-2 lg:order-2">
			<EventList {filteredEvents} />
		</div>
	</div>
</div>
