import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	const eventsRes = await fetch('/api/events', { method: 'GET'});
	const { events, locationsFilter } = await eventsRes.json();

	return { appEvents: events, locationsFilter: locationsFilter };
};
