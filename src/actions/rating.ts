'use server'

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function submitRatingAndVote(
    userId: string,
    localeId: string,
    ratings: { flavor: number; service: number; presentation: number },
    wantToVote: boolean
) {
    if (!userId || !localeId) {
        return { success: false, error: "Datos de usuario o local faltantes." }
    }

    // 1. Save Ratings (Upsert)
    const { error: ratingError } = await supabase
        .from('ratings')
        .upsert({
            user_id: userId,
            locale_id: localeId,
            flavor: ratings.flavor,
            service: ratings.service,
            presentation: ratings.presentation
        }, { onConflict: 'user_id,locale_id' })

    if (ratingError) {
        console.error("Rating Error:", ratingError)
        return { success: false, error: "Error al guardar la calificación." }
    }

    // 2. Save Vote if requested
    if (wantToVote) {
        const { error: voteError } = await supabase
            .from('votes')
            .upsert({
                user_id: userId,
                locale_id: localeId
            }, { onConflict: 'user_id,locale_id' })

        if (voteError) {
            console.error("Vote Error:", voteError)
            return { success: false, error: "Error al registrar el voto." }
        }
    }

    revalidatePath("/ranking")
    revalidatePath("/votar")
    return { success: true }
}
