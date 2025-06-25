<script>
	import * as Card from '$lib/components/ui/card/index.js';
	const { sectionTitle, sectionItems } = $props();
</script>

<section class="py-2">
	<h2 class="py-2 text-2xl font-semibold">{sectionTitle}</h2>
	<div class="flex flex-row items-center justify-between gap-4">
		{#each sectionItems as item (item)}
			<Card.Root class="w-1/4">
				<Card.Content>
					<h3>{item.name}</h3>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</section>
