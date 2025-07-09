import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	try {
		const locationSlug = params.slug;
		const pathname = url.pathname;
		const urlSegments = pathname.split('/').filter(Boolean);
	
		const { supabase } = locals;
	
		const { data: location, error: locationError } = await supabase
			.from('locations')
			.select('*')
			.eq('id', locationSlug)
			.single();
	
		if (locationError) {
			throw error(404, locationError);
		}
	
		const { data: locations, error: locationsError } = await supabase
			.from('locations')
			.select('*')
			.limit(3);
	
		if (locationsError) {
			throw error(404, locationsError);
		}
	
		return {
			currentLocation: location,
			relatedLocations: locations, 
			urlSegments, 
			locationSlug 
		};
	} catch (locationPageServerError) {
		throw error(404, `locationPageServer error ==> ${locationPageServerError}`)
	}
};
