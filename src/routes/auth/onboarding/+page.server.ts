import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type Category = {
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	color: string;
};

export type Preference = {
	id: number;
	name: string;
	description: string;
	data_type: string;
	default_value: boolean;
	created_at: string;
	updated_at: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, getUser } = locals;
	const user = getUser ? await getUser() : null;

	const { data: categoriesData, error: categoriesError } = await supabase
		.from('categories')
		.select('*');
	if (categoriesError) {
		throw error(404, categoriesError);
	}
	const interests = categoriesData.map((category: Category) => ({
		value: category.id,
		label: category.name
	}));

	const { data: preferencesData, error: preferencesError } = await supabase
		.from('preference_types')
		.select('*');
	if (preferencesError) {
		throw error(404, preferencesError);
	}

	const preferences = preferencesData.map((preference: Preference) => ({
		value: preference.id,
		label: preference.name
			.split('_')
			.map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
			.join(' ')
	}));

	return {
		interests,
		preferences,
		user
	};
};
