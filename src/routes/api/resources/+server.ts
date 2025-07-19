import { ResourcesService } from '@/lib/services/resources-service';

export async function GET() {
	try {
    const resourcesRes = await ResourcesService.getAllResources()
    const resourcesData = await resourcesRes

		return new Response(JSON.stringify(resourcesData), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
	} catch (error) {
		throw new Error(`API Error: ${error}`);
	}
}
