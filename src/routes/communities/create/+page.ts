import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	// For now, return empty options arrays until we have the actual data sources
	// TODO: Fetch categories, meeting frequencies, and community types from API

	const categoriesOptions = [
		{ value: 'tech', label: 'Technology' },
		{ value: 'language', label: 'Language Exchange' },
		{ value: 'culture', label: 'Culture' },
		{ value: 'food', label: 'Food & Dining' },
		{ value: 'sports', label: 'Sports & Fitness' },
		{ value: 'arts', label: 'Arts & Creative' },
		{ value: 'business', label: 'Business & Networking' },
		{ value: 'travel', label: 'Travel & Adventure' }
	];

	const meetingFrequencyOptions = [
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'biweekly', label: 'Every 2 weeks' },
		{ value: 'monthly', label: 'Monthly' },
		{ value: 'quarterly', label: 'Quarterly' },
		{ value: 'irregular', label: 'Irregular/As needed' },
		{ value: 'online', label: 'Online only' }
	];

	const communityTypeOptions = [
		{ value: 'social', label: 'Social Group' },
		{ value: 'professional', label: 'Professional Network' },
		{ value: 'hobby', label: 'Hobby/Interest Group' },
		{ value: 'learning', label: 'Learning/Study Group' },
		{ value: 'support', label: 'Support Group' },
		{ value: 'volunteer', label: 'Volunteer/Service' },
		{ value: 'sports', label: 'Sports Team/Club' },
		{ value: 'cultural', label: 'Cultural Organization' }
	];

	return {
		...data,
		categoriesOptions,
		meetingFrequencyOptions,
		communityTypeOptions
	};
};
