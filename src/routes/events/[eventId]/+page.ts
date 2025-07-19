import type { PageLoad } from './$types';


export const load: PageLoad = async ({  params, url, fetch }) => {
		const { eventId } = params;
		const pathname = url.pathname;
		const urlSegments = pathname.split('/').filter(Boolean);
		const eventRes = await fetch(`/api/events/${eventId}`)
		const eventData = await eventRes.json()

		return { appEvent: eventData, urlSegments };

};
