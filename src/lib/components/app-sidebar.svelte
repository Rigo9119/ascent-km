<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import Map from '@lucide/svelte/icons/map';
	import Ticket from '@lucide/svelte/icons/ticket';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from './ui/button/button.svelte';

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
			title: 'Search',
			url: '/search',
			icon: SearchIcon
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
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Button>Log in</Button>
		<Button>Create account</Button>
	</Sidebar.Footer>
</Sidebar.Root>
