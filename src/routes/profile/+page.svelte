<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';

	export let data: PageData;

	$: ({ profile, session } = data);

	function getInitials(name: string | null | undefined) {
		if (!name) return '';
		const names = name.split(' ');
		return names
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	}
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
	<Card class="mx-auto w-full">
		<CardHeader>
			<CardTitle>Profile</CardTitle>
		</CardHeader>
		<CardContent class="space-y-6">
			{#if session && profile}
				<div class="flex items-center space-x-4">
					<Avatar class="h-24 w-24">
						<AvatarImage src={profile.avatar_url ?? ''} alt="User avatar" />
						<AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
					</Avatar>
					<div>
						<h2 class="text-2xl font-bold">{profile.full_name}</h2>
						<p class="text-muted-foreground">{session.user.email}</p>
					</div>
				</div>
				<Separator />
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<p class="font-semibold">Bio</p>
						<p>{profile.bio || 'Not provided'}</p>
					</div>
					<div>
						<p class="font-semibold">Phone</p>
						<p>{profile.phone || 'Not provided'}</p>
					</div>
				</div>
				<div class="mt-4 text-center">
					<a href="/settings" class="text-blue-500 hover:underline">Edit Profile</a>
				</div>
			{:else}
				<p>You are not logged in or your profile could not be loaded.</p>
				<a href="/auth" class="text-blue-500 hover:underline"> Login </a>
			{/if}
		</CardContent>
	</Card>
</div>