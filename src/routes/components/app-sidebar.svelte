<script lang="ts">

	import HouseIcon from '@lucide/svelte/icons/house';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import Map from '@lucide/svelte/icons/map';
	import User from '@lucide/svelte/icons/user';
	import Ticket from '@lucide/svelte/icons/ticket';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '../../lib/components/ui/button/button.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let user: import('@supabase/supabase-js').User | null = null;

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		user = data?.user ?? null;
	});

	async function handleLogin() {
		goto('/auth?mode=login');
	}

	async function handleSignup() {
		goto('/auth?mode=signup');
	}

	async function handleLogout() {
		await supabase.auth.signOut();
		user = null;
		goto('/');
	}

	// Menu items.
	const items = [
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
			title: 'Settings',
			url: '/settings',
			icon: SettingsIcon
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
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
					{#if user}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="/profile" {...props}>
										<User />
										<span>Profile</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
							<Sidebar.MenuSub>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/profile/favourites/locations">Favourite Locations</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/profile/favourites/communities">Favourite Communities</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/profile/history/events">Event History</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							</Sidebar.MenuSub>
						</Sidebar.MenuItem>
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if !user}
			<Button onclick={handleLogin}>Log in</Button>
			<Button onclick={handleSignup}>Sign up</Button>
		{:else}
			<Button onclick={handleLogout}>Log out</Button>
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
