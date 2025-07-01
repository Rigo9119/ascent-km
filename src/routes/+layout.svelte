<script lang="ts">
	import * as Sidebar from '@/lib/components/ui/sidebar/index';
	import '../app.css';
	import AppSidebar from '@/lib/components/app-sidebar/app-sidebar.svelte';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';

	export let data: LayoutData;

	$: ({ supabase, user } = data);

	setContext('supabase', supabase);
</script>

<Sidebar.Provider>
	<AppSidebar {user} />
	<main class="w-full p-2">
		<Sidebar.Trigger />
		<slot />
	</main>
</Sidebar.Provider>
