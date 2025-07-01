import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { user, supabase } = await parent();

	if (!user) {
		return {
			profile: null
		};
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	if (error) {
		console.error('Error fetching profile:', error);
		return {
			profile: null
		};
	}

	return {
		profile
	};
}; 