import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const { slug } = params;
		const { supabase } = locals;

		const { data: community, error: communityError } = await supabase
			.from('communities')
			.select('*')
			.eq('id', slug)
			.single();

		if (communityError) {
			throw error(404, communityError);
		}

		return {
			community: community
		};
	} catch (communityPageServerError) {
		throw error(404, `communityPageServer error ==> ${communityPageServerError}`);
	}
};
