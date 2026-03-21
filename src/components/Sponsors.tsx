"use client"

import { useState } from "react"
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
    // Doubling for seamless loop IF we keep marquee, but let's make it more of a subtle bar
    const doubledSponsors = [...sponsors, ...sponsors]
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

    return (
        <footer className="w-full py-4 mt-auto relative overflow-hidden pointer-events-none">
            <div className="max-w-xs mx-auto flex items-center justify-center">
                <div className="relative flex overflow-hidden mask-fade-edges-subtle pointer-events-auto">
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 40, // Much slower and calmer
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
                    >
                        {doubledSponsors.map((sponsor, i) => {
                            const key = `${sponsor.name}-${i}`;
                            const hasError = imageErrors[key];
                            
                            return (
                                <div
                                    key={key}
                                    className="relative w-16 h-6 md:w-20 md:h-8 shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default group"
                                >
                                    {/* Minimalist Placeholder (No boxes) */}
                                    <span className={`text-[8px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white transition-colors ${!hasError ? 'opacity-100' : 'opacity-100'}`}>
                                        {sponsor.name}
                                    </span>
                                    
                                    {/* Image (Ready for real logos) */}
                                    <div className={`absolute inset-0 p-1 ${hasError ? 'hidden' : ''}`}>
                                        <Image 
                                            src={sponsor.logo} 
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain opacity-0 pointer-events-none transition-opacity duration-700"
                                            onError={() => {
                                                setImageErrors((prev: Record<string, boolean>) => ({ ...prev, [key]: true }))
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .mask-fade-edges-subtle {
                    mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
                }
            `}</style>
        </footer>
    )
}
