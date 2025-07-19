import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch,  }) => {
	const userData = await fetch('/api/user')
	const communitiesRes = await fetch('/api/communities')
	const { publicCommunities, featuredCommunities } = await communitiesRes.json()

		return {
			communities: publicCommunities || [],
			featuredCommunities: featuredCommunities || [],
			user: userData
		};

};
