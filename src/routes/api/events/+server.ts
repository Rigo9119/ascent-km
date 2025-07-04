import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase, getUser } }) => {
	const user = await getUser();
	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}
	const { title, description, location_id } = await request.json();
	const { data, error } = await supabase
		.from('events')
		.insert([{ user_id: user.id, title, description, location_id }])
		.select()
		.single();
	if (error) return new Response(error.message, { status: 400 });
	return new Response(JSON.stringify(data), { status: 201 });
}; 