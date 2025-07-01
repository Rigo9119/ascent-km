import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, depends }) => {
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

	return { supabase, user };
}; 