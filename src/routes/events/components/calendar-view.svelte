<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Calendar } from '$lib/components/ui/calendar';
	import type { DateValue } from '@internationalized/date';

	let { dateValue }: { dateValue: DateValue } = $props();
</script>

<Card>
	<CardHeader>
		<CardTitle>Calendar</CardTitle>
		<CardDescription>Select a date to filter events</CardDescription>
	</CardHeader>
	<CardContent>
		<Calendar value={dateValue} type="single" />
	</CardContent>
</Card>
