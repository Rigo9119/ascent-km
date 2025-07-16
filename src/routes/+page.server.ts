import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	const { data: locations, error: locationsError } = await supabase
		.from('locations')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(10);

	if (locationsError) {
		throw error(404, locationsError)
	}

	const { data: events, error: eventsError } = await supabase
		.from('events')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(10);

	if (eventsError) {
		throw error(404, eventsError)
	}

	const { data: featuredLocations, error: featuredLocationsError } = await supabase
		.from('locations')
		.select('*')
		.eq('is_featured', true)
		.order('rating', { ascending: false })
		.limit(4);

	if (featuredLocationsError) {
		throw error(404, featuredLocationsError)
	}

	const { data: trendingEvents, error: trendingEventsError } = await supabase
		.from('events')
		.select('*')
		.gte('date', new Date().toISOString())
		.order('date', { ascending: true })
		.limit(4);

	if (trendingEventsError) {
		throw error(404, trendingEventsError)
	}

	const { data: communities, error: communitiesError } = await supabase
		.from('communities')
		.select('*')
		.eq('is_public', true)
		.order('created_at', { ascending: false })
		.limit(4);

	if (communitiesError) {
		throw error(404, communitiesError)
	}

	const { data: featuredCommunities, error: featuredCommunitiesError } = await supabase
		.from('communities')
		.select('*')
		.eq('is_public', true)
		.eq('is_featured', true)
		.order('member_count', { ascending: false })
		.limit(4);

	if (featuredCommunitiesError) {
		throw error(404, featuredCommunitiesError)
	}

	return {
		appLocations: locations || [],
		appEvents: events || [],
		featuredLocations: featuredLocations || [],
		trendingEvents: trendingEvents || [],
		communities: communities || [],
		featuredCommunities: featuredCommunities || []
	};
};
