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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: rank * 0.1 }}
            className="group relative overflow-visible rounded-[2.5rem] p-4 md:p-6 transition-all duration-500 flex flex-col items-center bg-[#0A021A]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00B2FF]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(0,178,255,0.15)]"
        >
            {/* Glossy Overlay (Reflections) */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            
            {/* Rank Badge (Neon Circle) */}
            <div className="absolute -top-3 -left-3 z-30 w-12 h-12 rounded-full bg-black border-2 border-[#00B2FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,178,255,0.6)]">
                <span className="font-lilita text-xl text-white drop-shadow-[0_0_8px_rgba(0,178,255,0.8)]">{rank}</span>
            </div>

            {/* Image Container (Heroic) */}
            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-[1.8rem] z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                    src={displayImage}
                    alt={locale.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority
                />
                
                {/* Premium Shine Animation */}
                <motion.div 
                    animate={{ x: ['-200%', '300%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] z-10"
                />
            </div>

            {/* Content Section */}
            <div className="w-full text-center relative z-20">
                <h3 className="text-2xl md:text-3xl font-lilita text-white mb-2 uppercase tracking-wide leading-none">{locale.name}</h3>
                
                {locale.description && (
                    <p className="text-[#00B2FF]/60 text-[10px] md:text-xs mb-6 line-clamp-2 uppercase font-black tracking-[0.15em] hidden md:block italic">
                        {locale.description}
                    </p>
                )}

                {/* Vote Button (God Tier) */}
                <button
                    onClick={() => onVoteClick(locale)}
                    className="w-full group/btn relative overflow-hidden rounded-2xl h-14 bg-gradient-to-r from-[#0066FF] to-[#00B2FF] p-px transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover/btn:bg-transparent transition-colors" />
                    <div className="relative h-full w-full bg-transparent flex items-center justify-center gap-3">
                        <span className="text-white font-lilita text-xl tracking-wider uppercase drop-shadow-md">VOTAR AHORA</span>
                        <span className="text-2xl transform group-hover/btn:rotate-12 transition-transform">🍣</span>
                    </div>
                </button>

                {/* Secure Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-white/30 font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FF] animate-pulse" /> Voto validado
                </div>
            </div>

            {/* Hover Glow Background */}
            <div className="absolute inset-6 bg-[#00B2FF]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    )
}
