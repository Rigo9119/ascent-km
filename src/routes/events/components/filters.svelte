<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { DateFormatter, today, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import FormSelect from '@/lib/components/forms/components/form-select.svelte';
	import FormDateRange from '@/lib/components/forms/components/form-date-range.svelte';

	type Props = {
		dateValue: DateValue;
		selectedCategory: string;
		selectedType: boolean | string;
		selectedLocation: string;
		locationsOptions: { value: string; label: string }[];
		categoriesOptions: { value: string; label: string }[];
		onCategoryChange: (value: string) => void;
		onLocationChange: (value: string) => void;
		onTypeChange: (value: string) => void;
		onDateChange: (value: DateValue) => void;
		onClearFilters: () => void;
	};

	let {
		dateValue,
		selectedCategory,
		selectedType,
		selectedLocation,
		locationsOptions,
		categoriesOptions,
		onCategoryChange,
		onLocationChange,
		onTypeChange,
		onDateChange,
		onClearFilters
	}: Props = $props();

	const dateFormat = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function clearFilters() {
		onClearFilters();
	}

</script>

<section class="mb-8">
	<Card class="gap-2">
		<CardHeader>
			<CardTitle>Filters</CardTitle>
		</CardHeader>

		<CardContent class="flex flex-col gap-4">
			<FormSelect
				forLabel="category-select"
				placeholder="All categories"
				name="category-select"
				value={selectedCategory}
				label="Category"
				selectId="category-select"
				options={[{ value: 'all', label: 'All categories' }, ...categoriesOptions]}
				onValueChange={onCategoryChange}
			/>
			<FormDateRange label="Date" bind:value={dateValue} onValueChange={onDateChange} />
			<FormSelect
				forLabel="location-select"
				placeholder="All locations"
				name="locations-filter"
				label="Location"
				selectId="location-select"
				options={[{ value: 'all', label: 'All locations' }, ...locationsOptions]}
				value={selectedLocation}
				onValueChange={onLocationChange}
			/>
			<div class="flex-1">
				<label class="text-sm font-medium" for="type-radio-group">Event Type</label>
				<RadioGroup value={selectedType} onValueChange={onTypeChange} class="flex items-center space-x-2 pt-2">
					<div class="flex items-center space-x-2">
						<RadioGroupItem value="all" id="r-all" />
						<label for="r-all">All</label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroupItem value="true" id="r-free" />
						<label for="r-free">Free</label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroupItem value="false" id="r-paid" />
						<label for="r-paid">Paid</label>
					</div>
				</RadioGroup>
			</div>
		</CardContent>
		<CardFooter>
			<Button variant="outline" class="w-full" onclick={clearFilters}>Clear Filters</Button>
		</CardFooter>
	</Card>
</section>
