import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { communityId } = params as Record<string, string>;
	const communityRes = await fetch(`/api/communities/${communityId}`);
	const community = await communityRes.json();

	return { community };
};
