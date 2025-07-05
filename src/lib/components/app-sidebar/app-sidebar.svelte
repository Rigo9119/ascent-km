<script lang="ts">
	import HouseIcon from '@lucide/svelte/icons/house';
	import Map from '@lucide/svelte/icons/map';
	import UserIcon from '@lucide/svelte/icons/user';
	import Ticket from '@lucide/svelte/icons/ticket';
	import Handshake from '@lucide/svelte/icons/handshake';
	import CircleX from '@lucide/svelte/icons/circle-x';
	import Heart from '@lucide/svelte/icons/heart';
	import FileSearch from '@lucide/svelte/icons/file-search';
	import Settings from '@lucide/svelte/icons/settings';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Skeleton from './skeleton.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import MenuItems from './menu-items.svelte';
	import Separator from '../ui/separator/separator.svelte';
	import type { SupabaseClient, User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';

	export let user: User | null;

	const sidebar = Sidebar.useSidebar();
	const supabase = getContext<SupabaseClient>('supabase');

	async function handleLogin() {
		goto('/auth?mode=login');
	}

	async function handleSignup() {
		goto('/auth?mode=signup');
	}

	async function handleLogout() {
		await supabase.auth.signOut();
		await goto('/', { invalidateAll: true });
	}

	// Menu items.
	const menuItems = [
		{
			title: 'Home',
			url: '/',
			icon: HouseIcon
		},
		{
			title: 'Events',
			url: '/events',
			icon: Ticket
		},
		{
			title: 'Locations',
			url: '/locations',
			icon: Map
		},
		{
			title: 'Communities',
			url: '/communities',
			icon: Handshake
		},
		{
			title: 'Resources',
			url: '/resources',
			icon: FileSearch
		},
		{
			title: 'Blog',
			url: '/blog',
			icon: BookOpen
		}
	];

	// Protected menu items
	const protectedItems = [
		{
			title: 'Profile',
			url: '/profile',
			icon: UserIcon
		},
		{
			title: 'Favourites',
			url: '/favourites',
			icon: Heart
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings
		}
	];
</script>

{#if browser}
	<Sidebar.Root>
		<Sidebar.Header>
			<div class="flex flex-row items-center justify-between">
				<h2 class="font-semibold text-rose-600">Menu</h2>
				<Button variant="ghost" size="icon" onclick={() => sidebar.toggle()}>
					<CircleX color="oklch(58.6% 0.253 17.585)" />
				</Button>
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<MenuItems {menuItems} />
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Separator />
			{#if user === undefined}
				<Skeleton />
			{:else if user}
				<Sidebar.Group>
					<Sidebar.GroupLabel>Profile</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<MenuItems menuItems={protectedItems} />
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/if}
		</Sidebar.Content>
		<Sidebar.Footer>
			{#if user === undefined}
				<!-- Optionally, show a spinner or nothing while loading -->
			{:else if !user}
				<Button href="/auth?mode=login" class="bg-rose-500 hover:bg-rose-600">Log in</Button>
				<Button href="/auth?mode=signup" class="bg-rose-500 hover:bg-rose-600">Sign up</Button>
			{:else}
				<form action="/auth/logout" method="POST">
					<Button type="submit" class="w-full bg-rose-500 hover:bg-rose-600">Log out</Button>
				</form>
			{/if}
		</Sidebar.Footer>
	</Sidebar.Root>
{/if}
