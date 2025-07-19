import type { PageLoad } from './$types';


export const load: PageLoad = async ({ fetch }) => {
  const resourcesRes = await fetch('/api/resources')
  const resourcesData = await resourcesRes.json()

  return {
    resources: resourcesData
  }
};