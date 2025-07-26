import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
  const communitiesRes = await fetch('/api/communities');
  const { publicCommunities, featuredCommunities, communityTypes, categoriesOptions } =
    await communitiesRes.json();

  const meetingFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'irregular', label: 'Irregular/As needed' },
    { value: 'online', label: 'Online only' }
  ];

  return {
    communities: publicCommunities || [],
    featuredCommunities: featuredCommunities || [],
    categoriesOptions,
    meetingFrequencyOptions,
    communityTypeOptions: communityTypes || []
  };
};
