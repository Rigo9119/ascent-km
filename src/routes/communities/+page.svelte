<script lang="ts">
import CardItem from '$lib/components/card/card-item.svelte';
	import { communities } from '@/lib/data/communities';

// Mock data for communities

</script>

<svelte:head>
  <title>Communities | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
  <!-- Header Section -->
  <div class="mb-6 sm:mb-8">
    <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-rose-600">Communities</h1>
    <p class="text-sm sm:text-base text-muted-foreground">
      Join communities and connect with people who share your interests
    </p>
  </div>
  
  <!-- Communities Grid -->
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
    {#each communities as community (community.id)}
      <CardItem cardItem={community} urlSection="communities"/>
    {/each}
  </div>
</div>
