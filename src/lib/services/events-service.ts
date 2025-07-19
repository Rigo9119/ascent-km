import { supabaseClient } from '../supabase';

export class EventsService {
	static async getAllEvents() {
		try {
			const { data: events, error: sbError } = await supabaseClient.from('events').select('*');

			if (sbError) throw new Error(`events error: ${sbError.message}`);
			return events;
		} catch (error) {
			throw new Error(`getAllEvents-service-error: ${error}`);
		}
	}

	static async getTrendingEvents() {
		try {
			const { data: trendingEvents, error: sbError } = await supabaseClient
				.from('events')
				.select('*')
				.gte('date', new Date().toISOString())
				.order('date', { ascending: true })
				.limit(4);

			if (sbError) throw new Error(`events error: ${sbError.message}`);

			return trendingEvents;
		} catch (error) {
			throw new Error(`getTrendingEvents-service-error: ${error}`);
		}
	}

	static async getEventsWithDetails() {
		try {
			const { data: events, error: sbError } = await supabaseClient.from('events_with_details_v2').select('*');

			if (sbError) throw new Error(`events details error: ${sbError.message}`);
			return events;
		} catch (error) {
			throw new Error(`getEventsWithDetails-service-error: ${error}`);
		}
	}

	static async getEventById(eventId: string) {
		try {
			const { data: event, error: sbError } = await supabaseClient

				.from('events')
				.select(
					`
      id,
      name,
      description,
      date,
      time,
      location_id,
      locations!inner(id, name),
      category_id,
      categories!inner(id, name),
      event_type_id,
      event_types!inner(id, name),
      is_free,
      price,
      image_url,
      capacity,
      organizer,
      contact,
      website,
      requirements,
      highlights,
      long_description,
      is_featured,
      rating,
      created_at,
      updated_at
						`
				)
				.eq('id', eventId)
				.single();

			if (sbError) if (sbError) throw new Error(`event error: ${sbError.message}`);

			return event;
		} catch (error) {
			throw new Error(`getEventById-service-error: ${error}`);
		}
	}
}
