"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { RiceParticles } from "./RiceParticles"

interface VoteSuccessModalProps {
    isOpen: boolean
    onClose: () => void
    localeName: string
    localeImage: string
    type?: 'rating' | 'vote'
}

export function VoteSuccessModal({ isOpen, onClose, localeName, localeImage, type = 'vote' }: VoteSuccessModalProps) {
    if (!isOpen) return null

    const isVote = type === 'vote'

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                {/* Backdrop Catch */}
                <div 
                    onClick={onClose}
                    className="absolute inset-0 z-0 cursor-pointer pointer-events-auto"
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                    <RiceParticles />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 400 }}
                    className="relative w-full max-w-md rounded-[3rem] p-8 pt-12 shadow-[0_25px_100px_rgba(0,0,0,1)] overflow-hidden pointer-events-auto text-center border border-white/20"
                >
                    {/* Background Glass Layer */}
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0 shadow-2xl bg-black/95">
                        <motion.div 
                            animate={{ x: ['-200%', '300%'] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg]"
                        />
                    </div>
                    
                    {/* Confetti Effect (Internal Rice Rain) - Only for Votes */}
                    {isVote && (
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                            <RiceParticles />
                        </div>
                    )}

                    {/* Success Icon */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className={`w-20 h-20 ${isVote ? 'bg-[#00B2FF]' : 'bg-white/10'} rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,178,255,0.4)] relative z-10`}
                    >
                        <CheckCircle2 className={`w-10 h-10 ${isVote ? 'text-white' : 'text-[#00B2FF]'} stroke-[3] relative z-20`} />
                    </motion.div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-lilita text-white mb-2 leading-none uppercase tracking-tight">
                            {isVote ? '¡VOTO EXITOSO!' : '¡CALIFICADO!'}
                        </h2>
                        <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-8">
                            {isVote ? 'Has elegido a tu gladiador' : 'Tu opinión ha seguido al reino'}
                        </p>
                    </div>

                    {/* Targeted Locale Card (Mini) */}
                    <div className="bg-white/5 rounded-[2rem] p-4 border border-white/10 mb-8 flex flex-col items-center relative z-10">
                        <div className={`relative w-28 h-28 mb-4 rounded-2xl overflow-hidden border-2 ${isVote ? 'border-[#00B2FF]' : 'border-white/10'} shadow-[0_0_20px_rgba(0,178,255,0.2)] transition-all duration-700`}>
                            <Image
                                src={localeImage || "/logo.png"}
                                alt={localeName}
                                fill
                                className="object-cover p-2"
                            />
                        </div>
                        <h3 className="text-xl font-lilita text-white uppercase tracking-wide leading-none">{localeName}</h3>
                        <p className={`text-[9px] ${isVote ? 'text-[#00B2FF]' : 'text-white/40'} font-black uppercase mt-1 tracking-widest`}>
                            {isVote ? 'Candidato al trono 👑' : 'Feedback Enviado ✨'}
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="space-y-4 relative z-10">
                        <button
                            onClick={() => window.location.href = isVote ? `/ranking?votedName=${encodeURIComponent(localeName)}` : '/ranking'}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00B2FF] text-white font-lilita text-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,102,255,0.3)]"
                        >
                            {isVote ? 'VER EL RANKING 🏆' : 'VER TENDENCIAS 📊'}
                        </button>
                        
                        <button
                            onClick={onClose}
                            className="w-full h-12 text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-[0.2em]"
                        >
                            VOLVER A LA ARENA
                        </button>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    )
}
