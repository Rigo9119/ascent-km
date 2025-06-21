<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	const { sectionTitle, carouselItems, carouselDelay } = $props();

	const plugin = Autoplay({ delay: carouselDelay, stopOnInteraction: true });
</script>

<section class="py-2">
	<h2 class="py-2 text-2xl font-semibold">{sectionTitle}</h2>
	<div class="w-full">
		<Carousel.Root
			opts={{
				loop: true
			}}
			plugins={[plugin]}
			class="w-full"
			onmouseenter={plugin.stop}
			onmouseleave={plugin.reset}
		>
			<Carousel.Content>
				{#each carouselItems as item (item)}
					<Carousel.Item class="basis:1">
						<div class="p-1">
							<Card.Root>
								<Card.Content class="flex items-center justify-center p-6">
									<span class="text-4xl font-semibold">{item.name}</span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>
</section>
