import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	try {
		await supabase.auth.signOut();
		redirect(303, '/');
	} catch (logoutError) {
		throw error(404, `logout error ==> ${logoutError}`)
	}
}; 