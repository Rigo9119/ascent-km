import { CommunitiesService } from '@/lib/services/communities-service';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, getUser } }) => {
	try {
		const user = await getUser();

		if (!user) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const communitiesService = new CommunitiesService(supabase);
		const myCommunities = await communitiesService.getUserCommunities(user.id);

		return json({
			success: true,
			communities: myCommunities || []
		});
	} catch (error) {
		console.error('My communities API error:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Internal server error'
			},
			{ status: 500 }
		);
	}
};
