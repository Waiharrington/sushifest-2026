"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Resets all ratings and votes for a specific user.
 * USE WITH CAUTION - This is primarily for testing/resetting progress during development.
 */
export async function resetUserVotes(userId: string) {
  try {
    const { error } = await supabase
      .from('ratings')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    revalidatePath('/votar');
    return { success: true };
  } catch (error) {
    console.error("Error resetting user votes:", error);
    return { success: false, error: (error as Error).message };
  }
}
