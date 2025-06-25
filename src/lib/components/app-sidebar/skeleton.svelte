<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import SidebarMenuSkeleton from '$lib/components/ui/sidebar/sidebar-menu-skeleton.svelte';
</script>

<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    <SidebarMenuSkeleton showIcon={true} />
  </Sidebar.MenuButton>
  <Sidebar.MenuSub>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton>
        <SidebarMenuSkeleton />
      </Sidebar.MenuSubButton>
    </Sidebar.MenuSubItem>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton>
        <SidebarMenuSkeleton />
      </Sidebar.MenuSubButton>
    </Sidebar.MenuSubItem>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton>
        <SidebarMenuSkeleton />
      </Sidebar.MenuSubButton>
    </Sidebar.MenuSubItem>
  </Sidebar.MenuSub>
</Sidebar.MenuItem>