"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function resetUserVotes(userId: string) {
  try {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) throw new Error("Service role key missing");
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    );

    // 1. Delete all ratings
    const { error: ratingsError } = await supabaseAdmin
      .from('ratings')
      .delete()
      .eq('user_id', userId);

    if (ratingsError) throw ratingsError;

    // 2. Delete all votes
    const { error: votesError } = await supabaseAdmin
      .from('votes')
      .delete()
      .eq('user_id', userId);

    if (votesError) throw votesError;

    revalidatePath('/votar');
    revalidatePath('/ranking');
    return { success: true };
  } catch (error) {
    console.error("Error resetting user votes:", error);
    return { success: false, error: (error as Error).message };
  }
}
