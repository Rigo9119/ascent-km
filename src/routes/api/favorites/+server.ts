import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// GET /api/favorites - Get user's favorites
export const GET: RequestHandler = async ({ locals, url }) => {
	const { supabase } = locals;
	const user = await supabase.auth.getUser();

	if (!user.data.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = user.data.user.id;
	const type = url.searchParams.get('type'); // 'events', 'locations', 'communities'

	try {
		let favorites;

		switch (type) {
			case 'events': {
				const { data: eventFavorites, error: eventError } = await supabase
					.from('user_favorite_events')
					.select(`
						*,
						event:events(*)
					`)
					.eq('user_id', userId)
					.order('created_at', { ascending: false });

				if (eventError) throw eventError;
				favorites = eventFavorites;
				break;
			}

			case 'locations': {
				const { data: locationFavorites, error: locationError } = await supabase
					.from('user_favorite_locations')
					.select(`
						*,
						location:locations(*)
					`)
					.eq('user_id', userId)
					.order('created_at', { ascending: false });

				if (locationError) throw locationError;
				favorites = locationFavorites;
				break;
			}

			case 'communities': {
				const { data: communityFavorites, error: communityError } = await supabase
					.from('user_favorite_communities')
					.select(`
						*,
						community:communities(*)
					`)
					.eq('user_id', userId)
					.order('created_at', { ascending: false });

				if (communityError) throw communityError;
				favorites = communityFavorites;
				break;
			}

			default:
				return json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return json({ favorites });
	} catch (error) {
		console.error('Error fetching favorites:', error);
		return json({ error: 'Failed to fetch favorites' }, { status: 500 });
	}
};

// POST /api/favorites/events - Toggle favorite event
export const POST: RequestHandler = async ({ locals, request }) => {
	const { supabase } = locals;
	const user = await supabase.auth.getUser();

	if (!user.data.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = user.data.user.id;
	const { type, itemId } = await request.json();

	try {
		let result;

		switch (type) {
			case 'events': {
				const { data: eventResult, error: eventError } = await supabase
					.rpc('toggle_favorite_event', {
						user_uuid: userId,
						event_uuid: itemId
					});

				if (eventError) throw eventError;
				result = eventResult;
				break;
			}

			case 'locations': {
				const { data: locationResult, error: locationError } = await supabase
					.rpc('toggle_favorite_location', {
						user_uuid: userId,
						location_uuid: itemId
					});

				if (locationError) throw locationError;
				result = locationResult;
				break;
			}

			case 'communities': {
				const { data: communityResult, error: communityError } = await supabase
					.rpc('toggle_favorite_community', {
						user_uuid: userId,
						community_uuid: itemId
					});

				if (communityError) throw communityError;
				result = communityResult;
				break;
			}

			default:
				return json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return json({ 
			isFavorited: result,
			message: result ? 'Added to favorites' : 'Removed from favorites'
		});
	} catch (error) {
		console.error('Error toggling favorite:', error);
		return json({ error: 'Failed to toggle favorite' }, { status: 500 });
	}
}; 