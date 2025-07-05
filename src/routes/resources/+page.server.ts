import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
  const { supabase } = locals

  const { data: resources, error } = await supabase
    .from('resources')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return { resources };
};