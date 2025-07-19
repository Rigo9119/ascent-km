import { EventsService } from '@/lib/services/events-service.js'

export async function GET({ params }) {
  const { eventId } = params

  const singleEvent = await EventsService.getEventById(eventId)

  return new Response(JSON.stringify(singleEvent))
}