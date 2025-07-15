<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import OnboardingForm from '../components/onboarding-form.svelte';
	import Card from '@/lib/components/ui/card/card.svelte';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import { dataURLtoBlob } from '@/lib/utils';
	import type { Category, Preference } from './+page.server';
	import type { SupabaseClient, User } from '@supabase/supabase-js';

	interface OnboardingPageProps {
		supabase: SupabaseClient;
		interests: Category;
		preferences: Preference;
		user: User;
	}

	type LocationValue = { city: string; country: string };

	let { data }: { data: OnboardingPageProps } = $props();
	const { supabase, interests, preferences, user } = data;

	const onBoardingForm = createForm(() => ({
		defaultValues: {
			username: '',
			full_name: '',
			avatar_url: '',
			updated_at: '',
			created_at: '',
			phone_number: '',
			country_code: '',
			interests: [],
			bio: '',
			location: {} as LocationValue,
			social_links: [],
			preferences: [],
			last_active: ''
		},
		onSubmit: async ({ value }) => {
			let avatarBlob = dataURLtoBlob(value.avatar_url);
			let avatarPath;
			//stores the avatar image on the avatars bucket and gets the path
			const { data: avatarUrl, error: avartUploadError } = await supabase.storage
				.from('user_avatars')
				.upload(`${user.id}.png`, avatarBlob, {
					cacheControl: '3600',
					upsert: true
				});
			if (avartUploadError) {
				throw error(404, avartUploadError);
			} else {
				const { data } = supabase.storage.from('user_avatars').getPublicUrl(avatarUrl.path);
				avatarPath = data.publicUrl;
			}

			const profileData = {
				id: user.id,
				username: value.username,
				full_name: value.full_name,
				avatar_url: avatarPath,
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
				phone_number: value.phone_number,
				email: user.email,
				country_code: value.country_code,
				interests: [],
				bio: value.bio,
				city: value.location.city,
				country: value.location.country,
				social_links: value.social_links,
				preferences: value.preferences,
				last_active: new Date().toISOString()
			};

			// updates user profile
			const { error: updateUserProfileError } = await supabase
				.from('profiles')
				.upsert(profileData, { onConflict: 'id' });

			if (updateUserProfileError) {
				throw error(404, `Error saving profile: ${updateUserProfileError.message}`);
			} else {
				goto('/profile');
			}
		}
	}));
</script>

<svelte:head>
	<title>On boarding | Next Roots</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
	<h2 class="mb-6 text-2xl font-bold">Complete your profile</h2>
	<Card class="mx-auto w-[90vw] max-w-3xl p-6">
		<OnboardingForm
			form={onBoardingForm}
			interestsOptions={interests}
			preferencesOptions={preferences}
		/>
	</Card>
</div>
