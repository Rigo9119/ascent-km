<script lang="ts">
	export let item_id: string;
	export let item_type: 'event' | 'community' | 'location';

	let error = '';
	let success = false;

	async function favorite() {
		error = '';
		const res = await fetch('/api/favorites', {
			method: 'POST',
			body: JSON.stringify({ item_id, item_type }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (!res.ok) {
			error = await res.text();
		} else {
			success = true;
		}
	}
</script>

<button on:click={favorite}>⭐ Favorite</button>
{#if error}
	<p style="color: red">{error}</p>
{/if}
{#if success}
	<p>Favorited!</p>
{/if}
