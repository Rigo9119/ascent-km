import type { Handle } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const handle: Handle = async ({ event, resolve }) => {
  const access_token = event.cookies.get('sb-access-token');
  if (access_token) {
    const { data } = await supabase.auth.getUser(access_token);
    event.locals.user = data?.user ?? null;
  } else {
    event.locals.user = null;
  }
  return resolve(event);
}; 