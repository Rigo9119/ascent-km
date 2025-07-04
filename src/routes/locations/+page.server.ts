import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
  const { supabase } = locals

  const { data: locations, error } = await supabase
    .from('locations')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return { locations };
};