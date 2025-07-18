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
}
