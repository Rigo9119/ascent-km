<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	const { menuItems } = $props();

	let expandedItems = $state<Record<string, boolean>>({});

	function toggleExpanded(itemTitle: string) {
		expandedItems[itemTitle] = !expandedItems[itemTitle];
	}

	function isActive(url: string) {
		return page.url.pathname === url || page.url.pathname.startsWith(url + '/');
	}
</script>

{#each menuItems as item (item.title)}
	<Sidebar.MenuItem>
		{#if item.subitems && item.subitems.length > 0}
			<!-- Collapsible menu item with subitems -->
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<button
						{...props}
						class={isActive(item.url)
							? 'flex w-full items-center justify-between gap-2 rounded bg-emerald-50 px-2 py-1 font-semibold text-emerald-600'
							: 'flex w-full items-center justify-between gap-2 rounded px-2 py-1 transition-colors hover:bg-emerald-50 hover:text-emerald-600'}
						onclick={() => toggleExpanded(item.title)}
					>
						<div class="flex items-center gap-2">
							<item.icon class="h-4 w-4 stroke-2" />
							<span>{item.title}</span>
						</div>
						<ChevronRight 
							class="h-3 w-3 transition-transform {expandedItems[item.title] ? 'rotate-90' : ''}" 
						/>
					</button>
				{/snippet}
			</Sidebar.MenuButton>
			
			{#if expandedItems[item.title]}
				<Sidebar.MenuSub>
					<!-- Main Communities link -->
					<Sidebar.MenuSubItem>
						<Sidebar.MenuSubButton>
							{#snippet child({ props })}
								<a
									href={item.url}
									{...props}
									class={page.url.pathname === item.url
										? 'flex items-center gap-2 rounded bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-600'
										: 'flex items-center gap-2 rounded px-2 py-1 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-600'}
									data-sveltekit-preload-data="hover"
								>
									<span>All Communities</span>
								</a>
							{/snippet}
						</Sidebar.MenuSubButton>
					</Sidebar.MenuSubItem>
					
					<!-- Subitems -->
					{#each item.subitems as subitem (subitem.title)}
						<Sidebar.MenuSubItem>
							<Sidebar.MenuSubButton>
								{#snippet child({ props })}
									<a
										href={subitem.url}
										{...props}
										class={isActive(subitem.url)
											? 'flex items-center gap-2 rounded bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-600'
											: 'flex items-center gap-2 rounded px-2 py-1 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-600'}
										data-sveltekit-preload-data="hover"
									>
										<subitem.icon class="h-3 w-3 stroke-2" />
										<span>{subitem.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuSubButton>
						</Sidebar.MenuSubItem>
					{/each}
				</Sidebar.MenuSub>
			{/if}
		{:else}
			<!-- Regular menu item without subitems -->
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<a
						href={item.url}
						{...props}
						class={isActive(item.url)
							? 'flex items-center gap-2 rounded bg-emerald-50 px-2 py-1 font-semibold text-emerald-600'
							: 'flex items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-emerald-50 hover:text-emerald-600'}
						data-sveltekit-preload-data="hover"
					>
						<item.icon class="h-4 w-4 stroke-2" />
						<span>{item.title}</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		{/if}
	</Sidebar.MenuItem>
{/each}
