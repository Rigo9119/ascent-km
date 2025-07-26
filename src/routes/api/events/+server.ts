import { CategoriesService } from '@/lib/services/categories-services';
import { EventsService } from '@/lib/services/events-service.js';
import { LocationsService } from '@/lib/services/locations-service.js';
import { transformObjToSelectItemsObj } from '@/lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
  const eventsService = new EventsService(supabase);
  const categoriesService = new CategoriesService(supabase);
  const [events, locations, categories, eventTypes] = await Promise.all([
    eventsService.getEventsWithDetails(),
    LocationsService.getLocationsNamesAndIds(),
    categoriesService.getAllCategories(),
    eventsService.getEventTypes()
  ]);

  const locationsFilterOptions = locations.map(
    (location: { location_id: string; location_name: string }) => ({
      value: location.location_id,
      label: location.location_name
    })
  );

  const categoriesFilterOptions = transformObjToSelectItemsObj(categories)

  const eventTypesFilterOptions = transformObjToSelectItemsObj(eventTypes)

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
  try {
    const user = await getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const eventData = await request.json();
    const eventsService = new EventsService(supabase);

    // Handle image upload if provided
    let imageUrl = '';
    if (eventData.image_url) {
      // Convert data URL to blob
      const response = await fetch(eventData.image_url);
      const blob = await response.blob();
      imageUrl = await eventsService.uploadImage(blob, eventData.name);
    }

    // Prepare event data for database
    const eventPayload = {
      ...eventData,
      image_url: imageUrl,
      owner_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Create the event
    const createdEvent = await eventsService.createEvent(eventPayload);

    return new Response(JSON.stringify({
      success: true,
      event: createdEvent
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create event error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Failed to create event'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
