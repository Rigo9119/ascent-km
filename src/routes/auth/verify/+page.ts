import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, parent }) => {
	const { supabase, session } = await parent();
	return { url, supabase, session };
}; 