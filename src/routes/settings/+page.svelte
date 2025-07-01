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
			<CardTitle>Settings</CardTitle>
		</CardHeader>
		<CardContent>
			{#if user}
				<p>Here you will be able to update your profile information.</p>
				<!-- TODO: Implement settings form -->
			{:else}
				<div class="text-center">
					<p class="mb-4">Please log in to manage your settings.</p>

						<Button href="/auth">Login</Button>

				</div>
			{/if}
		</CardContent>
	</Card>
</div>