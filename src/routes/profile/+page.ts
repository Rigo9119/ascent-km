import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();

	if (!session) {
		return {
			profile: null
		};
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
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