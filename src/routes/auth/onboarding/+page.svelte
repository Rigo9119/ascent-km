<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import OnboardingForm from '../components/onboarding-form.svelte';
	import Card from '@/lib/components/ui/card/card.svelte';
	import { countryOptions } from '@/lib/utils/countryOptions';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { type PageData } from '../$types';

	let { data }: {data: PageData} = $props();
	const { supabase } = data;

	const onBoardingForm = createForm(() => ({
		defaultValues: {
			username: '',
			full_name: '',
			avatar_url: '',
			updated_at: '',
			created_at: '',
			phone: '',
			country: '',
			interests: [],
			bio: '',
			location: '',
			social_links: [],
			preferences: [],
			last_active: ''
		},
		onSubmit: async ({ value }) => {
			console.log('onboarding form: ', {
								...value,
				location: value.location ? JSON.stringify(value.location) : null,
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
			//	email: user.email
			})
			// const { data: { user } } = await supabase.auth.getUser();
			// if (!user) {
			// 	alert('You must be logged in to complete onboarding.');
			// 	return;
			// }

			// const profileData = {
			// 	...value,
			// 	id: user.id,
			// 	location: value.location ? JSON.stringify(value.location) : null,
			// 	updated_at: new Date().toISOString(),
			// 	created_at: new Date().toISOString(),
			//	email: user.email
			// };

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
	let selectedCountry = $state(onBoardingForm.state.values.country || countryOptions[0].value);
</script>

<svelte:head>
	<title>On boarding | Next Roots </title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen w-full">
	<h2 class="mb-6 text-2xl font-bold">Complete your profile</h2>
	<Card class="w-[90vw] max-w-3xl mx-auto p-6">
		<OnboardingForm {countryOptions} form={onBoardingForm} />
	</Card>
</div>
