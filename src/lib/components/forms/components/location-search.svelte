<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import Label from '../../ui/label/label.svelte';

	interface LocationSearchProps {
		value: { city: string; country: string } | null;
		placeholder?: string;
		label?: string;
		onChange: (result: { city: string; country: string }) => void;
	}

	const { value, placeholder, label, onChange }: LocationSearchProps = $props();

	let searchResults = $state<Array<{ city: string; country: string }>>([]);
	let isLoading = $state(false);
	let showDropdown = $state(false);
	let searchInput = $state('');
	let errorMessage = $state('');

	// Initialize searchInput with value if provided
	$effect(() => {
		if (value) {
			if (value.city && value.country) {
				searchInput = `${value.city}, ${value.country}`;
			} else if (value.city) {
				searchInput = value.city;
			} else if (value.country) {
				searchInput = value.country;
			} else {
				searchInput = '';
			}
		} else {
			searchInput = '';
		}
	});

	let debounceTimeout: ReturnType<typeof setTimeout>;

	async function fetchCities(query: string) {
		if (!query || query.trim().length < 2) {
			searchResults = [];
			showDropdown = false;
			errorMessage = '';
			return;
		}
		isLoading = true;
		showDropdown = true;
		errorMessage = '';
		try {
			const response = await fetch(
				`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=7&namePrefix=${encodeURIComponent(query)}`,
				{
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': `${import.meta.env.VITE_GEODB_KEY}`,
						'X-RapidAPI-Host': `${import.meta.env.VITE_GEODB_HOST}`
					}
				}
			);
			if (!response.ok) {
				if (response.status === 403) {
					errorMessage = 'Access forbidden: Please check your API key or subscription.';
				} else if (response.status === 429) {
					errorMessage = 'Too many requests: Please slow down or try again later.';
				} else {
					errorMessage = 'An error occurred while searching. Please try again.';
				}
				searchResults = [];
				return;
			}
			const data = await response.json();
			searchResults = (data.data || []).map((item: any) => ({
				city: item.city,
				country: item.country
			}));
		} catch (error) {
			errorMessage = 'A network error occurred. Please check your connection.';
			console.error('Location search error:', error);
			searchResults = [];
		} finally {
			isLoading = false;
		}
	}

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		searchInput = target.value;
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			fetchCities(searchInput);
		}, 500);
	}

	function selectResult(result: { city: string; country: string }) {
		const { city, country } = result;
		searchInput = `${city}, ${country}`;
		showDropdown = false;
		onChange(result);
	}
</script>

<div class="relative w-full">
	<Label class="mb-2 block text-sm font-medium text-gray-700">
		{label}
	</Label>
	<input
		type="text"
		class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
		{placeholder}
		bind:value={searchInput}
		oninput={handleInput}
		onfocus={() => (showDropdown = searchResults.length > 0)}
	/>

	{#if showDropdown}
		{#if isLoading}
			<Card class="absolute right-0 left-0 z-10 mt-1">
				<CardContent class="p-4">
					<div class="flex items-center justify-center">
						<div class="h-4 w-4 animate-spin rounded-full border-b-2 border-emerald-500"></div>
						<span class="ml-2 text-sm text-gray-600">Searching...</span>
					</div>
				</CardContent>
			</Card>
		{:else if searchResults.length > 0}
			<Card class="absolute right-0 left-0 z-10 mt-1 max-h-60 overflow-auto">
				<CardContent class="p-0">
					<ul role="listbox" aria-label="Location search results">
						{#each searchResults as result, i (i)}
							<li
								role="option"
								aria-selected="false"
								class="cursor-pointer border-b border-gray-100 px-4 py-2 last:border-b-0 hover:bg-emerald-100 focus:bg-emerald-100 focus:outline-none"
								onmousedown={() => selectResult(result)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										selectResult(result);
									}
								}}
								tabindex="0"
							>
								{result.city}, {result.country}
							</li>
						{/each}
					</ul>
				</CardContent>
			</Card>
		{:else if searchInput && searchInput.length > 1}
			<Card class="absolute right-0 left-0 z-10 mt-1">
				<CardContent class="p-4 text-center text-sm text-gray-500">No results found</CardContent>
			</Card>
		{:else if errorMessage}
			<Card class="absolute right-0 left-0 z-10 mt-1">
				<CardContent class="p-4 text-center text-sm text-red-500">
					{errorMessage}
				</CardContent>
			</Card>
		{/if}
	{/if}
</div>
