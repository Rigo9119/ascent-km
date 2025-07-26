import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// POST /api/favorites/locations - Toggle favorite location
export const POST: RequestHandler = async ({ request, locals }) => {
	const { supabase } = locals;
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { location_id } = await request.json();

		if (!location_id) {
			return json({ error: 'Location ID is required' }, { status: 400 });
		}

		const { data, error } = await supabase.rpc('toggle_favorite_location', {
			user_uuid: user.id,
			location_uuid: location_id
		});

		if (error) {
			console.error('Error toggling favorite location:', error);
			return json({ error: 'Failed to toggle favorite' }, { status: 500 });
		}

		return json({
			success: true,
			is_favorited: data,
			message: data ? 'Location added to favorites' : 'Location removed from favorites'
		});
	} catch (error) {
		console.error('Error toggling favorite location:', error);
		return json({ error: 'Failed to toggle favorite' }, { status: 500 });
	}
};
