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
        <footer className="w-full py-16 px-4 mt-auto relative overflow-hidden bg-black/40 backdrop-blur-xl border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h3 className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                        Nuestros Aliados Oficiales
                    </h3>
                </div>

                <div className="relative flex overflow-hidden">
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 30, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="flex items-center gap-16 md:gap-32 whitespace-nowrap min-w-full"
                    >
                        {doubledSponsors.map((sponsor, i) => (
                            <div
                                key={`${sponsor.name}-${i}`}
                                className="relative w-32 h-12 md:w-48 md:h-16 shrink-0 flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default group"
                            >
                                {/* We keep placeholders until user provides real SVG/PNGs */}
                                <div className="absolute inset-0 border border-white/10 rounded-2xl flex items-center justify-center bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors">
                                    <span className="text-[10px] md:text-xs text-white/20 font-bold uppercase tracking-widest">{sponsor.name}</span>
                                </div>
                                <Image 
                                    src={sponsor.logo} 
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain p-2 opacity-0" // Hidden until real logos are provided
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none" />
        </footer>
    )
}
