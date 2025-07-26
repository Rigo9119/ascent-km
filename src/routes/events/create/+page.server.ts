import { EventsService } from '@/lib/services/events-service';
import { CategoriesService } from '@/lib/services/categories-services';
import { LocationsService } from '@/lib/services/locations-service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getUser } }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(303, '/auth?mode=login');
	}

	try {
		const eventsService = new EventsService(supabase);

		const [locations, categories, eventTypes] = await Promise.all([
			LocationsService.getLocationsNamesAndIds(),
			CategoriesService.getAllCategories(),
			eventsService.getEventTypes()
		]);

		const locationOptions = locations.map(
			(location: { location_id: string; location_name: string }) => ({
				value: location.location_id,
				label: location.location_name
			})
		);

		const categoriesOptions = categories.map((category: { id: string; name: string }) => ({
			value: category.id,
			label: category.name
		}));

		const eventTypeOptions = eventTypes.map((eventType: { id: string; name: string }) => ({
			value: eventType.id,
			label: eventType.name
		}));

		return {
			user,
			locationOptions,
			categoriesOptions,
			eventTypeOptions
		};
	} catch (error) {
		console.error('Error loading create event page:', error);
		throw redirect(303, '/events');
	}
};
