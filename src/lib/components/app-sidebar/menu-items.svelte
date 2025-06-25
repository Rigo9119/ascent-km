<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';

  const { menuItems } = $props()
</script>

{#each menuItems as item (item.title)}
  <Sidebar.MenuItem>
    <Sidebar.MenuButton>
      {#snippet child({ props })}
        <a href={item.url} {...props}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      {/snippet}
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
{/each}