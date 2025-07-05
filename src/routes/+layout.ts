import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
		supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: null
	});

	const {
		data: { user }
	} = await supabase.auth.getUser();

	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);

	return { supabase, user, pathname, urlSegments };
}; 