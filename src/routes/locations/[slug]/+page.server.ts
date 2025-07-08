import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, url }) => {
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
		throw new Error(locationError.message);
	}

	const { data: locations, error: locationsError } = await supabase
		.from('locations')
		.select('*')
		.limit(3);

	if (locationsError) {
		throw new Error(locationsError.message);
	}

	return { currentLocation: location, relatedLocations: locations, urlSegments, locationSlug };
};
