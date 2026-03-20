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
}

export function VoteSuccessModal({ isOpen, onClose, localeName, localeImage }: VoteSuccessModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                {/* Backdrop Catch */}
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
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 400 }}
                    className="relative w-full max-w-md rounded-[3rem] p-8 pt-12 shadow-[0_25px_100px_rgba(0,0,0,1)] overflow-hidden pointer-events-auto text-center"
                >
                    {/* Background Glass Layer (SOLIDIFIED FOR CONSISTENCY) */}
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0 border border-white/20 shadow-2xl bg-black/90 backdrop-blur-3xl">
                        <div className="absolute inset-0 scale-110 blur-xl opacity-60"> {/* BLURRED PATTERN INSIDE */}
                            <Image src="/modal-bg.png" alt="F" fill className="object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/20" /> {/* DARK OVERLAY */}
                        <motion.div 
                            animate={{ x: ['-200%', '300%'] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
                        />
                    </div>
                    {/* Confetti Effect (Internal Rice Rain) */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <RiceParticles />
                    </div>

                    {/* Checkmark Icon */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-20 h-20 bg-[#00B2FF] rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,178,255,0.6)]"
                    >
                        <CheckCircle2 className="w-10 h-10 text-white stroke-[3]" />
                    </motion.div>

                    <h2 className="text-4xl font-lilita text-white mb-2 leading-none uppercase tracking-tight">¡VOTO EXITOSO!</h2>
                    <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-8">Gracias por participar</p>

                    {/* Voted Locale Card (Mini) */}
                    <div className="bg-black/40 rounded-[2rem] p-4 border border-white/5 mb-8 flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4 rounded-2xl overflow-hidden border-2 border-[#00B2FF]/30 shadow-[0_0_20px_rgba(0,178,255,0.2)]">
                            <Image
                                src={localeImage || "/logo.png"}
                                alt={localeName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-lilita text-white uppercase tracking-wide leading-none">{localeName}</h3>
                        <p className="text-[10px] text-[#00B2FF] font-black uppercase mt-1">Candidato al trono 👑</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="space-y-4 relative z-10">
                        <button
                            onClick={() => window.location.href = `/ranking?votedName=${encodeURIComponent(localeName)}`}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00B2FF] text-white font-lilita text-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,102,255,0.3)]"
                        >
                            VER EL RANKING 🏆
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
