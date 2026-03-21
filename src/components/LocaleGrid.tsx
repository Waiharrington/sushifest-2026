import { useState, useEffect, useMemo } from "react"
import { motion, Variants } from "framer-motion"
import { LocaleCard } from "./LocaleCard"
import { RatingModal } from "./RatingModal"
import { VoteSuccessModal } from "./VoteSuccessModal"
import { MoveVoteModal } from "./MoveVoteModal"
import { submitRatingAndVote, getUserInteractions } from "@/actions/rating"
import { useAuth } from "@/context/AuthContext"
import { getUserProgress } from "@/actions/user_progress"
import { Search, RotateCcw } from "lucide-react"
import { resetUserVotes } from "@/actions/reset_votes"

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
    
    // Success States
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successType, setSuccessType] = useState<'rating' | 'vote'>('vote')
    const [votedLocalInfo, setVotedLocalInfo] = useState<{ name: string, image: string } | null>(null)
    
    // Move Vote States
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false)
    const [pendingRatings, setPendingRatings] = useState<{ flavor: number, service: number, presentation: number } | null>(null)
    const [currentFavoriteName, setCurrentFavoriteName] = useState("")
    const [currentFavoriteImage, setCurrentFavoriteImage] = useState("")

    const [searchTerm, setSearchTerm] = useState("")
    const [progress, setProgress] = useState({ ratedCount: 0, totalCount: 0 })
    const [interactions, setInteractions] = useState<Record<string, { isRated: boolean, isVoted: boolean }>>({})

    const filteredLocales = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return locales
        return locales.filter(locale => 
            locale.name.toLowerCase().includes(term)
        )
    }, [locales, searchTerm])

    // Notify parent about modal state
    useEffect(() => {
        onModalStateChange?.(isRatingModalOpen || showSuccessModal || isMoveModalOpen)
    }, [isRatingModalOpen, showSuccessModal, isMoveModalOpen, onModalStateChange])

    // Load user progress and interactions
    useEffect(() => {
        if (user) {
            getUserProgress(user.id).then(setProgress)
            getUserInteractions(user.id).then(setInteractions)
        }
    }, [user, showSuccessModal])

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
                    // Open Move Vote Modal instead of window.confirm
                    setCurrentFavoriteName(result.currentLocaleName || "otro restaurante")
                    setCurrentFavoriteImage(result.currentLocaleImage || "")
                    setPendingRatings(ratings)
                    setIsRatingModalOpen(false)
                    setIsMoveModalOpen(true)
                } else {
                    alert(result.error)
                }
            } else {
                setVotedLocalInfo({
                    name: selectedLocale.name,
                    image: selectedLocale.image_url
                })
                setSuccessType(wantToVote ? 'vote' : 'rating')
                setIsRatingModalOpen(false)
                setIsMoveModalOpen(false)
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

    const handleConfirmMove = () => {
        if (pendingRatings) {
            handleRatingSubmit(pendingRatings, true, true)
        }
    }

    const handleReset = async () => {
        if (!user) return
        if (!window.confirm("¿ESTÁS SEGURO? Esto borrará todas tus calificaciones y tu voto para que puedas probar el flujo de nuevo.")) return
        
        setIsSubmitting(true)
        const result = await resetUserVotes(user.id)
        if (result.success) {
            const newProgress = await getUserProgress(user.id)
            setProgress(newProgress)
            window.location.reload()
        } else {
            alert("Error al resetear: " + result.error)
        }
        setIsSubmitting(false)
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
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-6">
                    <div className="relative group">
                        <div 
                            className="absolute inset-y-0 left-0 flex items-center justify-center" 
                            style={{ width: '4rem', zIndex: 50, pointerEvents: 'none' }}
                        >
                            <Search className="w-5 h-5 text-white opacity-100" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar restaurante..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '4rem', paddingRight: '4rem' }}
                            className="w-full bg-black/80 border border-white/20 rounded-full py-5 outline-none focus:border-[#00B2FF] text-white placeholder:text-white/20 transition-all backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
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
                    <p className="text-center font-black text-[9px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
                        <span className="text-[#00B2FF]">Puedes calificar todos,</span>{" "}
                        <span className="text-white text-opacity-80">pero votar solo por uno</span>
                    </p>
                </div>
                
                {/* Reset Button for Testing */}
                <div className="flex justify-center">
                    <button 
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-black text-red-500/60 uppercase tracking-widest hover:bg-red-500/20 hover:text-red-500 transition-all active:scale-95 disabled:opacity-30"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Reset Votos (Pruebas)
                    </button>
                </div>
            </div>

            {filteredLocales.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <p className="font-lilita text-2xl text-white/40 uppercase">No se encontró al gladiador 🍣</p>
                </div>
            ) : (
                <motion.div
                    key={searchTerm ? 'filtered' : 'all'}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-12"
                >
                    {filteredLocales.map((locale: Locale, index: number) => (
                        <motion.div key={locale.id} variants={item}>
                            <LocaleCard
                                locale={locale}
                                onVoteClick={handleRatingClick}
                                rank={filteredLocales.length === locales.length ? index + 1 : undefined}
                                isRated={interactions[locale.id]?.isRated || false}
                                isVoted={interactions[locale.id]?.isVoted || false}
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

            <MoveVoteModal
                isOpen={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                onConfirm={handleConfirmMove}
                currentLocaleName={currentFavoriteName}
                currentLocaleImage={currentFavoriteImage}
                newLocaleName={selectedLocale?.name || ""}
                newLocaleImage={selectedLocale?.image_url || ""}
            />

            <VoteSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                localeName={votedLocalInfo?.name || ""}
                localeImage={votedLocalInfo?.image || ""}
                type={successType}
            />
        </div>
    )
}
