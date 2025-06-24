<script lang="ts">

	import HouseIcon from '@lucide/svelte/icons/house';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import Map from '@lucide/svelte/icons/map';
	import User from '@lucide/svelte/icons/user';
	import Ticket from '@lucide/svelte/icons/ticket';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '../../lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { user } from '$lib/stores/user';
	import SidebarMenuSkeleton from '$lib/components/ui/sidebar/sidebar-menu-skeleton.svelte';

	async function handleLogin() {
		goto('/auth?mode=login');
	}

	async function handleSignup() {
		goto('/auth?mode=signup');
	}

	async function handleLogout() {
		const { supabase } = await import('$lib/supabaseClient');
		await supabase.auth.signOut();
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
		}
	];
</script>

{#if browser}
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
					{#if $user === undefined}
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
					{:else if $user}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="/profile" {...props}>
										<User />
										<span>Profile</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/profile/favourites">Favourites</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/profile/history">History</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<a href="/settings">
											Settings
										</a>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
						</Sidebar.MenuItem>
					{:else}
						<!-- Show nothing or auth links here if needed -->
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if $user === undefined}
			<!-- Optionally, show a spinner or nothing while loading -->
		{:else if !$user}
			<Button onclick={handleLogin}>Log in</Button>
			<Button onclick={handleSignup}>Sign up</Button>
		{:else}
			<Button onclick={handleLogout}>Log out</Button>
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
{/if}
