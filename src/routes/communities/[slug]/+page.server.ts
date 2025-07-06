import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { slug } = params;
  const { supabase } = locals 

  const { data, error } = await supabase
    .from('communities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return {
      status: 404,
      error: new Error('Community not found')
    };
  }
  
  return {
    community: data
  };
}; 