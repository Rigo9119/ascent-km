<script lang="ts">
	import { CreateCommunityForm } from '@/lib/components/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { user, categoriesOptions, meetingFrequencyOptions, communityTypeOptions } = data;
</script>

<svelte:head>
	<title>Create Community - Ascent KM</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-emerald-600 sm:text-3xl md:text-4xl">
			Create Community
		</h1>
		<p class="mt-2 text-muted-foreground">
			Start building your community to connect with like-minded people
		</p>
	</div>

	<CreateCommunityForm 
		{categoriesOptions}
		{meetingFrequencyOptions}
		{communityTypeOptions}
		{user}
	/>
</div>