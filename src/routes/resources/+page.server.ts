import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
  try {
    
    const { supabase } = locals
  
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*');
  
    if (error) {
      throw new Error(error.message);
    }
  
    return { resources };
  } catch (resorucesPageServerError) {
    throw error(404, `resorucesPageServer error ==> ${resorucesPageServerError}`)
  }
};