import { CommunitiesService } from '@/lib/services/communities-service';
import { EventsService } from '@/lib/services/events-service';
import { LocationService } from '@/lib/services/locations-service';

export async function GET() {
	try {
		const locations = await LocationService.getAllLocations();
		const featuredLocations = await LocationService.getFeaturedLocations();

		const events = await EventsService.getAllEvents();
		const trendingEvents = await EventsService.getTrendingEvents();

		const communities = await CommunitiesService.getAllCommunities();
		const featuredCommunities = await CommunitiesService.getFeaturedCommunities();

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
