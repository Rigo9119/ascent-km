import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { supabase } = locals;

		const { data: events, error: fetchEventsError } = await supabase.rpc(
			'get_events_with_details_v2'
		);

		if (fetchEventsError) {
			throw error(404, 'Event not found');
		}

		const { data: locations, error: fetchLocationsSelectError } = await supabase.rpc(
			'get_location_names_and_ids'
		);

		if (fetchLocationsSelectError) {
			throw error(404, 'Error fetching unique locations');
		}

		const locationsFilter = locations.map(
			(location: { location_id: string; location_name: string }) => ({
				value: location.location_id,
				label: location.location_name
			})
		);

		return { appEvents: events, locationsFilter: locationsFilter };
	} catch (eventsPageServerError) {
		throw error(404, `eventsPageServer error ${eventsPageServerError}`);
	}
};
