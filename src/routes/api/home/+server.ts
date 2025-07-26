import { CommunitiesService } from '@/lib/services/communities-service';
import { EventsService } from '@/lib/services/events-service';
import { LocationsService } from '@/lib/services/locations-service';

export async function GET({ locals: { supabase } }) {
	try {
		const eventsService = new EventsService(supabase);
		const communitiesService = new CommunitiesService(supabase);

		const [locations, featuredLocations, events, trendingEvents, communities, featuredCommunities] =
			await Promise.all([
				LocationsService.getAllLocations(),
				LocationsService.getFeaturedLocations(),
				eventsService.getAllEvents(),
				eventsService.getTrendingEvents(),
				communitiesService.getAllCommunities(),
				communitiesService.getFeaturedCommunities()
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
