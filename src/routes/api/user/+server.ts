import { UserService } from '@/lib/services/user-service';

export async function GET({ locals: { supabase } }) {
  const userService = new UserService(supabase)
  const userData = await userService.getUserSb();

  return new Response(JSON.stringify({ user: userData }));
}
