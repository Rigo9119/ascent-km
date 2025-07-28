import { LocationsService } from '@/lib/services/locations-service';

export async function GET({ params, locals: { supabase } }) {
  const { locationId } = params;
  const locationsService = new LocationsService(supabase)

  const [location, locations] = await Promise.all([
    locationsService.getLocationById(locationId as string),
    locationsService.getRelatedLocations()
  ]);

  return new Response(JSON.stringify({ location, locations }));
}
