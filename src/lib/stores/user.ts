import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const user = writable<import('@supabase/supabase-js').User | null | undefined>(undefined);

export async function fetchUser() {
  const { data } = await supabase.auth.getUser();
  user.set(data?.user ?? null);
} 