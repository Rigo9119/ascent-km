import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const locationSlug = Number(params.slug);
  
	return { locationSlug };
};
