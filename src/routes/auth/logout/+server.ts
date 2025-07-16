import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	try {
		await supabase.auth.signOut();
	} catch (error) {
		console.error('Logout error:', error);
	}
	return redirect(303, '/');
};
