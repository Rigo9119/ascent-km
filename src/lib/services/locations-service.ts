import { supabaseClient } from '../supabase';

export class LocationService {
	static async getAllLocations() {
		try {
			const { data: locations, error: sbError } = await supabaseClient
				.from('locations')
				.select('*');

			if (sbError) throw new Error(`location error: ${sbError}`);
			return locations;
		} catch (error) {
			throw new Error(`getAllLocations-service-error: ${error}`);
		}
	}

	static async getFeaturedLocations() {
		try {
			const { data: featuredLocations, error: sbError } = await supabaseClient
				.from('locations')
				.select('*')
				.eq('is_featured', true)
				.order('rating', { ascending: false })
				.limit(4);
			if (sbError) throw new Error(`location error: ${sbError}`);
			return featuredLocations;
		} catch (error) {
			throw new Error(`getFeaturedLocations-services-error: ${error}`);
		}
	}
}
