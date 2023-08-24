import { supabase, type Leader } from "$lib/supabase";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { username } = await request.json();
  console.log(username);

  try {
    await supabase.from("leaderboard").insert({
      name: username,
      score: 0,
    } satisfies Leader);

    return json({ status: 200 });
  } catch (error) {
    return json({ status: 200, error });
  }
}
