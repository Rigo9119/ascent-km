import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const { supabase } = locals;
	const { slug } = params;
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);

	const { data: event, error: fetchError } = await supabase
		.from('events')
		.select(
			`
					*,
					location:locations(*),
					category:categories(*)
				`
		)
		.eq('id', slug);

	if (fetchError || !event) {
		throw error(404, 'Event not found');
		return { event: {} }
	}

	return { appEvent: event, urlSegments };
};
