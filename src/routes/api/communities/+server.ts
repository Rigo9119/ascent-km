import { CommunitiesService } from "@/lib/services/communities-service";

export async function GET() {
  const [publicCommunities, featuredCommunities] = await Promise.all([
    CommunitiesService.getPublicCommunities(),
    CommunitiesService.getPublicFeaturedCommunities()
  ])

  return new Response(JSON.stringify({ publicCommunities, featuredCommunities }))
}