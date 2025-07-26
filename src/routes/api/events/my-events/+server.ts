import { EventsService } from '@/lib/services/events-service';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, getUser } }) => {
	try {
		const user = await getUser();

		if (!user) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const eventsService = new EventsService(supabase);

		// Get events created by the current user with related data
		const myEvents = await eventsService.getUserEvents(user.id);

		return new Response(
			JSON.stringify({
				success: true,
				events: myEvents || []
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		console.error('My events API error:', error);
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : 'Internal server error'
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
