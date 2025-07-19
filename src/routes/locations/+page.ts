import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	const locationRes = await fetch('/api/locations');
	const locations = await locationRes.json();

	return locations;
};
