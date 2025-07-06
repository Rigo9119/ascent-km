import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	// Fetch locations data with all fields
	const { data: locations, error: locationsError } = await supabase
		.from('locations')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(10);

	if (locationsError) {
		console.error('Error fetching locations:', locationsError);
	}

	// Fetch events data - simplified query without joins for now
	const { data: events, error: eventsError } = await supabase
		.from('events')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(10);

	if (eventsError) {
		console.error('Error fetching events:', eventsError);
	}

	// Fetch featured/top locations
	const { data: featuredLocations, error: featuredLocationsError } = await supabase
		.from('locations')
		.select('*')
		.eq('is_featured', true)
		.order('rating', { ascending: false })
		.limit(4);

	if (featuredLocationsError) {
		console.error('Error fetching featured locations:', featuredLocationsError);
	}

	// Fetch trending events (upcoming events) - simplified query
	const { data: trendingEvents, error: trendingEventsError } = await supabase
		.from('events')
		.select('*')
		.limit(4);

	if (trendingEventsError) {
		console.error('Error fetching trending events:', trendingEventsError);
	}

	return {
		appLocations: locations || [],
		appEvents: events || [],
		featuredLocations: featuredLocations || [],
		trendingEvents: trendingEvents || []
	};
};
