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
      const { data: events, error: sbError } = await supabaseClient
        .from('events_with_details_v2')
        .select('*');

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
						*,
						locations (name),
						categories (name)
					`
        )
        .eq('id', eventId)
        .single();
      if (sbError) throw new Error(`event error: ${sbError.message}`);

      return event;
    } catch (error) {
      throw new Error(`getEventById-service-error: ${error}`);
    }
  }

  static async getEventTypes() {
    try {
      const { data: eventTypes, error: sbError } = await supabaseClient
        .from('event_types')
        .select('*');

      if (sbError) throw new Error(`event types error: ${sbError.message}`);

      return eventTypes;
    } catch (error) {
      throw new Error(`getEventTypes-service-error: ${error}`);
    }
  }
}
