import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	try {
		const { user, supabase } = await parent();
	
		if (!user) {
			return {
				profile: null
			};
		}
	
		const { data: profile, error: profilePageError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', user.id)
			.single();
	
		if (profilePageError) {
			throw error(404, profilePageError)
		}
	
		return {
			profile
		};
	} catch (profilePageServerError) {
		throw error(404, `profilePageServer error ==> ${profilePageServerError}`)
	}
}; 