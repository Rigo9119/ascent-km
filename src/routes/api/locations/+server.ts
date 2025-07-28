import { LocationsService } from '@/lib/services/locations-service';

export async function GET({ locals: { supabase } }) {
  const locationsService = new LocationsService(supabase)
  const locations = await locationsService.getAllLocations();

  return new Response(JSON.stringify({ locations }));
}
