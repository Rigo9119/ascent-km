<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import OnboardingForm from '../components/onboarding-form.svelte';
	import Card from '@/lib/components/ui/card/card.svelte';
	import { countryOptions } from '@/lib/utils/countryOptions';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { type PageData } from '../$types';

	type LocationValue = {city: string, country: string}

	let { data }: { data: PageData } = $props();
	const { supabase } = data;

	const onBoardingForm = createForm(() => ({
		defaultValues: {
			username: '',
			full_name: '',
			avatar: '',
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
			console.log('onboarding form: ', {
				...value, 
				city: value.location.city,
				country: value.location.country,
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString()
	
			});
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) {
				alert('You must be logged in to complete onboarding.');
				return;
			}

			const profileData = {
				...value,
				id: user.id,
				location: value.location ? JSON.stringify(value.location) : null,
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
				city: value.location.city,
				country: value.location.country,
				email: user.email
			};

			// const { error } = await supabase
			// 	.from('profiles')
			// 	.upsert(profileData, { onConflict: 'id' });

			// if (error) {
			// 	alert('Error saving profile: ' + error.message);
			// } else {
			// 	goto('/profile');
			// }
		}
	}));
</script>

<svelte:head>
	<title>On boarding | Next Roots</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
	<h2 class="mb-6 text-2xl font-bold">Complete your profile</h2>
	<Card class="mx-auto w-[90vw] max-w-3xl p-6">
		<OnboardingForm form={onBoardingForm} />
	</Card>
</div>
