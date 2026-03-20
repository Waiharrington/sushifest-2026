import { motion } from "framer-motion"
import Image from "next/image"

interface Locale {
    id: string
    name: string
    image_url: string
    description?: string
}

interface LocaleCardProps {
    locale: Locale
    onVoteClick: (locale: Locale) => void
    rank: number
}

export function LocaleCard({ locale, onVoteClick, rank }: LocaleCardProps) {
    // Determine feature image (using generated ones as placeholders for demo)
    const displayImage = locale.image_url || (rank === 1 ? "/sushi-roll-1.png" : "/sushi-roll-2.png");

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98, borderColor: "#00B2FF", shadow: "0 0 30px rgba(0, 178, 255, 0.4)" }}
            className="group relative bg-black border border-white/20 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all hover:border-[#00B2FF]/60 hover:shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col h-full active:border-[#00B2FF]"
        >
            {/* Rank Badge (Neon Style) */}
            <div className="absolute top-3 left-3 z-10">
                <div className="bg-black/80 backdrop-blur-md border border-[#00B2FF]/40 px-2 py-0.5 rounded-full shadow-[0_0_15px_rgba(0,178,255,0.3)]">
                    <span className="text-[9px] font-black text-[#00B2FF] italic tracking-tighter">#{rank}</span>
                </div>
            </div>

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
            <div className="p-3 md:p-5 flex flex-col flex-grow space-y-2 md:space-y-4">
                <div className="flex-grow">
                    <h3 className="text-sm md:text-lg font-lilita text-white leading-tight uppercase tracking-wide group-hover:text-[#00B2FF] transition-colors line-clamp-1">
                        {locale.name}
                    </h3>
                </div>

                {/* Glass Button (God Tier) */}
                <button
                    onClick={() => onVoteClick(locale)}
                    className="relative w-full h-10 md:h-12 overflow-hidden rounded-xl md:rounded-2xl group/btn transition-all active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00B2FF] transition-all group-hover/btn:brightness-110" />
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
                    <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-white uppercase tracking-wider">
                        CALIFICAR <span className="hidden md:inline">Y VOTAR</span>
                        <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </span>
                </button>
            </div>
        </motion.div>
    )
}
