<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';
	import {
		RadioGroup,
		RadioGroupItem
	} from '$lib/components/ui/radio-group';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import {
		DateFormatter,
		type DateValue
	} from '@internationalized/date';

	let { value, selectedCategory, selectedType, selectedLocation, uniqueLocations } = $props<{
		value: DateValue | undefined;
		selectedCategory: string | undefined;
		selectedType: string | undefined;
		selectedLocation: string | undefined;
		uniqueLocations: string[];
	}>();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
</script>

<section class="mb-8">
	<Card>
		<CardHeader>
			<CardTitle>Filters</CardTitle>
		</CardHeader>
		<CardContent class="flex flex-col md:flex-row gap-4">
			<div class="flex-1">
				<label class="text-sm font-medium" for="category-select">Category</label>
				<Select bind:value={selectedCategory}>
					<SelectTrigger id="category-select" class="w-full">
						{selectedCategory === 'all' ? 'All categories' : selectedCategory}
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
							{value ? df.format(value.toDate(new Date().getTimezoneOffset().toString())) : 'Pick a date'}
						</Button>
					</PopoverTrigger>
					<PopoverContent class="w-auto p-0">
						<Calendar bind:value />
					</PopoverContent>
				</Popover>
			</div>
			<div class="flex-1">
				<label class="text-sm font-medium" for="location-select">Location</label>
				<Select bind:value={selectedLocation}>
					<SelectTrigger id="location-select" class="w-full">
						{selectedLocation === 'all' ? 'All locations' : selectedLocation}
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