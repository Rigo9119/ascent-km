<script lang="ts">
	import * as Sidebar from '@/lib/components/ui/sidebar/index';

	import '../app.css';
	import AppSidebar from '@/lib/components/app-sidebar/app-sidebar.svelte';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import AppBreacrumbs from '@/lib/components/app-sidebar/app-breacrumbs.svelte';
	import { fade } from 'svelte/transition';
	import { Toaster } from '@/lib/components/ui/sonner';

	export let data: LayoutData;

	$: ({ supabase, user, urlSegments } = data);

	setContext('supabase', supabase);

	$: breadcrumbs = urlSegments.map((segment: string, index: number, array: string[]) => ({
		label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
		href: '/' + array.slice(0, index + 1).join('/'),
		isLast: index === array.length - 1
	}));
</script>

<Sidebar.Provider>
	<AppSidebar {user} />
	<main class="w-full p-2">
		<div class="flex items-center gap-2 mb-4">
			<Sidebar.Trigger />
			{#if breadcrumbs.length > 0}
				<AppBreacrumbs {breadcrumbs} />
			{/if}
		</div>
		<div transition:fade={{ duration: 200 }}>
			<slot />
		</div>
	</main>
	<Toaster position="top-center" />
</Sidebar.Provider>
