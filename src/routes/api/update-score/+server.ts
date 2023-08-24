import { supabase } from "$lib/supabase";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { username, score } = await request.json();
  console.log(username, score);

  try {
    await supabase.from("leaderboard").update({ score }).eq("name", username);

    return json({ status: 200 });
  } catch (error) {
    return json({ status: 200, error });
  }
}
