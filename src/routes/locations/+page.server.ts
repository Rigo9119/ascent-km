import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { supabase } = locals;

		const { data: locations, error: locationError } = await supabase.from('locations').select('*');

		if (locationError) {
			throw error(404, locationError);
		}

		return { locations };
	} catch (locationsPageServerError) {
		throw error(404, `locationsPageServer error ==> ${locationsPageServerError}`);
	}
};
