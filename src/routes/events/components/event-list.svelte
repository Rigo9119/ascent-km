<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import CardEvent from '@/lib/components/card/card-event.svelte';
	import type { AppEvent } from '@/lib/types';

	let { appEvents } = $props<{ appEvents: AppEvent[] }>();
</script>

<div class="mb-6 flex items-center justify-between">
	<div>
		<h1 class="text-2xl font-bold">Upcoming Events</h1>
		<p class="text-muted-foreground">
			{appEvents.length} event{appEvents.length !== 1 ? 's' : ''} found
		</p>
	</div>
</div>

{#if appEvents.length === 0}
	<Card>
		<CardContent class="flex h-32 items-center justify-center">
			<p class="text-muted-foreground">No events found for the selected criteria</p>
		</CardContent>
	</Card>
{:else}
	<div class="grid gap-4">
		{#each appEvents as appEvent}
			<CardEvent {appEvent} />
		{/each}
	</div>
{/if}
