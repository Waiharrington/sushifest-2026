import { useState, useEffect, useMemo } from "react"
import { motion, Variants } from "framer-motion"
import { LocaleCard } from "./LocaleCard"
import { RatingModal } from "./RatingModal"
import { VoteSuccessModal } from "./VoteSuccessModal"
import { submitRatingAndVote } from "@/actions/rating"
import { useAuth } from "@/context/AuthContext"
import { getUserProgress } from "@/actions/user_progress"
import { Search } from "lucide-react"

interface Locale {
    id: string
    name: string
    image_url: string
    description?: string
}

interface LocaleGridProps {
    locales: Locale[]
    onModalStateChange?: (isOpen: boolean) => void
}

export function LocaleGrid({ locales, onModalStateChange }: LocaleGridProps) {
    const { user } = useAuth()
    const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null)
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [votedLocalInfo, setVotedLocalInfo] = useState<{ name: string, image: string } | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [progress, setProgress] = useState({ ratedCount: 0, totalCount: 0 })

    const filteredLocales = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return locales
        return locales.filter(locale => 
            locale.name.toLowerCase().includes(term)
        )
    }, [locales, searchTerm])

    // Notify parent about modal state
    useEffect(() => {
        onModalStateChange?.(isRatingModalOpen || showSuccessModal)
    }, [isRatingModalOpen, showSuccessModal, onModalStateChange])

    // Load user progress
    useEffect(() => {
        if (user) {
            getUserProgress(user.id).then(setProgress)
        }
    }, [user, showSuccessModal]) // Reload when user changes or after a successful vote/rating

    const handleRatingClick = (locale: Locale) => {
        setSelectedLocale(locale)
        setIsRatingModalOpen(true)
    }

    const handleRatingSubmit = async (
        ratings: { flavor: number, service: number, presentation: number }, 
        wantToVote: boolean,
        confirmMove: boolean = false
    ) => {
        if (!selectedLocale || !user) return
        setIsSubmitting(true)

        try {
            const result = await submitRatingAndVote(user.id, selectedLocale.id, ratings, wantToVote, confirmMove)

            if (!result.success) {
                if (result.code === 'VOTE_EXISTS') {
                    const confirm = window.confirm(
                        `Ya tienes un voto registrado para "${result.currentLocaleName}".\n\n` +
                        `¿Quieres mover tu voto a "${selectedLocale.name}"?\n` +
                        `(Tu calificación de estrellas se guardará de todos modos).`
                    )
                    if (confirm) {
                        // Retry with confirmation
                        await handleRatingSubmit(ratings, wantToVote, true)
                        return
                    }
                } else {
                    alert(result.error)
                }
            } else {
                setVotedLocalInfo({
                    name: selectedLocale.name,
                    image: selectedLocale.image_url
                })
                setIsRatingModalOpen(false)
                setSelectedLocale(null)
                setShowSuccessModal(true)
            }
        } catch (e) {
            console.error(e)
            alert("Hubo un error inesperado al guardar tu calificación.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (locales.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white">No hay participantes registrados aún.</h2>
            </div>
        )
    }

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    }


    return (
        <div className="space-y-10">
            {/* Search and Instructions Section */}
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-white group-focus-within:text-[#00B2FF] transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar restaurante..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 rounded-full py-5 pl-16 pr-12 outline-none focus:border-[#00B2FF] focus:bg-black/80 text-white placeholder:text-white/20 transition-all backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-6 flex items-center text-white/40 hover:text-white transition-colors"
                            aria-label="Limpiar búsqueda"
                            title="Limpiar búsqueda"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 18L6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <p className="text-center text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                    Puedes calificar varios, pero <span className="text-[#00B2FF]">votar solo por uno</span>
                </p>
            </div>

            {filteredLocales.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <p className="font-lilita text-2xl text-white/40 uppercase">No se encontró al gladiador 🍣</p>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-12"
                >
                    {filteredLocales.map((locale, index) => (
                        <motion.div key={locale.id} variants={item}>
                            <LocaleCard
                                locale={locale}
                                onVoteClick={handleRatingClick}
                                rank={index + 1}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Progress Counter Footer */}
            {!searchTerm && (
                <div className="pt-12 pb-6 text-center">
                    <div className="inline-flex flex-col items-center gap-2 px-8 py-4 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md shadow-2xl">
                        <p className="text-[10px] md:text-sm font-black text-white/60 uppercase tracking-[0.25em]">
                            Has calificado <span className="text-white">{progress.ratedCount}</span> de <span className="text-white">{progress.totalCount || locales.length}</span> restaurantes
                        </p>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(progress.ratedCount / (progress.totalCount || locales.length)) * 100}%` }}
                                className="h-full bg-gradient-to-r from-[#0066FF] to-[#00B2FF]"
                            />
                        </div>
                    </div>
                </div>
            )}

            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                onRating={handleRatingSubmit}
                localeId={selectedLocale?.id || ""}
                localeName={selectedLocale?.name || ""}
                isSubmitting={isSubmitting}
            />

            <VoteSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                localeName={votedLocalInfo?.name || ""}
                localeImage={votedLocalInfo?.image || ""}
            />
        </div>
    )
}
