import { supabaseClient } from "../supabase";


export class EventsService {
  static async getAllEvents() {
    try {
      const { data: events, error: sbError } = await supabaseClient
      .from('events')
      .select('*');
    
    if (sbError) throw new Error(`events error: ${sbError}`);
    return events;

    } catch (error) {
      throw new Error(`getAllEvents-service-error: ${error}`)
    }
  }
}