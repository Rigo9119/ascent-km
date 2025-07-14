<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<h2 class="md:mb-10 font-bold text-rose-600 mb-4 text-3xl md:text-4xl">
		My Favourites
	</h2>
		<!-- Favourites: Events -->
		<div class="mb-8">
			<h2 class="text-lg font-bold mb-2">Favourite Events</h2>
			<!-- TODO: Render user's favourite events here -->
			<div class="min-h-[40px] text-muted-foreground">No events to show.</div>
		</div>
		<Separator />
		<!-- Favourites: Locations -->
		<div class="mb-8 mt-8">
			<h2 class="text-lg font-bold mb-2">Favourite Locations</h2>
			<!-- TODO: Render user's favourite locations here -->
			<div class="min-h-[40px] text-muted-foreground">No locations to show.</div>
		</div>
		<Separator />
		<!-- Favourites: Communities -->
		<div class="mt-8">
			<h2 class="text-lg font-bold mb-2">Favourite Communities</h2>
			<!-- TODO: Render user's favourite communities here -->
			<div class="min-h-[40px] text-muted-foreground">No communities to show.</div>
		</div>

</div>