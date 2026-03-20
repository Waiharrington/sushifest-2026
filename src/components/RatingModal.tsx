import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Stars } from "./Stars"
import { RiceParticles } from "./RiceParticles"
import { getUserLocaleStatus } from "@/actions/user_status"
import { useAuth } from "@/context/AuthContext"

interface RatingModalProps {
    isOpen: boolean
    onClose: () => void
    onRating: (ratings: { flavor: number, service: number, presentation: number }, wantToVote: boolean, confirmMove?: boolean) => void
    localeId: string
    localeName: string
    isSubmitting: boolean
}

export function RatingModal({ isOpen, onClose, onRating, localeId, localeName, isSubmitting }: RatingModalProps) {
    const { user } = useAuth()
    const [flavor, setFlavor] = useState(0)
    const [service, setService] = useState(0)
    const [presentation, setPresentation] = useState(0)
    const [wantToVote, setWantToVote] = useState(false)
    const [hasRating, setHasRating] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)

    // Reset and Fetch Status when Modal opens
    useEffect(() => {
        let isMounted = true;
        
        async function fetchData() {
            if (!isOpen || !user || !localeId) return
            
            setIsLoadingData(true)
            try {
                const status = await getUserLocaleStatus(user.id, localeId)
                if (status && isMounted) {
                    if (status.rating) {
                        setFlavor(status.rating.flavor)
                        setService(status.rating.service)
                        setPresentation(status.rating.presentation)
                        setHasRating(true)
                    } else {
                        setFlavor(0)
                        setService(0)
                        setPresentation(0)
                        setHasRating(false)
                    }
                    setWantToVote(status.hasVoteHere)
                }
            } finally {
                if (isMounted) setIsLoadingData(false)
            }
        }

        fetchData()

        return () => { isMounted = false }
    }, [isOpen, user, localeId])

    if (!isOpen) return null

    const isFormValid = flavor > 0 && service > 0 && presentation > 0

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!isFormValid) {
            alert("Por favor califica las 3 categorías")
            return
        }

        onRating({ flavor, service, presentation }, wantToVote)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
                    <div 
                        onClick={onClose}
                        className="absolute inset-0 z-0 cursor-pointer pointer-events-auto"
                    >
                        <Image 
                            src="/modal-bg.png" 
                            alt="Fondo Estampado" 
                            fill 
                            className="object-cover opacity-100"
                            priority 
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <RiceParticles />
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="relative w-full max-w-md rounded-[3rem] p-8 pt-16 shadow-[0_25px_100px_rgba(0,0,0,1)] overflow-visible pointer-events-auto will-change-transform"
                        style={{ willChange: 'transform, opacity' } as React.CSSProperties}
                    >
                        {/* Background Glass Layer (REDUCED BLUR FOR PERFORMANCE) */}
                        <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0 border border-white/20 shadow-2xl bg-black/90 backdrop-blur-xl">
                            <div className="absolute inset-0 scale-110 blur-lg opacity-40"> {/* REDUCED BLUR PATTERN */}
                                <Image src="/modal-bg.png" alt="F" fill className="object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-black/20" /> {/* DARK OVERLAY */}
                            <motion.div 
                                animate={{ x: ['-200%', '300%'] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
                            />
                        </div>

                        {/* Floating Crown (Optimized) */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 w-32 md:w-36 shadow-2xl">
                            <Image
                                src="/crown-header.png"
                                alt="Crown"
                                width={150}
                                height={100}
                                className="w-full h-auto animate-float"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Cerrar modal"
                            className="absolute top-6 right-8 text-white/30 hover:text-white transition-colors p-2 z-[60]"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-4xl font-lilita text-white mb-2 leading-none uppercase tracking-tight">VOTACIÓN</h2>
                            <p className="text-[#00B2FF] font-black text-[11px] uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(0,178,255,0.4)]">
                                {localeName}
                            </p>
                        </div>

                        {isLoadingData ? (
                            <div className="flex flex-col items-center justify-center py-16 space-y-4 relative z-10">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="text-4xl relative z-[60]"
                                >
                                    🍣
                                </motion.div>
                                <p className="text-white/40 font-black text-[10px] uppercase tracking-widest animate-pulse">Consultando gladiador...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <Stars label="Sabor" value={flavor} onChange={setFlavor} readOnly={hasRating} />
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    <Stars label="Atención" value={service} onChange={setService} readOnly={hasRating} />
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    <Stars label="Presentación" value={presentation} onChange={setPresentation} readOnly={hasRating} />
                                </div>

                                <div className="bg-white/5 p-5 rounded-[1.8rem] border border-white/10 space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                id="can-vote"
                                                checked={wantToVote}
                                                onChange={(e) => setWantToVote(e.target.checked)}
                                                className="peer appearance-none w-6 h-6 rounded-lg border-2 border-white/20 bg-black/40 checked:bg-[#00B2FF] checked:border-[#00B2FF] transition-all cursor-pointer"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none text-white text-xs font-black">
                                                ✓
                                            </div>
                                        </div>
                                        <label htmlFor="can-vote" className="text-sm font-black text-white tracking-wide uppercase cursor-pointer">
                                            ¿ES TU FAVORITO? 🏆
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-white/30 leading-relaxed font-bold uppercase tracking-wider pl-10">
                                        {wantToVote 
                                            ? "¡Este restaurante es tu candidato al trono! 🍣👑" 
                                            : "Marca esta casilla si quieres darle tu voto ganador del festival."}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        animate={isFormValid && !isSubmitting ? { 
                                            boxShadow: [
                                                "0 0 20px rgba(0,102,255,0.2)",
                                                "0 0 40px rgba(0,178,255,0.4)",
                                                "0 0 20px rgba(0,102,255,0.2)"
                                            ]
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className={`w-full h-16 rounded-2xl bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-lilita text-2xl uppercase tracking-wider hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale shadow-lg`}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            {isSubmitting ? "GUARDANDO..." : (
                                                <>
                                                    <span>ENVIAR VOTO</span>
                                                    <span className="text-xl">🍣</span>
                                                </>
                                            )}
                                        </div>
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
