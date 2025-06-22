<script lang="ts">
	import { events, type Event } from '$lib/data/events';
	import { isSameDay } from 'date-fns';
	import { type DateValue } from '@internationalized/date';
	import Filters from './components/filters.svelte';
	import EventList from './components/event-list.svelte';
	import CalendarView from './components/calendar-view.svelte';

	let value: DateValue | undefined = $state();
	let selectedCategory: string | undefined = $state('all');
	let selectedType: string | undefined = $state('all');
	let selectedLocation: string | undefined = $state('all');

	let filteredEvents = $derived(
		events.filter((event) => {
			const matchesCategory =
				selectedCategory === 'all' || event.category === selectedCategory;
			const matchesDate = !value || isSameDay(event.date, value.toDate(new Date().getTimezoneOffset().toString()));
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

<div class="p-6 max-w-7xl mx-auto">
	<Filters
		bind:value
		bind:selectedCategory
		bind:selectedType
		bind:selectedLocation
		{uniqueLocations}
	/>

	<div class="flex flex-col lg:flex-row gap-8">
		<div class="lg:w-1/3">
			<CalendarView bind:value />
		</div>

		<div class="lg:w-2/3">
			<EventList {filteredEvents} />
		</div>
	</div>
</div> 