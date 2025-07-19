import { CommunitiesService } from '@/lib/services/communities-service';
import { EventsService } from '@/lib/services/events-service';
import { LocationService } from '@/lib/services/locations-service';

export async function GET() {
	try {
		const [
			locations,
			featuredLocations,
			events,
			trendingEvents,
			communities,
			featuredCommunities
		] = await Promise.all([
			LocationService.getAllLocations(),
			LocationService.getFeaturedLocations(),
			EventsService.getAllEvents(),
			EventsService.getTrendingEvents(),
			CommunitiesService.getAllCommunities(),
			CommunitiesService.getFeaturedCommunities()
		]);

		const responseObj = {
			locations,
			featuredLocations,
			events,
			trendingEvents,
			communities,
			featuredCommunities
		};

		return new Response(JSON.stringify(responseObj), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
	} catch (error) {
		throw new Error(`API Error: ${error}`);
	}
}
