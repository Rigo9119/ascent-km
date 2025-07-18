import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const homePageData = await fetch('/api/home');
	const homeData= await homePageData.json();

	return homeData;
};
