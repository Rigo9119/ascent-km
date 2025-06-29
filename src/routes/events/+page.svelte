<script lang="ts">
	import { events } from '$lib/data/events';
	import { isSameDay } from '@internationalized/date';
	import { today, getLocalTimeZone, type DateValue, CalendarDate } from '@internationalized/date';
	import Filters from './components/filters.svelte';
	import EventList from './components/event-list.svelte';
	import CalendarView from './components/calendar-view.svelte';
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
			const matchesDate = !dateValue || isSameDay(event.date, dateValue);
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

<div class="mx-auto max-w-7xl p-6">
	<div class="flex flex-col gap-4 lg:flex-row">
		<div class="w-1/3">
			<Filters
				{dateValue}
				{selectedCategory}
				{selectedType}
				{selectedLocation}
				{uniqueLocations}
				{categoryOptions}
			/>
		</div>
		<div class="lg:w-2/3">
			<EventList {filteredEvents} />
		</div>
	</div>
</div>
