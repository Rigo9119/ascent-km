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
}
