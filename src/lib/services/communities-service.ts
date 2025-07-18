import { supabaseClient } from '../supabase';

export class CommunitiesService {
	static async getAllCommunities() {
		try {
			const { data: communities, error: sbError } = await supabaseClient
				.from('communities')
				.select('*');

			if (sbError) throw new Error(`getAllCommunities error: ${sbError}`);
			return communities;
		} catch (error) {
			throw new Error(`getAllCommunities-services-error: ${error}`);
		}
	}

	static async getFeaturedCommunities() {
		try {
			const { data: featuredCommunities, error: sbError } = await supabaseClient
				.from('communities')
				.select('*')
				.eq('is_public', true)
				.eq('is_featured', true)
				.order('member_count', { ascending: false })
				.limit(4);

			if (sbError) throw new Error(`getFeaturedCommunities error: ${sbError}`);
			return featuredCommunities;
		} catch (error) {
			throw new Error(`getFeaturedCommunities-services-error: ${error}`);
		}
	}
}
