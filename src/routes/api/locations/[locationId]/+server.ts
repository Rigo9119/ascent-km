import { LocationsService } from '@/lib/services/locations-service';

export async function GET({ params }) {
	const { locationId } = params;
	const [location, locations] = await Promise.all([
		LocationsService.getLocationById(locationId),
		LocationsService.getRelatedLocations()
	]);

	return new Response(JSON.stringify({ location, locations }));
}
