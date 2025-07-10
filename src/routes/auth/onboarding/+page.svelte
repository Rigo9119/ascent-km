<script>
	import { createForm } from '@tanstack/svelte-form';
	import OnboardingForm from '../components/onboarding-form.svelte';

	const onBoardingForm = createForm(() => ({
		defaultValues: {
			username: '',
			full_name: '',
			avatar_url: '',
			updated_at: '',
			created_at: '',
			phone: '',
			email: '',
			country: '',
			interests: [],
			bio: '',
			location: '',
			social_links: [],
			preferences: [],
			last_active: ''
		}
	}));
</script>

<svelte:head>title: "On boarding | Meet in Korea"</svelte:head>

<div>
	<h2>Complete your profile</h2>

	<OnboardingForm form={onBoardingForm} />
</div>
