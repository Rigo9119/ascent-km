import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	const { data: events, error: fetchError } = await supabase
  .from('events')
  .select(
		`
          *,
          location:locations(*),
          category:categories(*)
        `
	);

	if (fetchError) {
		throw error(404, 'Event not ');
    return { appEvents: []}
	}

	return { appEvents: events };
};
