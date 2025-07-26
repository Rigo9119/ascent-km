import { EventsService } from '@/lib/services/events-service.js'
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
  const { eventId } = params
  
  const eventsService = new EventsService(supabase)
  const singleEvent = await eventsService.getEventById(eventId)

  return json(singleEvent);
}

export const DELETE: RequestHandler = async ({ params, locals: { supabase, getUser } }) => {
  try {
    const { eventId } = params;
    const user = await getUser();
    
    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const eventsService = new EventsService(supabase);
    
    // First check if the event exists and belongs to the user
    const event = await eventsService.getEventById(eventId);
    
    if (!event || event.owner_id !== user.id) {
      return json({ error: 'Event not found or unauthorized' }, { status: 404 });
    }

    // Delete the event
    await eventsService.deleteEvent(eventId);

    return json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete event error:', error);
    return json({
      error: error instanceof Error ? error.message : 'Failed to delete event'
    }, { status: 500 });
  }
}