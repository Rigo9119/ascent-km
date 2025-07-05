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

  function viewEventDetails(appEvent: AppEvent) {

		goto(`/events/${appEvent.id}`);
	}
</script>

<Card>
	<CardHeader>
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<CardTitle>{appEvent.title}</CardTitle>
				<CardDescription class="mt-2">
					{format(appEvent.date, 'EEEE, MMMM do, yyyy')} • {appEvent.location}
				</CardDescription>
			</div>
			<div class="flex flex-col items-end gap-2">
				<Badge class="rounded-full px-2 py-1 text-xs font-medium {getCategoryColor(appEvent.category)}">
					{appEvent.category.charAt(0).toUpperCase() + appEvent.category.slice(1)}
				</Badge>
				<div class="flex gap-1">
					<Badge class="rounded-full px-2 py-1 text-xs font-medium {getTypeColor(appEvent.type)}">
						{appEvent.type.charAt(0).toUpperCase() + appEvent.type.slice(1)}
					</Badge>
					<Badge class="rounded-full px-2 py-1 text-xs font-medium {getFeeColor(appEvent.fee)}">
						{appEvent.fee ? 'Paid' : 'Free'}
					</Badge>
				</div>
			</div>
		</div>
	</CardHeader>
	<CardContent>
		<p class="text-muted-foreground text-sm">{appEvent.description}</p>
	</CardContent>
	<CardContent class="flex justify-end pt-0">
		<Button
    variant="outline"
    class="bg-black text-white"
    onclick={() => viewEventDetails(appEvent)}>
			View Details
		</Button>
	</CardContent>
</Card>
