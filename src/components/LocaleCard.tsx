import { motion } from "framer-motion"
import Image from "next/image"
import { Check, Trophy } from "lucide-react"

interface Locale {
    id: string
    name: string
    image_url: string
    description?: string
}

interface LocaleCardProps {
    locale: Locale
    onVoteClick: (locale: Locale) => void
    rank?: number
    isRated?: boolean
    isVoted?: boolean
}

export function LocaleCard({ locale, onVoteClick, rank, isRated, isVoted }: LocaleCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98, borderColor: "#00B2FF", boxShadow: "0 0 30px rgba(0, 178, 255, 0.4)" }}
            className={`group relative bg-black border ${isVoted ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : 'border-white/20'} rounded-[2rem] overflow-hidden transition-all hover:border-[#00B2FF]/60 hover:shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col h-full active:border-[#00B2FF]`}
        >
            {/* Winner Aura (Only if Voted) */}
            {isVoted && (
                <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none z-0"
                />
            )}

            {/* Status Badges Layer */}
            <div className="absolute top-3 right-3 z-30 flex gap-2">
                {isVoted && (
                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 shadow-[0_0_25px_rgba(234,179,8,0.8)] border border-yellow-200/50"
                    >
                        <Trophy className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-lg" />
                    </motion.div>
                )}
                {isRated && !isVoted && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-[#00B2FF] rounded-full p-1.5 md:p-2 shadow-[0_0_15px_rgba(0,178,255,0.4)]"
                    >
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[4]" />
                    </motion.div>
                )}
            </div>

            {/* Rank Badge (Neon Style) - Only visible if rank exists */}
            {rank !== undefined && (
                <div className="absolute top-3 left-3 z-10">
                    <div className="bg-black/80 backdrop-blur-md border border-[#00B2FF]/40 px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(0,178,255,0.3)]">
                        <span className="text-[9px] font-black text-[#00B2FF] italic tracking-tighter">#{rank}</span>
                    </div>
                </div>
            )}

            {/* Image Container (Cinematic) */}
            <div className="relative h-28 md:h-36 w-full overflow-hidden">
                <Image
                    src={locale.image_url || "/logo.png"}
                    alt={locale.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A021A] via-transparent to-transparent opacity-80" />
                
                {/* Shine Animation Overlay */}
                <motion.div 
                    animate={{ x: ['-200%', '300%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
                />
            </div>

            {/* Content Section (Compact) */}
            <div className="p-3 md:p-5 flex flex-col flex-grow space-y-3 md:space-y-4 relative z-10">
                <div className="flex-grow min-h-[2.5rem] md:min-h-[3rem]">
                    <h3 className={`text-xs md:text-lg font-lilita leading-tight uppercase tracking-wide transition-colors line-clamp-2 ${isVoted ? 'text-yellow-500' : 'text-white'} group-hover:text-[#00B2FF]`}>
                        {locale.name}
                    </h3>
                </div>

                {/* Glass Button (God Tier) */}
                <button
                    onClick={() => onVoteClick(locale)}
                    className={`relative w-full h-11 md:h-12 overflow-hidden rounded-xl md:rounded-2xl group/btn transition-all active:scale-95 ${
                        isVoted 
                            ? 'shadow-[0_0_20px_rgba(234,179,8,0.4)] border border-yellow-500/50' 
                            : isRated 
                                ? 'bg-white/5 border border-white/20' 
                                : 'border-none'
                    }`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                        isVoted 
                            ? 'from-yellow-600 via-yellow-400 to-yellow-600' 
                            : isRated 
                                ? 'from-white/10 to-white/20' 
                                : 'from-[#0066FF] to-[#00B2FF]'
                    } bg-[length:200%_auto] ${isVoted ? 'animate-shimmer' : ''} transition-all group-hover/btn:brightness-110`} />
                    
                    <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-white uppercase tracking-wider px-1">
                        {isVoted ? (
                            <>VOTO FINAL 👑</>
                        ) : isRated ? (
                            <>MI OPINIÓN 🍣</>
                        ) : (
                            <>CALIFICAR 🍣</>
                        )}
                    </span>
                </button>
            </div>
        </motion.div>
    )
}
