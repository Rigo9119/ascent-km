import { supabaseClient } from '../supabase';

export class ResourcesService {
	static async getAllResources() {
		try {
			const { data: resources, error: sbError } = await supabaseClient
				.from('resources')
				.select('*');

			if (sbError) throw new Error(`getAllResources error: ${sbError}`);
			return resources;
		} catch (error) {
			throw new Error(`getAllResources-services-error: ${error}`);
		}
	}
}
