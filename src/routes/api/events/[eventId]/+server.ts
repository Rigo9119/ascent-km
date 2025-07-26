import { EventsService } from '@/lib/services/events-service.js'

export async function GET({ params, locals: { supabase } }) {
  const { eventId } = params
  
  const eventsService = new EventsService(supabase)
  const singleEvent = await eventsService.getEventById(eventId)

  return new Response(JSON.stringify(singleEvent))
}