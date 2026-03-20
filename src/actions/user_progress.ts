'use server'

import { supabase } from "@/lib/supabase"

export async function getUserProgress(userId: string) {
    if (!userId) return { ratedCount: 0, totalCount: 0 }

    try {
        // 1. Get total number of locales
        const { count: totalCount } = await supabase
            .from('locales')
            .select('*', { count: 'exact', head: true })

        // 2. Get number of locales rated by the user
        // Using distinct locale_id from ratings table
        const { data: ratings } = await supabase
            .from('ratings')
            .select('locale_id')
            .eq('user_id', userId)

        const ratedIds = new Set(ratings?.map(r => r.locale_id) || [])

        return {
            ratedCount: ratedIds.size,
            totalCount: totalCount || 0
        }
    } catch (error) {
        console.error("Error fetching user progress:", error)
        return { ratedCount: 0, totalCount: 0 }
    }
}
