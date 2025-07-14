import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { supabase, getUser } = locals;

		const { data: communities, error: communitiesError } = await supabase
			.from('communities')
			.select('*')
			.eq('is_public', true)
			.order('created_at', { ascending: false });

		if (communitiesError) {
			throw error(404, communitiesError);
		}

		const { data: featuredCommunities, error: featuredCommunitiesError } = await supabase
			.from('communities')
			.select('*')
			.eq('is_public', true)
			.eq('is_featured', true)
			.order('member_count', { ascending: false })
			.limit(6);

		if (featuredCommunitiesError) {
			throw error(404, featuredCommunitiesError);
		}

		const user = getUser ? await getUser() : null;

		return {
			communities: communities || [],
			featuredCommunities: featuredCommunities || [],
			user
		};
	} catch (communitiesPageServerError) {
		throw error(404, `eventPageServerError ==> ${communitiesPageServerError}`);
	}
};
