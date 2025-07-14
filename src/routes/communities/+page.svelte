<script lang="ts">
import CardItem from '$lib/components/card/card-item.svelte';
	import type { Community } from '@/lib/types';

import type { PageData } from './$types';
import { page } from '$app/stores';
import Button from '@/lib/components/ui/button/button.svelte';
import * as Sheet from '@/lib/components/ui/sheet';

const { data }: { data: PageData } = $props();

const communities = $derived(data.communities as Community[]);
const featuredCommunities = $derived(data.featuredCommunities as Community[]);
</script>

<svelte:head>
  <title>Communities | Next Roots</title>
	<meta
		name="description"
		content="a wonderfull page where you can find all the info to meet people and visit places in South Korea"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
  <!-- Header Section -->
  <div class="mb-6 sm:mb-8">
    <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-rose-600">Communities</h1>
    <div class="flex items-center justify-between">
      <p class="text-sm sm:text-base text-muted-foreground mb-0">
        Join communities and connect with people who share your interests
      </p>
      {#if $page.data.user}
        <Sheet.Root>
          <Sheet.Trigger class="ml-4">
            <Button class="bg-rose-500 hover:bg-rose-600">Create Community</Button>
          </Sheet.Trigger>
          <Sheet.Content side="right">
            <Sheet.Header>
              <Sheet.Title>Create Community</Sheet.Title>
            </Sheet.Header>
            <form class="flex flex-col gap-4 mt-4">
              create community form
            </form>
          </Sheet.Content>
        </Sheet.Root>
      {/if}
    </div>
  </div>

  <!-- Featured Communities Section -->
  {#if featuredCommunities.length > 0}
    <section class="mb-8">
      <h2 class="text-xl font-semibold sm:text-2xl md:text-3xl mb-4 sm:mb-6">Featured Communities</h2>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
        {#each featuredCommunities as community (community.id)}
          <CardItem cardItem={community} urlSection="communities"/>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- All Communities Section -->
  <section>
    <h2 class="text-xl font-semibold sm:text-2xl md:text-3xl mb-4 sm:mb-6">All Communities</h2>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
      {#each communities as community (community.id)}
        <CardItem cardItem={community} urlSection="communities"/>
      {/each}
    </div>
  </section>
</div>
