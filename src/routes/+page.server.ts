import { supabase, type Leader } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const { data } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .limit(10);

  return {
    leaderboard: data as Leader[] ?? []
  };
}) satisfies PageServerLoad;
