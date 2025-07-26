<script lang="ts">
	import * as Button from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	function goBack() {
		goto('/locations');
	}
</script>

<div class="mx-auto max-w-4xl px-4 py-4 text-center sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6">
		<Button.Root variant="ghost" class="inline-flex items-center gap-2 text-sm" onclick={goBack}>
			<ArrowLeft class="h-4 w-4" />
			Back to Locations
		</Button.Root>
	</div>

	<h1 class="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">Location Not Found</h1>
	<p class="text-muted-foreground mb-8 text-base sm:text-lg">
		The location you're looking for doesn't exist or has been moved.
	</p>
	<Button.Root onclick={goBack}>Return to Locations</Button.Root>
</div>
