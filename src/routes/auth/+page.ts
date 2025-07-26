import type { AuthMode } from '@/lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const mode = url.searchParams.get('mode');

	return { mode: mode as AuthMode };
};
