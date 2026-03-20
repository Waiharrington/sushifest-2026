"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RiceParticles } from "./RiceParticles"
import Image from "next/image"
import * as React from "react"

interface VoteModalProps {
    isOpen: boolean
    onClose: () => void
    onVote: (name: string, contact: string) => void
    localeName: string
    isSubmitting: boolean
}

export function VoteModal({ isOpen, onClose, onVote, localeName, isSubmitting }: VoteModalProps) {
    const [name, setName] = React.useState("")
    const [contact, setContact] = React.useState("")

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && contact) {
            onVote(name, contact)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
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

            <div className="relative w-full max-w-md rounded-[3rem] shadow-[0_25px_100px_rgba(0,0,0,1)] p-8 overflow-hidden zoom-in-95 duration-300 pointer-events-auto">
                {/* Background Glass Layer (REDUCED BLUR FOR PERFORMANCE) */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0 border border-white/20 shadow-2xl bg-black/90 backdrop-blur-xl">
                    <div className="absolute inset-0 scale-110 blur-lg opacity-40">
                        <Image src="/modal-bg.png" alt="F" fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/20" /> {/* DARK OVERLAY */}
                </div>

                {/* Floating Crown (Optimized) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 w-32 md:w-36 shadow-2xl">
                    <Image
                        src="/crown-header.png"
                        alt="Crown"
                        width={150}
                        height={100}
                        className="w-full h-auto animate-float"
                    />
                </div>

                <button
                    onClick={onClose}
                    aria-label="Cerrar modal"
                    className="absolute right-8 top-6 text-white/30 hover:text-white transition-colors z-[60] p-2"
                >
                    ✕
                </button>

                <div className="relative z-10 text-center mt-8 mb-8">
                    <h2 className="text-3xl font-lilita text-white mb-2 leading-none uppercase tracking-tight">CONFIRMAR VOTO</h2>
                    <p className="text-[#00B2FF] font-black text-[11px] uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(0,178,255,0.4)]">
                        {localeName}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-[#00B2FF] uppercase tracking-widest ml-1">Nombre Completo</label>
                        <Input
                            placeholder="Ej: Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-black/40 border-white/10 text-white placeholder:text-white/20 focus:border-[#00B2FF]/50 focus:ring-1 focus:ring-[#00B2FF]/20 rounded-2xl h-14 px-5"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-[#00B2FF] uppercase tracking-widest ml-1">Teléfono o Email</label>
                        <Input
                            placeholder="Ej: 3001234567"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            className="bg-black/40 border-white/10 text-white placeholder:text-white/20 focus:border-[#00B2FF]/50 focus:ring-1 focus:ring-[#00B2FF]/20 rounded-2xl h-14 px-5"
                        />
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !name || !contact}
                            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] text-white font-lilita text-2xl uppercase tracking-wider shadow-lg shadow-[#00B2FF]/20 hover:scale-[1.02] active:scale-95 transition-all border border-white/10"
                        >
                            {isSubmitting ? "ENVIANDO..." : "CONFIRMAR VOTO 🍣"}
                        </Button>
                        
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white/30 hover:text-white transition-colors font-black text-[10px] uppercase tracking-[0.25em]"
                        >
                            CANCELAR
                        </button>
                    </div>

                    <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-[0.2em]">
                        🔒 Tus datos están protegidos por el festival
                    </p>
                </form>
            </div>
        </div>
    )
}
