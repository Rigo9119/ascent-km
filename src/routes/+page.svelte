<script lang="ts">
	import HomeSection from '@/lib/components/home-section.svelte';
	import TrendingSection from '@/lib/components/trending-section.svelte';

	const mockCarouselItems = [
		{
			name: 'thing 1'
		},
		{
			name: 'thing 2'
		},
		{
			name: 'trending 3'
		},
		{
			name: 'trending 4'
		}
	];
</script>

<svelte:head>
	<title>Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="w-full p-2">
	<h1 class="py-4 text-5xl font-bold">Increadible page</h1>
	<HomeSection sectionTitle="Locations" carouselItems={mockCarouselItems} carouselDelay={5000} />
	<HomeSection sectionTitle="Events" carouselItems={mockCarouselItems} carouselDelay={4500} />

	<TrendingSection sectionTitle="Top locations" sectionItems={mockCarouselItems} />
	<TrendingSection sectionTitle="Trending events" sectionItems={mockCarouselItems} />
</div>
