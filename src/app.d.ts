// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: import('@supabase/supabase-js').SupabaseClient;
			getUser(): Promise<import('@supabase/supabase-js').User | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '@beyonk/svelte-googlemaps';

export {};
