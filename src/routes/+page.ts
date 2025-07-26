import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const homeRes = await fetch('/api/home');
	const homeData = await homeRes.json();

	return homeData;
};
