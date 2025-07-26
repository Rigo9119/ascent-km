import { CommunitiesService } from '@/lib/services/communities-service';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { communityId } = params;
	const communitiesService = new CommunitiesService(supabase);
	const community = await communitiesService.getCommunityById(communityId);

  return json(community);
}

export const DELETE: RequestHandler = async ({ params, locals: { supabase, getUser } }) => {
  try {
    const { communityId } = params;
    const user = await getUser();
    
    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const communitiesService = new CommunitiesService(supabase);
    
    // First check if the community exists and belongs to the user
    const community = await communitiesService.getCommunityById(communityId);
    
    if (!community || community.organizer_id !== user.id) {
      return json({ error: 'Community not found or unauthorized' }, { status: 404 });
    }

    // Delete the community
    await communitiesService.deleteCommunity(communityId);

    return json({
      success: true,
      message: 'Community deleted successfully'
    });

  } catch (error) {
    console.error('Delete community error:', error);
    return json({
      error: error instanceof Error ? error.message : 'Failed to delete community'
    }, { status: 500 });
  }
}
