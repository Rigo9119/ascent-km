import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const { supabase } = locals;
	const query = url.searchParams.get('q');

	if (!query || query.trim() === '') {
		return json({ results: [] });
	}

	try {
		// Search across multiple tables
		const searchPromises = [
			// Search events
			supabase
				.from('events')
				.select('id, name, description, date, location_id')
				.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
				.limit(5),

			// Search locations
			supabase
				.from('locations')
				.select('id, name, description, address, rating')
				.or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`)
				.limit(5),

			// Search communities
			supabase
				.from('communities')
				.select('id, name, description, member_count, is_public')
				.eq('is_public', true)
				.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
				.limit(5)
		];

		const [eventsResult, locationsResult, communitiesResult] = await Promise.all(searchPromises);

		// Combine and format results
		const results = [
			...(eventsResult.data || []).map((event) => ({
				...event,
				type: 'event' as const
			})),
			...(locationsResult.data || []).map((location) => ({
				...location,
				type: 'location' as const
			})),
			...(communitiesResult.data || []).map((community) => ({
				...community,
				type: 'community' as const
			}))
		];

		return json({ results });
	} catch (error) {
		console.error('Search error:', error);
		return json({ results: [], error: 'Search failed' }, { status: 500 });
	}
};
