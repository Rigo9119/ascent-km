<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';

	const { menuItems } = $props();
</script>

{#each menuItems as item (item.title)}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton>
			{#snippet child({ props })}
				<a
					href={item.url}
					{...props}
					class={page.url.pathname === item.url
						? 'flex items-center gap-2 rounded bg-emerald-50 px-2 py-1 font-semibold text-emerald-600'
						: 'flex items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-emerald-50 hover:text-emerald-600'}
					data-sveltekit-preload-data="hover"
				>
					<item.icon class="h-4 w-4 stroke-2" />
					<span>{item.title}</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/each}
