import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getUser }, url }) => {
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);
	
	return {
		user: await getUser(),
		pathname,
		urlSegments
	};
}; 