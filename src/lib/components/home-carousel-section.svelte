<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	const { sectionTitle, carouselItems, carouselDelay } = $props();

	const plugin = Autoplay({ delay: carouselDelay, stopOnInteraction: true });
</script>

<section class="py-2">
	<h2 class="py-6 text-3xl font-semibold ">{sectionTitle}</h2>
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
						<div class="p-1 h-full min-h-[20vh]">
							<Card.Root class="overflow-hidden h-full min-h-[20vh] py-0">
								<Card.Content class="relative w-full flex items-center justify-center p-0 h-full min-h-[20vh]">
									<img src={item.image} alt={item.name} class="absolute inset-0 h-full w-full object-cover" />
									<div class="absolute inset-0 bg-black/40"></div>
									<span class="relative z-10 text-2xl font-bold text-white text-center px-2 drop-shadow-lg">
										{item.name}
									</span>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>
</section>
