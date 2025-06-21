<script lang="ts">
	import * as Sidebar from '@/lib/components/ui/sidebar/index';
	import '../app.css';
	import AppSidebar from '@/lib/components/app-sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full p-2">
		<Sidebar.Trigger />
		{@render children()}
	</main>
</Sidebar.Provider>
