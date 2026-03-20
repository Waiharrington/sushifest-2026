"use server";

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { createClient } from "@supabase/supabase-js"

export async function submitRatingAndVote(
    userId: string,
    localeId: string,
    ratings: { flavor: number; service: number; presentation: number },
    wantToVote: boolean,
    confirmMoveVote: boolean = false
) {
    if (!userId || !localeId) {
        return { success: false, error: "Datos de usuario o local faltantes." }
    }

    // 1. Check if rating already exists
    const { data: existingRating } = await supabase
        .from('ratings')
        .select('id, flavor, service, presentation')
        .eq('user_id', userId)
        .eq('locale_id', localeId)
        .single()

    if (existingRating) {
        // If stars changed, reject (Ratings are immutable)
        if (existingRating.flavor !== ratings.flavor || 
            existingRating.service !== ratings.service || 
            existingRating.presentation !== ratings.presentation) {
            return { success: false, error: "La calificación de estrellas no se puede cambiar una vez enviada." }
        }
    } else {
        // 1.1 Save new Ratings
        const { error: ratingError } = await supabase
            .from('ratings')
            .insert({
                user_id: userId,
                locale_id: localeId,
                flavor: ratings.flavor,
                service: ratings.service,
                presentation: ratings.presentation
            })

        if (ratingError) {
            console.error("Rating Error:", ratingError)
            return { success: false, error: "Error al guardar la calificación." }
        }
    }

    // 2. Save Vote if requested
    if (wantToVote) {
        // Handle Vote Move or New Vote
        // We use Service Role to ensure we can see all votes and delete/upsert correctly
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!serviceRoleKey) return { success: false, error: "Error de configuración (Service Role)" }
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey)

        // 2.1 Check if user has a vote ELSEWHERE - USING ADMIN TO BYPASS RLS
        const { data: otherVote } = await supabaseAdmin
            .from('votes')
            .select('locale_id, locales(name)')
            .eq('user_id', userId)
            .neq('locale_id', localeId)
            .maybeSingle() // Use maybeSingle to avoid 406 errors on empty results

        if (otherVote && !confirmMoveVote) {
            const voteData = otherVote as unknown as { locales: { name: string } };
            return { 
                success: false, 
                code: 'VOTE_EXISTS', 
                currentLocaleName: voteData.locales?.name || "un restaurante" 
            }
        }

        // 2.2 Clear any existing vote for this user (Clear the field)
        await supabaseAdmin.from('votes').delete().eq('user_id', userId)

        // 2.3 Insert new vote
        const { error: voteError } = await supabaseAdmin
            .from('votes')
            .insert({ user_id: userId, locale_id: localeId })

        if (voteError) {
            console.error("Vote Error:", voteError)
            return { success: false, error: "Error de conexión con la arena de votación." }
        }
    }

    revalidatePath("/ranking")
    revalidatePath("/votar")
    return { success: true }
}

export async function getUserInteractions(userId: string) {
    if (!userId) return {}

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) return {}
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey)

    // Fetch all ratings for this user
    const { data: ratings } = await supabaseAdmin
        .from('ratings')
        .select('locale_id')
        .eq('user_id', userId)

    // Fetch the unique vote for this user
    const { data: vote } = await supabaseAdmin
        .from('votes')
        .select('locale_id')
        .eq('user_id', userId)
        .maybeSingle()

    const interactions: Record<string, { isRated: boolean, isVoted: boolean }> = {}

    ratings?.forEach(r => {
        interactions[r.locale_id] = { isRated: true, isVoted: false }
    })

    if (vote) {
        if (!interactions[vote.locale_id]) {
            interactions[vote.locale_id] = { isRated: false, isVoted: true }
        } else {
            interactions[vote.locale_id].isVoted = true
        }
    }

    return interactions
}
