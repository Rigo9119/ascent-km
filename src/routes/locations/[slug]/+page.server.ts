import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	const locationSlug = Number(params.slug);
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);

	const { supabase } = locals

  const { data: locations, error } = await supabase
    .from('locations')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

	const currentLocation = locations.find((loc) => loc.id === locationSlug)
	const relatedLocations = currentLocation
	? locations.filter((loc) => loc.id !== currentLocation.id).slice(0, 3)
	: []
  
	return { currentLocation, relatedLocations, urlSegments, locationSlug };
};
