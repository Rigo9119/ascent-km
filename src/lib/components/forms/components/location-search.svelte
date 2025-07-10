<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { onMount } from 'svelte';

export let value: { city: string; country: string } | null = null;
export let placeholder: string = 'Search for your city...';

const dispatch = createEventDispatcher();
let search = '';
let results: Array<{ city: string; country: string }> = [];
let isLoading = false;
let showDropdown = false;
let debounceTimeout: ReturnType<typeof setTimeout>;

async function fetchCities(query: string) {
	if (!query || query.length < 2) {
		results = [];
		return;
	}
	isLoading = true;
	try {
		const response = await fetch(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=7&namePrefix=${encodeURIComponent(
				query
			)}`,
			{
				headers: {
					'X-RapidAPI-Key': 'demo', // Replace 'demo' with your actual API key for production
					'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
				}
			}
		);
		const data = await response.json();
		results = (data.data || []).map((item: any) => ({
			city: item.city,
			country: item.country
		}));
	} catch (e) {
		results = [];
	} finally {
		isLoading = false;
	}
}

function onInput(e: Event) {
	const target = e.target as HTMLInputElement;
	search = target.value;
	clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(() => {
		fetchCities(search);
		showDropdown = true;
	}, 300);
}

function selectResult(result: { city: string; country: string }) {
	search = `${result.city}, ${result.country}`;
	showDropdown = false;
	dispatch('change', result);
}
</script>

<div class="relative w-full">
	<input
		type="text"
		class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500"
		placeholder={placeholder}
		value={search}
		on:input={onInput}
		on:focus={() => (showDropdown = true)}
	/>
	{#if isLoading}
		<div class="absolute left-0 right-0 z-10 bg-white border border-gray-200 rounded-b-md shadow p-2 text-center text-sm text-gray-500">Searching...</div>
	{:else if showDropdown && results.length > 0}
		<ul class="absolute left-0 right-0 z-10 bg-white border border-gray-200 rounded-b-md shadow max-h-60 overflow-auto">
			{#each results as result}
				<li
					class="px-4 py-2 cursor-pointer hover:bg-rose-100"
					on:mousedown={() => selectResult(result)}
				>
					{result.city}, {result.country}
				</li>
			{/each}
		</ul>
	{:else if showDropdown && search.length > 1 && results.length === 0}
		<div class="absolute left-0 right-0 z-10 bg-white border border-gray-200 rounded-b-md shadow p-2 text-center text-sm text-gray-500">No results found</div>
	{/if}
</div> 