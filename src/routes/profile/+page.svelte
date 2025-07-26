<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import Button from '@/lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { profile, user } = data;

	function getInitials(name: string | null | undefined) {
		if (!name) return '';
		const names = name.split(' ');
		return names.map((n) => n[0]).join('').toUpperCase();
	}
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<h2 class="mb-2 text-2xl font-bold text-emerald-600 sm:mb-4 sm:text-3xl md:text-4xl">
		Your profile 
	</h2>
	{#if user && profile}
		<div class="grid gap-6 md:grid-cols-2">
			<!-- Profile Header Card -->
			<Card class="w-full">
				<CardHeader class="flex flex-col items-center gap-2">
					<Avatar class="h-24 w-24">
						<AvatarImage src={profile.avatar_url ?? ''} alt="User avatar" />
						<AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
					</Avatar>
					<CardTitle class="text-2xl">{profile.full_name || profile.username || 'No Name'}</CardTitle>
					<CardDescription class="text-muted-foreground">{profile.email}</CardDescription>
					{#if profile.country}
						<span class="text-xs text-muted-foreground">{profile.country}</span>
					{/if}
				</CardHeader>
			</Card>

			<!-- Quick Links Card -->
			<Card>
				<CardHeader>
					<CardTitle>Quick Links</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<Button href="/profile/my-events" class="w-full justify-start" variant="outline">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						My Events
					</Button>
					<Button href="/profile/my-communities" class="w-full justify-start" variant="outline">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.196M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						My Communities
					</Button>
				</CardContent>
			</Card>

			<!-- Bio & Interests Card -->
			<Card>
				<CardHeader>
					<CardTitle>Bio & Interests</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div>
						<p class="font-semibold mb-1">Bio</p>
						<p>{profile.bio || 'Not provided'}</p>
					</div>
					{#if profile.interests && profile.interests.length}
						<div>
							<p class="font-semibold mb-1">Interests</p>
							<div class="flex flex-wrap gap-2">
								{#each profile.interests as interest}
									<Badge>{interest}</Badge>
								{/each}
							</div>
						</div>
					{/if}
				</CardContent>
			</Card>

			<!-- Contact Info Card (now includes Social Links) -->
			<Card>
				<CardHeader>
					<CardTitle>Contact Info</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div>
						<p class="font-semibold mb-1">Phone</p>
						<p>{profile.phone_number || 'Not provided'}</p>
					</div>
					<div>
						<p class="font-semibold mb-1">City</p>
						<p>{profile.city || 'Not provided'}</p>
					</div>
					<div>
						<p class="font-semibold mb-1">Country Code</p>
						<p>{profile.country_code || 'Not provided'}</p>
					</div>
					<div>
						<p class="font-semibold mb-1">Last Active</p>
						<p>{profile.last_active ? new Date(profile.last_active).toLocaleString() : 'N/A'}</p>
					</div>
					{#if profile.social_links && Object.keys(profile.social_links).length}
						<div>
							<p class="font-semibold mb-1">Social Links</p>
							<ul class="list-none list-inside text-sm flex flex-wrap gap-2">
								{#each Object.entries(profile.social_links) as [platform, url]}
									<li>
										<Button href={url as string} target="_blank" rel="noopener" variant="link">{platform}</Button>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</CardContent>
			</Card>
		</div>
		<div class="flex justify-end mt-6">
			<Button href="/profile/edit" class="bg-emerald-500 hover:bg-emerald-600">Edit Profile</Button>
		</div>
	{:else}
		<Card>
			<CardContent>
				<p>You are not logged in or your profile could not be loaded.</p>
				<a href="/auth" class="text-blue-500 hover:underline">Login</a>
			</CardContent>
		</Card>
	{/if}
</div>