import type { User } from '@supabase/supabase-js';
import { supabaseClient } from '../supabase';

//TODO: User service needs to control auth and other user stuff

export class UserService {
	static async getUserSb(): Promise<User | null> {
		try {
			const {
				data: { user },
				error: sbError
			} = await supabaseClient.auth.getUser();

			if (sbError) throw new Error(`getAllCommunities error: ${sbError}`);

			return user;
		} catch (error) {
			throw new Error(`getUserSb-services-error: ${error}`);
		}
	}
}
