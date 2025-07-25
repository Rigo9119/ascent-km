import type { PageServerLoad } from '../auth/onboarding/$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const eventsRes = await fetch('/api/events', { method: 'GET' });
  const { events, locationsFilterOptions, categoriesFilterOptions } = await eventsRes.json();

  return {
    appEvents: events,
    locationsFilterOptions: locationsFilterOptions,
    categoriesFilterOptions: categoriesFilterOptions
  };
};
