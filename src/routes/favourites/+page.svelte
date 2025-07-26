<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<h2 class="mb-4 text-3xl font-bold text-emerald-600 md:mb-10 md:text-4xl">My Favourites</h2>
	<!-- Favourites: Events -->
	<div class="mb-8">
		<h2 class="mb-2 text-lg font-bold">Favourite Events</h2>
		<!-- TODO: Render user's favourite events here -->
		<div class="text-muted-foreground min-h-[40px]">No events to show.</div>
	</div>
	<Separator />
	<!-- Favourites: Locations -->
	<div class="mt-8 mb-8">
		<h2 class="mb-2 text-lg font-bold">Favourite Locations</h2>
		<!-- TODO: Render user's favourite locations here -->
		<div class="text-muted-foreground min-h-[40px]">No locations to show.</div>
	</div>
	<Separator />
	<!-- Favourites: Communities -->
	<div class="mt-8">
		<h2 class="mb-2 text-lg font-bold">Favourite Communities</h2>
		<!-- TODO: Render user's favourite communities here -->
		<div class="text-muted-foreground min-h-[40px]">No communities to show.</div>
	</div>
</div>
