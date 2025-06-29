<script lang="ts">
import CardItem from '$lib/components/card/card-item.svelte';

// Mock data for communities
const communities = [
  {
    id: 1,
    name: 'K-Pop Fans',
    description: 'A community for K-Pop lovers to share news, music, and meetups.',
    image: 'https://source.unsplash.com/random/400x300?kpop',
    address: 'Online'
  },
  {
    id: 2,
    name: 'Korean Foodies',
    description: 'Discover and share the best Korean food spots and recipes.',
    image: 'https://source.unsplash.com/random/400x300?korean-food',
    address: 'Seoul'
  },
  {
    id: 3,
    name: 'Language Exchange',
    description: 'Practice Korean and English with friendly members.',
    image: 'https://source.unsplash.com/random/400x300?language',
    address: 'Various locations'
  },
  {
    id: 4,
    name: 'Seoul Explorers',
    description: 'Join us to explore hidden gems and famous spots in Seoul.',
    image: 'https://source.unsplash.com/random/400x300?seoul',
    address: 'Seoul'
  },
  {
    id: 5,
    name: 'Tech in Korea',
    description: 'Connect with tech enthusiasts and professionals in Korea.',
    image: 'https://source.unsplash.com/random/400x300?technology',
    address: 'Online & Seoul'
  }
];
</script>

<svelte:head>
  <title>Communities | Meet in Korea</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl p-6">
  <h2 class="mb-6 text-3xl font-bold">Communities</h2>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each communities as community (community.id)}
      <CardItem cardItem={community} />
    {/each}
  </div>
</div>
