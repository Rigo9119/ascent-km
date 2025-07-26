import { CategoriesService } from '@/lib/services/categories-services';
import { CommunitiesService } from '@/lib/services/communities-service';
import { transformObjToSelectItemsObj } from '@/lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
  const communitiesService = new CommunitiesService(supabase);
  const categoriesService = new CategoriesService(supabase);

  const [publicCommunities, featuredCommunities, communityTypes, categoriesOptions] =
    await Promise.all([
      communitiesService.getPublicCommunities(),
      communitiesService.getPublicFeaturedCommunities(),
      communitiesService.getAllCommunityTypes(),
      categoriesService.getAllCategories()
    ]);

  const transformedCategories = transformObjToSelectItemsObj(categoriesOptions);
  const transformedCommunityTypes = transformObjToSelectItemsObj(communityTypes);

  return json({
    publicCommunities,
    featuredCommunities,
    communityTypes: transformedCommunityTypes,
    categoriesOptions: transformedCategories
  });
};

export const POST: RequestHandler = async ({ request, locals: { supabase, getUser } }) => {
  try {
    const user = await getUser();

    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const communityData = await request.json();

    // Add organizer_id to the community data
    const communityWithOrganizer = {
      ...communityData,
      organizer_id: user.id,
      id: crypto.randomUUID()
    };

    const communitiesService = new CommunitiesService(supabase);
    const community = await communitiesService.createCommunity(communityWithOrganizer);

    return json({
      success: true,
      community
    });
  } catch (error) {
    console.error('Create community error:', error);
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to create community'
      },
      { status: 500 }
    );
  }
};
