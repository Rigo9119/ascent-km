import { supabaseClient } from '../supabase';

export class EventsService {
	static async getAllEvents() {
		try {
			const { data: events, error: sbError } = await supabaseClient.from('events').select('*');

			if (sbError) throw new Error(`events error: ${sbError}`);
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

			if (sbError) throw new Error(`events error: ${sbError}`);

			return trendingEvents;
		} catch (error) {
			throw new Error(`getTrendingEvents-service-error: ${error}`);
		}
	}
}

