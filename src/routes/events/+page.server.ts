import type { PageServerLoad } from '../auth/onboarding/$types';

export const load: PageServerLoad = async ({ fetch, url, locals: { supabase } }) => {
  const eventsRes = await fetch('/api/events', { method: 'GET' });
  const { events, locationsFilterOptions, categoriesFilterOptions } = await eventsRes.json();

  /*
  let query = await supabase.from('events').select('*')

  // filters to be used
  const category = url.searchParams.get('category') || '';
  const location = url.searchParams.get('location') || '';
  const date = url.searchParams.get('dateFrom') || '';
  const type = url.searchParams.get('type') || false;
  // page and items options of the queries
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = 20;

  if (location) query = query.eq('location', location);
  if (category) query = query.eq('category', category);
  if (date) query = query.gte('date', date);
  if (type) query = query.gte('is?free', type);

  */

  return {
    appEvents: events,
    locationsFilterOptions: locationsFilterOptions,
    categoriesFilterOptions: categoriesFilterOptions
  };
};
