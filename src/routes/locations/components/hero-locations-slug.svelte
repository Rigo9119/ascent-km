<script lang="ts">
	import MapPin from '@lucide/svelte/icons/map-pin';

	interface HeroProps {
		heroSrc: string;
		heroAlt: string;
		heroName: string;
		heroAddress: string;
	}

	const { heroSrc, heroAlt, heroName, heroAddress }: HeroProps = $props();
</script>

<div class="mb-6 sm:mb-8">
	<div class="relative aspect-[2/1] overflow-hidden rounded-lg">
		<img
			src={heroSrc || 'https://source.unsplash.com/random/1200x600?korea'}
			alt={heroAlt}
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-black/20"></div>
		<div class="absolute right-4 bottom-4 left-4">
			<h1 class="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
				{heroName}
			</h1>
			<div class="flex items-center gap-2 text-white/90">
				<MapPin class="h-4 w-4" />
				<span class="text-sm sm:text-base">{heroAddress}</span>
			</div>
		</div>
	</div>
</div>
