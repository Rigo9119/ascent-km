<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { createForm } from '@tanstack/svelte-form';
	import FormInput from './forms/components/form-input.svelte';
	import { type HtmlInputEvent } from '../types';


	let searchResults = $state<any[]>([]);
	let isLoading = $state(false);

	const form = createForm(() => ({
		defaultValues: {
			search: ''
		},
		onSubmit: async ({ value }) => {
			console.log('search value: ', value);
			if (!value.search || value.search.trim() === '') {
				searchResults = [];
				return;
			}

			isLoading = true;
			try {
				const response = await fetch(`/api/search?q=${encodeURIComponent(value.search)}`);
				const data = await response.json();
				searchResults = data.results || [];
			} catch (error) {
				console.error('Search error:', error);
				searchResults = [];
			} finally {
				isLoading = false;
			}
		}
	}));
</script>

<section class="my-4 sm:my-6 md:my-8">
	<form 
		onsubmit={(event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		}} 
		class="relative"
	>
		<SearchIcon
			class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:h-5 sm:w-5 z-10"
		/>
		<form.Field name="search">
			{#snippet children(field)}
				<FormInput
					{field}
					name="search"
					placeholder="Search for locations, resources, events or communities"
					inputId="search"
					type="search"
					customClass="mt-1 block w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:pl-10"
					oninput={(event: HtmlInputEvent) => {
						const target = event.target as HTMLInputElement;
						field?.handleChange(target.value);
					}}
				/>
			{/snippet}
		</form.Field>
	</form>

	{#if isLoading}
		<Card class="mt-3 sm:mt-4">
			<CardContent class="p-4">
				<div class="flex items-center justify-center">
					<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500"></div>
					<span class="ml-2 text-sm text-gray-600">Searching...</span>
				</div>
			</CardContent>
		</Card>
	{:else if searchResults.length > 0}
		<Card class="mt-3 sm:mt-4">
			<CardHeader class="pb-3 sm:pb-4">
				<CardTitle class="text-lg sm:text-xl">Search Results</CardTitle>
			</CardHeader>
			<CardContent class="grid gap-3 sm:gap-4">
				{#each searchResults as result (result.id)}
					{@const item = result}
					{#if item.type === 'event'}
						<a
							href={`/events/${item.id}`}
							class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
						>
							<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
							<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
							<span class="text-primary mt-2 inline-block text-xs font-bold uppercase">Event</span>
						</a>
					{:else if item.type === 'location'}
						<a
							href={`/locations/${item.id}`}
							class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
						>
							<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
							<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
							<span class="text-primary mt-2 inline-block text-xs font-bold uppercase"
								>Location</span
							>
						</a>
					{:else if item.type === 'community'}
						<a
							href={`/communities/${item.id}`}
							class="hover:bg-muted block rounded-lg p-3 transition-colors sm:p-4"
						>
							<h3 class="text-sm font-semibold sm:text-base">{item.name}</h3>
							<p class="text-muted-foreground mt-1 text-xs sm:text-sm">{item.description}</p>
							<span class="text-primary mt-2 inline-block text-xs font-bold uppercase"
								>Community</span
							>
						</a>
					{/if}
				{/each}
			</CardContent>
		</Card>
	{/if}
</section>
