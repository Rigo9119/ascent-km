import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const { discussionId } = params;

	return { discussionId };
};
