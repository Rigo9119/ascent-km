import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { enhancedEvents } from '$lib/data/events';
import type { AppEvent } from '$lib/types';

export const load: PageLoad = async ({ params }): Promise<{ appEvent: AppEvent }> => {

	const appEvent = enhancedEvents.find((event) => event.id === Number(params.slug));

	if (!appEvent) {
		throw error(404, 'Event not found');
	}

	return { appEvent };
};
