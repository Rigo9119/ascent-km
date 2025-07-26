import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	try {
		const response = await fetch('/api/events/my-events');
		const result = await response.json();

		if (response.ok && result.success) {
			return {
				...data,
				myEvents: result.events
			};
		} else {
			console.error('Failed to fetch my events:', result.error);
			return {
				...data,
				myEvents: []
			};
		}
	} catch (error) {
		console.error('Error fetching my events:', error);
		return {
			...data,
			myEvents: []
		};
	}
};
