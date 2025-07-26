import { LocationsService } from '@/lib/services/locations-service';

export async function GET() {
	const locations = await LocationsService.getAllLocations();

	return new Response(JSON.stringify({ locations }));
}
