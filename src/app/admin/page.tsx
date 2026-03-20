import { checkAuth } from "@/actions/admin"
import { AdminLogin } from "@/components/AdminLogin"
import { AdminDashboard } from "@/components/AdminDashboard"
import { supabase } from "@/lib/supabase"

// Force dynamic rendering so data is always fresh
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
        return <AdminLogin />
    }

    // Fetch data for the dashboard
    // Note: RLS must allow reading these tables. 
    // Votes are public read in our setup, Locales are public read.
    const { data: locales } = await supabase.from('locales').select('*').order('name')

    // Fetch ALL votes using batching to bypass the 1000-row limit per request
    let allVotes: { id: string; locale_id: string }[] = []
    let hasMore = true
    let page = 0
    const pageSize = 1000

    while (hasMore) {
        const { data, error } = await supabase
            .from('votes')
            .select('*')
            .range(page * pageSize, (page + 1) * pageSize - 1)

        if (error) {
            console.error('Error fetching votes batch:', error)
            break
        }

        if (data) {
            allVotes = [...allVotes, ...data]
            if (data.length < pageSize) {
                hasMore = false
            } else {
                page++
            }
        } else {
            hasMore = false
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <AdminDashboard
                locales={locales || []}
                votes={allVotes}
            />
        </div>
    )
}
