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
            ? 'text-emerald-600 font-semibold bg-emerald-50 flex items-center gap-2 rounded px-2 py-1'
            : 'flex items-center gap-2 rounded px-2 py-1 hover:bg-emerald-50 hover:text-emerald-600 transition-colors'}
        >
          <item.icon class="w-4 h-4 stroke-2" />
          <span>{item.title}</span>
        </a>
      {/snippet}
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
{/each}