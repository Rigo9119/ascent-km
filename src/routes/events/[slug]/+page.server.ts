import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const { supabase } = locals;
	const { slug } = params;
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);

	const { data: event, error: fetchError } = await supabase.rpc('get_event_by_id', {
		event_id_param: `${slug}`
	});

	if (fetchError) {
		throw error(404, 'Event not found');
	}

	if (fetchError || !event) {
		throw error(404, 'Event not found');
	}

	return { appEvent: event[0], urlSegments };
};
