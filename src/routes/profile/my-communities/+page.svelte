<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '@/lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;
	const { user, myCommunities } = data;

	// Delete dialog state
	let deleteDialogOpen = false;
	let communityToDelete: { id: string; name: string } | null = null;
	let isDeleting = false;

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function openDeleteDialog(communityId: string, communityName: string, event: Event) {
		// Prevent card click when clicking delete button
		event.stopPropagation();

		communityToDelete = { id: communityId, name: communityName };
		deleteDialogOpen = true;
	}

	function closeDeleteDialog() {
		deleteDialogOpen = false;
		communityToDelete = null;
		isDeleting = false;
	}

	async function confirmDelete() {
		if (!communityToDelete) return;

		isDeleting = true;

		try {
			const response = await fetch(`/api/communities/${communityToDelete.id}`, {
				method: 'DELETE'
			});

			const result = await response.json();

			if (response.ok && result.success) {
				toast.success('Community deleted successfully', {
					description: `${communityToDelete.name} has been permanently deleted.`
				});
				closeDeleteDialog();

				// Refresh the page to update the communities list
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				toast.error('Failed to delete community', {
					description: result.error || 'Something went wrong. Please try again.'
				});
				isDeleting = false;
			}
		} catch (error) {
			console.error('Error deleting community:', error);
			toast.error('Network error', {
				description: 'Unable to delete community. Please check your connection and try again.'
			});
			isDeleting = false;
		}
	}
</script>

<svelte:head>
	<title>My Communities - Ascent KM</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-emerald-600 sm:text-3xl md:text-4xl">My Communities</h1>
			<p class="text-muted-foreground mt-2">Communities you've created and are managing</p>
		</div>
		<Button href="/communities/create" class="bg-emerald-500 hover:bg-emerald-600">
			<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
				></path>
			</svg>
			Create Community
		</Button>
	</div>

	{#if myCommunities && myCommunities.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each myCommunities as community (community.id)}
				<Card
					class="cursor-pointer transition-shadow hover:shadow-lg"
					onclick={() => goto(`/communities/${community.id}`)}
				>
					<CardHeader>
						<div class="flex items-start justify-between">
							<CardTitle class="text-lg leading-tight">{community.name}</CardTitle>
							{#if community.is_featured}
								<Badge variant="secondary" class="bg-emerald-100 text-emerald-800">Featured</Badge>
							{/if}
						</div>
						<p class="text-muted-foreground line-clamp-2 text-sm">{community.description}</p>
					</CardHeader>
					<CardContent class="space-y-4">
						{#if community.image_url}
							<img
								src={community.image_url}
								alt={community.name}
								class="h-32 w-full rounded-md object-cover"
							/>
						{/if}

						<div class="space-y-2">
							<div class="text-muted-foreground flex items-center text-sm">
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.196M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									></path>
								</svg>
								{community.member_count} members
							</div>

							<div class="text-muted-foreground flex items-center text-sm">
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
								Created {formatDate(community.created_at)}
							</div>

							{#if community.location}
								<div class="text-muted-foreground flex items-center text-sm">
									<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										></path>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										></path>
									</svg>
									{community.location}
								</div>
							{/if}

							<div class="flex items-center justify-between pt-2">
								{#if community.is_public}
									<Badge variant="outline" class="border-green-600 text-green-600">Public</Badge>
								{:else}
									<Badge variant="outline" class="border-orange-600 text-orange-600">Private</Badge>
								{/if}
							</div>
						</div>

						<div class="space-y-2">
							{#if community.rules && community.rules.length > 0}
								<div class="text-muted-foreground flex items-center text-sm">
									<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>
									{community.rules.length} community {community.rules.length === 1
										? 'rule'
										: 'rules'}
								</div>
							{/if}

							{#if community.tags && community.tags.length > 0}
								<div class="flex flex-wrap gap-1">
									{#each community.tags.slice(0, 3) as tag}
										<Badge variant="secondary" class="text-xs">{tag}</Badge>
									{/each}
									{#if community.tags.length > 3}
										<Badge variant="secondary" class="text-xs">+{community.tags.length - 3}</Badge>
									{/if}
								</div>
							{/if}
						</div>

						<Separator />

						<div class="flex gap-2">
							<Button
								href="/communities/{community.id}/edit"
								variant="outline"
								size="sm"
								class="flex-1"
								onclick={(e) => e.stopPropagation()}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								class="flex-1"
								onclick={(e) => openDeleteDialog(community.id, community.name, e)}
							>
								<svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									></path>
								</svg>
								Delete
							</Button>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	{:else}
		<Card class="py-12 text-center">
			<CardContent>
				<div class="mx-auto max-w-md">
					<svg
						class="mx-auto mb-4 h-12 w-12 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.196M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						></path>
					</svg>
					<h3 class="mb-2 text-lg font-semibold text-gray-900">No communities yet</h3>
					<p class="text-muted-foreground mb-6">
						You haven't created any communities yet. Start building your community to connect with
						like-minded people.
					</p>
					<Button href="/communities/create" class="bg-emerald-500 hover:bg-emerald-600">
						Create Your First Community
					</Button>
				</div>
			</CardContent>
		</Card>
	{/if}
</div>

<!-- Delete Confirmation Dialog -->
<Dialog.Root bind:open={deleteDialogOpen}>
	<Dialog.Content class="flex flex-col">
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
					></path>
				</svg>
				Delete Community
			</Dialog.Title>
			<Dialog.Description class="mb-4">
				Are you sure you want to delete <strong>"{communityToDelete?.name}"</strong>?
				<br />
				<span class="font-medium text-red-600"
					>This action cannot be undone and will remove all community data, members, and
					discussions.</span
				>
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer class="gap-2 sm:gap-0">
			<div class="flex w-2/4 flex-row items-center justify-between">
				<Button variant="outline" onclick={closeDeleteDialog} disabled={isDeleting}>Cancel</Button>
				<Button variant="destructive" onclick={confirmDelete} disabled={isDeleting}>
					{#if isDeleting}
						<svg
							class="mr-2 h-4 w-4 animate-spin"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							></path>
						</svg>
						Deleting...
					{:else}
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							></path>
						</svg>
						Delete Community
					{/if}
				</Button>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
