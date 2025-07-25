import { CategoriesService } from '@/lib/services/categories-services';
import { EventsService } from '@/lib/services/events-service.js';
import { LocationsService } from '@/lib/services/locations-service.js';
import type { RequestHandler } from '@sveltejs/kit';

export async function GET() {
  const [events, locations, categories, eventTypes] = await Promise.all([
    EventsService.getEventsWithDetails(),
    LocationsService.getLocationsNamesAndIds(),
    CategoriesService.getAllCategories(),
    EventsService.getEventTypes()
  ]);

  const locationsFilterOptions = locations.map(
    (location: { location_id: string; location_name: string }) => ({
      value: location.location_id,
      label: location.location_name
    })
  );

  const categoriesFilterOptions = categories.map(
    (category: { id: string; name: string }) => ({
      value: category.id,
      label: category.name
    })
  );

  const eventTypesFilterOptions = eventTypes.map(
    (eventType: { id: string; name: string }) => ({
      value: eventType.id,
      label: eventType.name
    })
  );

  return new Response(
    JSON.stringify({
      events: events,
      locationsFilterOptions: locationsFilterOptions,
      categoriesFilterOptions: categoriesFilterOptions,
      eventTypeOptions: eventTypesFilterOptions
    })
  );
}

export const POST: RequestHandler = async ({ request, locals: { supabase, getUser } }) => {
  const user = await getUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { title, description, location_id } = await request.json();
  const { data, error } = await supabase
    .from('events')
    .insert([{ user_id: user.id, title, description, location_id }])
    .select()
    .single();
  if (error) return new Response(error.message, { status: 400 });
  return new Response(JSON.stringify(data), { status: 201 });
};
