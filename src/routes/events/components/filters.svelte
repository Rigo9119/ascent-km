<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { DateFormatter, today, type DateValue, getLocalTimeZone } from '@internationalized/date';

	type Props = {
		dateValue: DateValue;
		selectedCategory: string;
		selectedType: string;
		selectedLocation: string;
		uniqueLocations: string[];
		categoryOptions: { value: string; label: string }[];
	};

	let {
		dateValue,
		selectedCategory,
		selectedType,
		selectedLocation,
		uniqueLocations,
		categoryOptions
	}: Props = $props();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function clearFilters() {
		dateValue = today(getLocalTimeZone());
		selectedCategory = 'all';
		selectedType = 'all';
		selectedLocation = 'all';
		categoryOptions 
	}


</script>

<section class="mb-8">
	<Card class='gap-2'>
		<CardHeader>
			<CardTitle>Filters</CardTitle>
		</CardHeader>
		
		<CardContent class="flex flex-col gap-4">
			<div class="flex-1">
				<label class="text-sm font-medium" for="category-select">Category</label>
				<Select.Root
					type="single"
					onValueChange={(label: string) => (selectedCategory = label)}
					value={selectedCategory}
				>
				<Select.SelectTrigger id="location-select" class="w-full">
					{selectedCategory === 'all' ? 'All locations' : selectedCategory}
			</Select.SelectTrigger>				
					<Select.SelectContent>
						{#each categoryOptions as option (option)}
							<Select.SelectItem value={option.value}>{option.label}</Select.SelectItem>
						{/each}
					</Select.SelectContent>
				</Select.Root>
			</div>

			<div class="flex flex-1 flex-col">
				<label class="text-sm font-medium" for="date-picker">Date</label>
				<Popover>
					<PopoverTrigger>
						<Button variant="outline" class="w-full justify-start text-left font-normal">
							<CalendarIcon class="mr-2 h-4 w-4" />
							{dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : 'Pick a date'}
						</Button>
					</PopoverTrigger>
					<PopoverContent class="w-auto p-0">
						<Calendar
							type="single"
							value={dateValue}
							onValueChange={(value: DateValue | undefined) => (dateValue = value ?? today(getLocalTimeZone()))}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div class="flex-1">
				<label class="text-sm font-medium" for="location-select">Location</label>
				<Select.Root
				type='single'
					onValueChange={(value: string | undefined) => (selectedLocation = value ?? 'all')}
					value={selectedLocation}
				>
					<Select.SelectTrigger id="location-select" class="w-full">
							{selectedLocation === 'all' ? 'All locations' : selectedLocation}
					</Select.SelectTrigger>
					<Select.SelectContent>
						<Select.SelectItem value="all">All locations</Select.SelectItem>
						{#each uniqueLocations as location (location)}
							<Select.SelectItem value={location}>{location}</Select.SelectItem>
						{/each}
					</Select.SelectContent>
				</Select.Root>
			</div>
			<div class="flex-1">
				<label class="text-sm font-medium" for="type-radio-group">Event Type</label>
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
			<Button variant="outline" class="w-full" onclick={clearFilters}>Clear Filters</Button>
		</CardFooter>
	</Card>
</section>
