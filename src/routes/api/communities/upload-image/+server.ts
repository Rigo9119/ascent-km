import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase, getUser } }) => {
  try {
    const user = await getUser();

    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return json({ error: 'No image file provided' }, { status: 400 });
    }

    const fileName = `community-${crypto.randomUUID()}`;
    const fileBytes = await imageFile.arrayBuffer();
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('community_images')
      .upload(`${fileName}.png`, fileBytes, {
        cacheControl: '3600',
        upsert: true,
        contentType: imageFile.type
      });

    if (uploadError) {
      throw new Error(`Image upload failed: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('community_images')
      .getPublicUrl(uploadData.path);

    return json({
      success: true,
      imageUrl: publicUrlData.publicUrl
    });
  } catch (error) {
    console.error('Upload community image error:', error);
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to upload image'
      },
      { status: 500 }
    );
  }
};