<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { AppEvent, AppLocation } from '../types';
	import { unknown } from 'zod/v4';

	interface HomeCarouselSectionProps {
		sectionTitle: string;
		carouselItems: AppEvent[] | AppLocation[];
		carouselDelay: number;
	}

	const { sectionTitle, carouselItems, carouselDelay }: HomeCarouselSectionProps = $props();

	const plugin = Autoplay({ delay: carouselDelay, stopOnInteraction: true });
</script>

<section class="py-2">
	<h2 class="py-2 text-3xl font-semibold">{sectionTitle}</h2>
	<div class="w-full">
		<Carousel.Root
			opts={{
				loop: true
			}}
			plugins={[plugin]}
			class="w-full pt-4"
			onmouseenter={plugin.stop}
			onmouseleave={plugin.reset}
		>
			<Carousel.Content>
				{#each carouselItems as item (item)}
					<Carousel.Item class="basis:1">
						<div class="h-full min-h-[28vh] p-1">
							<Card.Root class="h-full min-h-[28vh] overflow-hidden py-0">
								<Card.Content
									class="relative flex h-full min-h-[28vh] w-full items-center justify-center p-0"
								>
									<img
										src={item.image}
										alt={item.name}
										class="absolute inset-0 h-full w-full object-cover"
									/>
									<div class="absolute inset-0 bg-black/40"></div>
									<span
										class="relative z-10 px-2 text-center text-2xl font-bold text-white drop-shadow-lg"
									>
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
