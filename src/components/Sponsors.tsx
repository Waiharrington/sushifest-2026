"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
    { name: "Sponsor 1", logo: "/sponsors/logo1.png" },
    { name: "Sponsor 2", logo: "/sponsors/logo2.png" },
    { name: "Sponsor 3", logo: "/sponsors/logo3.png" },
    { name: "Sponsor 4", logo: "/sponsors/logo4.png" },
    { name: "Sponsor 5", logo: "/sponsors/logo5.png" },
    { name: "Sponsor 6", logo: "/sponsors/logo6.png" },
]

export function Sponsors() {
    // Doubling for seamless loop
    const doubledSponsors = [...sponsors, ...sponsors]

    return (
        <footer className="w-full py-8 md:py-16 px-4 mt-auto relative overflow-hidden bg-black/40 backdrop-blur-2xl border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6 md:mb-10">
                    <h3 className="text-white/30 text-[9px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">
                        Nuestros Aliados Oficiales
                    </h3>
                </div>

                <div className="relative flex overflow-hidden mask-fade-edges">
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 25, // Slightly faster for mobile feel
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="flex items-center gap-12 md:gap-32 whitespace-nowrap min-w-full"
                    >
                        {doubledSponsors.map((sponsor, i) => (
                            <div
                                key={`${sponsor.name}-${i}`}
                                className="relative w-28 h-10 md:w-48 md:h-16 shrink-0 flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default group"
                            >
                                {/* Placeholder Glass Card */}
                                <div className="absolute inset-0 border border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/[0.01] group-hover:bg-white/[0.03] group-hover:border-white/10 transition-all shadow-lg">
                                    <span className="text-[9px] md:text-xs text-white/10 font-bold uppercase tracking-widest group-hover:text-white/30 transition-colors">{sponsor.name}</span>
                                </div>
                                
                                {/* Image (Hidden by default until real paths are used, but ready) */}
                                <div className="relative w-full h-full p-2 translate-z-0">
                                    <Image 
                                        src={sponsor.logo} 
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain p-2 opacity-0 pointer-events-none transition-opacity duration-700"
                                        onError={(e) => {
                                            // Ensure we don't show broken image icons
                                            (e.target as any).style.display = 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            
            {/* Ambient Glow - Adjusted for mobile */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-primary/5 md:bg-primary/10 blur-[80px] md:blur-[120px] pointer-events-none" />

            <style jsx>{`
                .mask-fade-edges {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
            `}</style>
        </footer>
    )
}
