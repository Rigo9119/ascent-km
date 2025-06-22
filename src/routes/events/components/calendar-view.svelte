<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Calendar } from '$lib/components/ui/calendar';
	import type { DateValue } from '@internationalized/date';

	let { value } = $props<{ value: DateValue | undefined }>();
</script>

<Card>
	<CardHeader>
		<CardTitle>Calendar</CardTitle>
		<CardDescription>Select a date to filter events</CardDescription>
	</CardHeader>
	<CardContent>
		<Calendar bind:value />
	</CardContent>
</Card> 