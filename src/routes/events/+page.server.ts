import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	const { data: events, error: fetchError } = await supabase.rpc(
		'get_events_with_details_v2'
		);

	if (fetchError) {
		throw error(404, 'Event not ');
	}

	return { appEvents: events };
};
