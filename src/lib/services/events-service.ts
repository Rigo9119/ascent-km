import type { SupabaseClient } from '@supabase/supabase-js';

export class EventsService {
  constructor(private supabase: SupabaseClient) { }

  async getAllEvents() {
    try {
      const { data: events, error: sbError } = await this.supabase.from('events').select('*');

      if (sbError) throw new Error(`events error: ${sbError.message}`);

      return events;
    } catch (error) {
      throw new Error(`getAllEvents-service-error: ${error}`);
    }
  }

  async getTrendingEvents() {
    try {
      const { data: trendingEvents, error: sbError } = await this.supabase
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

  async getEventsWithDetails() {
    try {
      const { data: events, error: sbError } = await this.supabase
        .from('events_with_details_v2')
        .select('*');

      if (sbError) throw new Error(`events details error: ${sbError.message}`);
      return events;
    } catch (error) {
      throw new Error(`getEventsWithDetails-service-error: ${error}`);
    }
  }

  async getEventById(eventId: string) {
    try {
      const { data: event, error: sbError } = await this.supabase
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

  async getEventTypes() {
    try {
      const { data: eventTypes, error: sbError } = await this.supabase
        .from('event_types')
        .select('*');

      if (sbError) throw new Error(`event types error: ${sbError.message}`);

      return eventTypes;
    } catch (error) {
      throw new Error(`getEventTypes-service-error: ${error}`);
    }
  }

  async uploadImage(imageBlob: Blob, fileName: string) {
    const { data: imageUrl, error: imageUploadError } = await this.supabase.storage
      .from('event_images')
      .upload(`${fileName}.png`, imageBlob, {
        cacheControl: '3600',
        upsert: true
      });

    if (imageUploadError) {
      throw new Error(`Error uploading image: ${imageUploadError.message}`);
    }
    const { data } = this.supabase.storage.from('event_images').getPublicUrl(imageUrl.path);

    return data.publicUrl;
  }

  async createEvent(eventData: unknown) {
    try {
      const { data: event, error: sbError } = await this.supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (sbError) throw new Error(`event error: ${sbError.message}`);

      return event;
    } catch (error) {
      throw new Error(`createEvent-service-error: ${error}`);
    }
  }
}
