import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getUser } }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(302, '/auth');
	}

	return {
		user
	};
};