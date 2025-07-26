import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// POST /api/favorites/communities - Toggle favorite community
export const POST: RequestHandler = async ({ request, locals }) => {
	const { supabase } = locals;
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { community_id } = await request.json();

		if (!community_id) {
			return json({ error: 'Community ID is required' }, { status: 400 });
		}

		const { data, error } = await supabase.rpc('toggle_favorite_community', {
			user_uuid: user.id,
			community_uuid: community_id
		});

		if (error) {
			console.error('Error toggling favorite community:', error);
			return json({ error: 'Failed to toggle favorite' }, { status: 500 });
		}

		return json({
			success: true,
			is_favorited: data,
			message: data ? 'Community added to favorites' : 'Community removed from favorites'
		});
	} catch (error) {
		console.error('Error toggling favorite community:', error);
		return json({ error: 'Failed to toggle favorite' }, { status: 500 });
	}
};
