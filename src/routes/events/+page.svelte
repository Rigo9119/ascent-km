<script lang="ts">
	import { Calendar } from '$lib/components/ui/calendar';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { events, type Event } from '$lib/data/events';
	import { format, isSameDay } from 'date-fns';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import {
		getLocalTimeZone,
		DateFormatter,
		type DateValue
	} from '@internationalized/date';
	import CardFooter from '@/lib/components/ui/card/card-footer.svelte';
	import {
		RadioGroup,
		RadioGroupItem
	} from '$lib/components/ui/radio-group';

	let value: DateValue | undefined = $state();
	let selectedCategory: string | undefined = $state('all');
	let selectedType: string | undefined = $state('all');
	let selectedLocation: string | undefined = $state('all');
	let filteredEvents = $derived(
		events.filter((event) => {
			const matchesCategory =
				selectedCategory === 'all' || event.category === selectedCategory;
			const matchesDate = !value || isSameDay(event.date, value.toDate(getLocalTimeZone()));
			const matchesType = selectedType === 'all' || event.type === selectedType;
			const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
			return matchesCategory && matchesDate && matchesType && matchesLocation;
		})
	);

	const uniqueLocations = [...new Set(events.map((event) => event.location))];

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

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

<svelte:head>
	<title>Events | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderful page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="p-6 max-w-7xl mx-auto">
	<!-- Filters Section -->
	<section class="mb-8">
		<Card>
			<CardHeader>
				<CardTitle>Filters</CardTitle>
			</CardHeader>
			<CardContent class="flex flex-col md:flex-row gap-4">
				<div class="flex-1">
					<label class="text-sm font-medium" for="category-select">Category</label>
					<Select>
						<SelectTrigger id="category-select" class="w-full">
							All categories
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All categories</SelectItem>
							<SelectItem value="cultural">Cultural</SelectItem>
							<SelectItem value="food">Food</SelectItem>
							<SelectItem value="music">Music</SelectItem>
							<SelectItem value="sports">Sports</SelectItem>
							<SelectItem value="technology">Technology</SelectItem>
							<SelectItem value="social">Social</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div class="flex-1 flex flex-col">
					<label class="text-sm font-medium">Date</label>
					<Popover>
						<PopoverTrigger>
							<Button variant="outline" class="w-full justify-start text-left font-normal">
								<CalendarIcon class="mr-2 h-4 w-4" />
								Pick a date
							</Button>
						</PopoverTrigger>
						<PopoverContent class="w-auto p-0">
							<Calendar />
						</PopoverContent>
					</Popover>
				</div>
				<div class="flex-1">
					<label class="text-sm font-medium" for="location-select">Location</label>
					<Select>
						<SelectTrigger id="location-select" class="w-full">
							All locations
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All locations</SelectItem>
							{#each uniqueLocations as location}
								<SelectItem value={location}>{location}</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				</div>
				<div class="flex-1">
					<label class="text-sm font-medium">Event Type</label>
					<RadioGroup bind:value={selectedType} class="flex items-center space-x-2 pt-2">
						<div class="flex items-center space-x-2">
							<RadioGroupItem value="all" id="r-all" />
							<label for="r-all">All</label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem value="public" id="r-public" />
							<label for="r-public">Public</label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroupItem value="private" id="r-private" />
							<label for="r-private">Private</label>
						</div>
					</RadioGroup>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					variant="outline"
					class="w-full"
					on:click={() => {
						value = undefined;
						selectedCategory = 'all';
						selectedType = 'all';
						selectedLocation = 'all';
					}}
				>
					Clear Filters
				</Button>
			</CardFooter>
		</Card>
	</section>

	<div class="flex flex-col lg:flex-row gap-8">
		<div class="lg:w-1/3">
			<Card>
				<CardHeader>
					<CardTitle>Calendar</CardTitle>
					<CardDescription>Select a date to filter events</CardDescription>
				</CardHeader>
				<CardContent>
					<Calendar />
				</CardContent>
			</Card>
		</div>

		<div class="lg:w-2/3">
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
		</div>
	</div>
</div> 