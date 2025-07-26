import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const { locationId } = params as Record<string, string>;
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);
	const locationRes = await fetch(`/api/locations/${locationId}`);
	const { location, locations } = await locationRes.json();

	return {
		currentLocation: location,
		relatedLocations: locations,
		urlSegments,
		locationId
	};
};
