import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getUser }, url }) => {
	try {
		const pathname = url.pathname;
		const urlSegments = pathname.split('/').filter(Boolean);

		return {
			user: await getUser(),
			pathname,
			urlSegments
		};
	} catch (layoutServerLoadError) {
		throw error(404, `loadLayoutServer error ==> ${layoutServerLoadError}`);
	}
};
