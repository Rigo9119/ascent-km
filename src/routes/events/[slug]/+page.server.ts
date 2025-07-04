import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { enhancedEvents } from '$lib/data/events';

export const load: PageServerLoad = async ({ params, url }) => {
	const pathname = url.pathname;
	const urlSegments = pathname.split('/').filter(Boolean);

	const appEvent = enhancedEvents.find((event) => event.id === Number(params.slug));

	if (!appEvent) {
		throw error(404, 'Event not found');
	}

	return { appEvent, urlSegments };
};
