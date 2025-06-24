import { readable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import type { User, Subscription } from '@supabase/supabase-js';
import { browser } from '$app/environment';

export const user = readable<User | null | undefined>(undefined, (set) => {
	let authListener: Subscription;

	async function fetchUser() {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		set(user);
	}

	if (browser) {
		fetchUser();

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				set(session?.user ?? null);
			}
			if (event === 'SIGNED_OUT') {
				set(null);
			}
		});

		authListener = subscription;
	}

	return () => {
		if (authListener) {
			authListener.unsubscribe();
		}
	};
});
