<script lang="ts">
	import type { AppLocation } from '@/lib/types';
  import { GoogleMap } from '@beyonk/svelte-googlemaps';

  const { currentLocation }: { currentLocation: AppLocation } = $props()

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<div class="space-y-6 sm:space-y-8 lg:col-span-2">
  <!-- Description -->
  <section>
    <h2 class="mb-4 text-xl font-semibold sm:text-2xl">About</h2>
    <p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
      {currentLocation?.description}
    </p>
  </section>

  <!-- Map -->
  <section>
    <h2 class="mb-4 text-xl font-semibold sm:text-2xl">Location</h2>
    <div class="h-64 overflow-hidden rounded-lg sm:h-80 md:h-96">
      {#if !apiKey}
        <div class="bg-muted flex h-full items-center justify-center rounded-lg">
          <p class="px-4 text-center text-sm sm:text-base">
            Please add your Google Maps API key to see the map.
          </p>
        </div>
      {:else}
        <GoogleMap
          {apiKey}
          center={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}
          zoom={15}
        />
      {/if}
    </div>
  </section>

  <!-- Tips -->
  {#if currentLocation?.tips && currentLocation.tips.length > 0}
    <section>
      <h2 class="mb-4 text-xl font-semibold sm:text-2xl">Tips for Visitors</h2>
      <ul class="space-y-3">
        {#each currentLocation.tips as tip}
          <li class="flex items-start gap-3">
            <div class="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
            <p class="text-muted-foreground text-base">{tip}</p>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>