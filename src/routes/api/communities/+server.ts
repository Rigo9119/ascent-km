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


    console.log('Raw community data:', communityData);

    // Handle image upload if provided
    let imageUrl = '';
    if (communityData.image_url && communityData.image_url.startsWith('data:')) {
      // Convert base64 to blob and upload
      const base64Data = communityData.image_url.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      const fileName = `community-${crypto.randomUUID()}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('community_images')
        .upload(`${fileName}.png`, blob, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('community_images')
        .getPublicUrl(uploadData.path);

      imageUrl = publicUrlData.publicUrl;
    }

    // Add organizer_id and image_url to the community data
    const communityWithOrganizer = {
      ...communityData,
      organizer_id: user.id,
      id: crypto.randomUUID(),
      image_url: imageUrl || communityData.image_url // Use uploaded URL or existing URL
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
