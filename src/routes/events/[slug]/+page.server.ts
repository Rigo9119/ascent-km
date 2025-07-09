import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	try {
		const { supabase } = locals;
		const { slug } = params;
		const pathname = url.pathname;
		const urlSegments = pathname.split('/').filter(Boolean);

		const { data: event, error: eventRetchError } = await supabase.rpc('get_event_by_id', {
			event_id_param: `${slug}`
		});

		if (eventRetchError) {
			throw error(404, eventRetchError);
		}

		return { appEvent: event[0], urlSegments };
	} catch (eventPageServerError) {
		throw error(404, `eventPageServer error ==> ${eventPageServerError}`);
	}
};
