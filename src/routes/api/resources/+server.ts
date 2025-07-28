import { ResourcesService } from '@/lib/services/resources-service';

export async function GET({ locals: { supabase } }) {
  try {
    const resourceService = new ResourcesService(supabase)
    const resourcesRes = await resourceService.getAllResources();
    const resourcesData = resourcesRes;

    return new Response(JSON.stringify(resourcesData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}
