<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { AppEvent } from '@/lib/types';
	import { getCategoryColor, getFeeColor, getTypeColor } from '@/lib/utils';

	import { format } from 'date-fns';
	import { Button } from '../ui/button';
	import Badge from '../ui/badge/badge.svelte';

	let { appEvent } = $props();
	const { event_name, event_description, event_id, category_name, event_type_name } = appEvent;

	function viewEventDetails(eventId: string) {
		goto(`/events/${eventId}`);
	}
</script>

<Card>
	<CardHeader>
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<CardTitle>{event_name}</CardTitle>
				<CardDescription class="mt-2">
					{format(appEvent.date, 'EEEE, MMMM do, yyyy')} • {appEvent.location_name}
				</CardDescription>
			</div>
			<div class="flex flex-col items-end gap-2">
				<Badge class="px-2 py-1 text-xs font-medium capitalize {getCategoryColor(category_name)}">
					{category_name}
				</Badge>
				<div class="flex gap-1">
					<Badge class="bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
						{event_type_name}
					</Badge>
				</div>
			</div>
		</div>
	</CardHeader>
	<CardContent>
		<p class="text-muted-foreground text-sm">{event_description}</p>
	</CardContent>
	<CardContent class="flex justify-end pt-0">
		<Button
			variant="outline"
			class="bg-black text-white"
			onclick={() => viewEventDetails(event_id)}
		>
			View Details
		</Button>
	</CardContent>
</Card>
