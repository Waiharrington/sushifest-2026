"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RiceParticles } from "@/components/RiceParticles";

export default function VotingPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [locales, setLocales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase.from('locales').select('*').order('name');
                if (error) throw error;
                setLocales(data || []);
            } catch (err: unknown) {
                console.error("Error fetching locales:", err);
                setError((err as Error).message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-primary/30">

            {/* Background Layer: Night Arena (Switching logic) */}
            <AnimatePresence mode="wait">
                {!isVoteModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-0 overflow-hidden"
                    >
                        {/* Night Festival Background */}
                        <Image
                            src="/bg-votar-2026.png"
                            alt="Night Arena Background"
                            fill
                            className="object-cover opacity-85" // PREMIUM OPACITY
                            priority
                            quality={100}
                        />

                        {/* Blue Vignette for Mood */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                        <div className="absolute inset-0 bg-[#0A021A]/40 mix-blend-multiply" />

                        {/* Rain Particles */}
                        <RiceParticles />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col min-h-screen pt-12 md:pt-16">

                {/* Header Section: The Crown Aura (Optimized Overflow) */}
                <div className="text-center px-4 mb-10 relative overflow-visible">
                    
                    {/* Crown Glow Aura - Adjusted for Mobile to prevent clipping */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] w-[250px] md:w-[600px] h-[250px] md:h-[400px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0" />

                    {/* Golden Crown */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, type: "spring" }}
                        className="relative z-20 -mb-12 md:-mb-24"
                    >
                        <Image src="/crown-header.png" alt="Crown" width={400} height={200} className="w-[180px] md:w-[320px] h-auto drop-shadow-[0_0_50px_rgba(255,215,0,0.3)] mx-auto animate-float" />
                    </motion.div>

                    {/* Title Style: God Tier */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-4xl md:text-6xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-6 font-lilita drop-shadow-[0_10px_35px_rgba(0,0,0,1)]"
                    >
                        ELIJE EL <br/>
                        <span className="text-[#00B2FF] drop-shadow-[0_0_15px_rgba(0,178,255,0.5)]">MEJOR SUSHI</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-white/60 text-xs md:text-lg max-w-xl mx-auto font-black uppercase tracking-[0.3em] px-4"
                    >
                        Sushi Fest 🏆 Panamá 2026
                    </motion.p>
                </div>

                {/* Voting Grid */}
                <div className="flex-grow px-4 pb-24 mt-4">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 text-white">
                                <motion.div 
                                    animate={{ rotate: 360 }} 
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="text-5xl mb-6"
                                >
                                    🍣
                                </motion.div>
                                <p className="font-lilita text-2xl tracking-widest animate-pulse">CARGANDO...</p>
                            </div>
                        ) : error ? (
                            <div className="p-8 bg-red-950/40 border border-red-500/30 rounded-[2rem] text-red-100 text-center max-w-md mx-auto backdrop-blur-xl">
                                <p className="font-bold text-xl mb-2">Error de conexión</p>
                                <p className="text-sm opacity-60">No pudimos conectar con los gladiadores del sushi.</p>
                            </div>
                        ) : (
                            <LocaleGrid 
                                locales={locales} 
                                onModalStateChange={setIsVoteModalOpen} 
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-12 text-center text-white/20 text-[10px] z-20 relative uppercase tracking-[0.4em] font-black">
                    <p>© 2026 SUSHI FEST • PANAMÁ</p>
                </footer>

            </div>
        </div>
    );
}
