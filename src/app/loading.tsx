"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RiceParticles } from "@/components/RiceParticles"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/modal-bg.png" 
                    alt="Background" 
                    fill 
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                <RiceParticles />
            </div>

            {/* Top Progress Bar Component (Subtle) */}
            <motion.div 
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] shadow-[0_0_15px_rgba(0,178,255,0.8)] z-50"
            />

            {/* Central Branded Loading View */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Pulsating Logo Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        ease: "easeOut",
                        scale: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.5,
                            ease: "easeInOut"
                        }
                    }}
                    className="relative w-32 h-32 md:w-48 md:h-48 mb-8"
                >
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-[-10%] rounded-full bg-[#00B2FF]/20 blur-2xl animate-pulse" />
                    
                    <Image 
                        src="/logo.png" 
                        alt="Sushi Fest Logo" 
                        fill 
                        className="object-contain drop-shadow-[0_0_20px_rgba(0,178,255,0.4)]"
                        priority 
                    />
                </motion.div>

                {/* Animated Text */}
                <div className="flex flex-col items-center gap-2">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white font-lilita text-2xl md:text-3xl uppercase tracking-widest"
                    >
                        Cargando la Arena...
                    </motion.h2>
                    <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.2
                                }}
                                className="w-2 h-2 rounded-full bg-[#00B2FF] shadow-[0_0_10px_rgba(0,178,255,0.8)]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
