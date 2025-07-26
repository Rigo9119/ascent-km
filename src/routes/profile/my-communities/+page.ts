import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	try {
		const response = await fetch('/api/communities/my-communities');
		const result = await response.json();

		if (response.ok && result.success) {
			return {
				...data,
				myCommunities: result.communities
			};
		} else {
			console.error('Failed to fetch my communities:', result.error);
			return {
				...data,
				myCommunities: []
			};
		}
	} catch (error) {
		console.error('Error fetching my communities:', error);
		return {
			...data,
			myCommunities: []
		};
	}
};