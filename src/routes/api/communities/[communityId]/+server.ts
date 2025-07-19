import { CommunitiesService } from '@/lib/services/communities-service';

export async function GET({ params }) {
	const { communityId } = params;
	const community = await CommunitiesService.getCommunityById(communityId);

  return new Response(JSON.stringify(community))
}
