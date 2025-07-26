import { supabaseClient } from '../supabase';

export class LocationsService {
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

	static async getLocationsNamesAndIds() {
		try {
			const { data: locations, error: sbError } = await supabaseClient.rpc(
				'get_location_names_and_ids'
			);

			if (sbError) throw new Error(`locations ids error: ${sbError}`);
			return locations;
		} catch (error) {
			throw new Error(`getLocationsNamesAndIds-service-error: ${error}`);
		}
	}

	static async getLocationById(locationId: string) {
		try {
			const { data: location, error: sbError } = await supabaseClient
				.from('locations')
				.select('*')
				.eq('id', locationId)
				.single();

			if (sbError) throw new Error(`locations ids error: ${sbError}`);
			return location;
		} catch (error) {
			throw new Error(`getLocationById-services-error: ${error}`);
		}
	}

	static async getRelatedLocations() {
		try {
			const { data: locations, error: sbError } = await supabaseClient
				.from('locations')
				.select('*')
				.limit(3);

			if (sbError) throw new Error(`location error: ${sbError}`);
			return locations;
		} catch (error) {
			throw new Error(`getAllLocations-service-error: ${error}`);
		}
	}
}
