<script lang="ts">
	import { CreateEventForm } from '@/lib/components/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { user, categoriesOptions, locationOptions, eventTypeOptions } = data;
</script>

<svelte:head>
	<title>Create Event - Ascent KM</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-emerald-600 sm:text-3xl md:text-4xl">Create New Event</h1>
		<p class="text-muted-foreground mt-2">
			Fill out the details below to create your event and start building your community.
		</p>
	</div>

	<div class="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
		<CreateEventForm {user} {categoriesOptions} {locationOptions} {eventTypeOptions} />
	</div>
</div>
