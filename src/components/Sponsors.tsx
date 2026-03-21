"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
    { name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { name: "Uber Eats", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2018_logo.svg" },
    { name: "Epic Games", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "PedidosYa", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_de_PedidosYa.svg" },
    { name: "Copa Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Copa_Airlines_logo.svg" },
]

export function Sponsors() {
    // Doubling for seamless loop IF we keep marquee, but let's make it more of a subtle bar
    const doubledSponsors = [...sponsors, ...sponsors]
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

    return (
        <footer className="fixed bottom-0 left-0 right-0 py-6 z-[100] pointer-events-none">
            <div className="max-w-md mx-auto flex items-center justify-center">
                <div className="relative flex overflow-hidden mask-fade-edges-subtle pointer-events-auto">
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 50, // Ultra-slow and premium
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
                    >
                        {doubledSponsors.map((sponsor, i) => {
                            const key = `${sponsor.name}-${i}`;
                            const hasError = imageErrors[key];
                            
                            return (
                                <div
                                    key={key}
                                    className="relative w-20 h-8 md:w-24 md:h-10 shrink-0 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default group"
                                >
                                    {/* Minimalist Placeholder (Hidden if logo works) */}
                                    {!hasError && (
                                        <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[8px] text-white/5 font-black uppercase tracking-[0.3em] group-hover:text-white/20 transition-colors pointer-events-none">
                                            {sponsor.name}
                                        </span>
                                    )}
                                    
                                    {/* Image (High Fidelity Brand Demo) */}
                                    <div className={`relative w-full h-full p-1 transition-all duration-700 blur-[0.5px] group-hover:blur-0 scale-90 group-hover:scale-100 ${hasError ? 'hidden' : ''}`}>
                                        <Image 
                                            src={sponsor.logo} 
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter grayscale brightness-200 contrast-125 transition-all duration-700"
                                            onError={() => {
                                                setImageErrors((prev: Record<string, boolean>) => ({ ...prev, [key]: true }))
                                            }}
                                        />
                                    </div>

                                    {/* Fallback if all fails */}
                                    {hasError && (
                                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{sponsor.name}</span>
                                    )}
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
