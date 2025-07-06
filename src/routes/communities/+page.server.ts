import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	// Fetch all public communities
	const { data: communities, error: communitiesError } = await supabase
		.from('communities')
		.select('*')
		.eq('is_public', true)
		.order('created_at', { ascending: false });

	if (communitiesError) {
		console.error('Error fetching communities:', communitiesError);
	}

	// Fetch featured communities
	const { data: featuredCommunities, error: featuredCommunitiesError } = await supabase
		.from('communities')
		.select('*')
		.eq('is_public', true)
		.eq('is_featured', true)
		.order('member_count', { ascending: false })
		.limit(6);

	if (featuredCommunitiesError) {
		console.error('Error fetching featured communities:', featuredCommunitiesError);
	}

	return {
		communities: communities || [],
		featuredCommunities: featuredCommunities || []
	};
}; 