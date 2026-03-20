"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RiceParticles } from "./RiceParticles"
import Image from "next/image"
import { Trophy, ArrowRightLeft, X } from "lucide-react"

interface MoveVoteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    currentLocaleName: string
    newLocaleName: string
    newLocaleImage: string
}

export function MoveVoteModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    currentLocaleName, 
    newLocaleName,
    newLocaleImage 
}: MoveVoteModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg rounded-[3rem] p-8 pt-12 shadow-[0_25px_100px_rgba(0,0,0,1)] overflow-hidden border border-white/20"
                    >
                        {/* Glass Background */}
                        <div className="absolute inset-0 bg-black/90 z-0" />
                        <RiceParticles />

                        {/* Content Layer */}
                        <div className="relative z-10 text-center">
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute -top-4 -right-2 p-2 text-white/40 hover:text-white transition-colors"
                                title="Cerrar"
                                aria-label="Cerrar"
                            >
                                <X size={24} />
                            </button>

                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                                <Trophy className="text-yellow-500 w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-lilita text-white mb-4 leading-none uppercase tracking-tight">
                                ¿CAMBIAR TU VOTO?
                            </h2>
                            
                            <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 px-4">
                                Ya le diste tu corona a <span className="text-white font-black">{currentLocaleName}</span>. 
                                ¿Quieres transferir tu voto ganador a <span className="text-[#00B2FF] font-black">{newLocaleName}</span>?
                            </p>

                            {/* Comparison View */}
                            <div className="flex items-center justify-between gap-4 mb-10 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 relative">
                                <div className="flex-1 flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-red-500/10" />
                                        <Trophy className="text-white/20 w-8 h-8" />
                                    </div>
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center truncate w-full">
                                        {currentLocaleName}
                                    </span>
                                </div>

                                <div className="relative z-20">
                                    <div className="w-12 h-12 rounded-full bg-[#00B2FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,178,255,0.5)] border-4 border-black">
                                        <ArrowRightLeft className="text-white w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-[#00B2FF]/50 flex items-center justify-center relative overflow-hidden shadow-[0_0_25px_rgba(0,178,255,0.2)]">
                                        <Image 
                                            src={newLocaleImage} 
                                            alt={newLocaleName} 
                                            fill 
                                            className="object-cover p-2"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-[#00B2FF] uppercase tracking-widest text-center truncate w-full">
                                        {newLocaleName}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={onConfirm}
                                    className="h-16 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] text-white font-lilita text-xl uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                >
                                    SÍ, CAMBIAR MI VOTO 🍣
                                </Button>
                                <button
                                    onClick={onClose}
                                    className="h-12 w-full text-white/40 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                                >
                                    NO, MANTENER MI VOTO ACTUAL
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
