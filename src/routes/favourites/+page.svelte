<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import Button from '@/lib/components/ui/button/button.svelte';

	export let data: PageData;
	$: ({ user } = data);
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<Card class="mx-auto w-full">
		<CardHeader>
			<CardTitle>My Favourites</CardTitle>
		</CardHeader>
		<CardContent>
			{#if user}
				<p>Your saved favourites will appear here.</p>
				<!-- TODO: Implement favourites list -->
			{:else}
				<div class="text-center">
					<p class="mb-4">Please log in to see your favourites.</p>
					<a href="/auth">
						<Button>Login</Button>
					</a>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>