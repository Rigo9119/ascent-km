
import { UserService } from "@/lib/services/user-service";

export async function GET() {
  const userData = await UserService.getUserSb();

  return new Response(JSON.stringify(({user: userData})))
}