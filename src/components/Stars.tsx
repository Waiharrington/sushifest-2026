"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface StarsProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    readOnly?: boolean;
}

export function Stars({ value, onChange, label, readOnly }: StarsProps) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] leading-none mb-1">
                {label} {readOnly && <span className="text-[#00B2FF]/60 ml-2">(YA CALIFICADO)</span>}
            </span>
            <div className="flex gap-2.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= (hover || value);
                    return (
                        <motion.button
                            key={star}
                            type="button"
                            whileHover={readOnly ? {} : { scale: 1.25, rotate: 12 }}
                            whileTap={readOnly ? {} : { scale: 0.85 }}
                            onClick={() => !readOnly && onChange(star)}
                            onMouseEnter={() => !readOnly && setHover(star)}
                            onMouseLeave={() => !readOnly && setHover(0)}
                            style={{ cursor: readOnly ? "default" : "pointer" }}
                            className="relative group focus:outline-none"
                            aria-label={`Calificar con ${star} estrellas`}
                        >
                            {/* Glow Effect Layer */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 0.4, scale: 1.5 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="absolute inset-0 bg-yellow-400/40 blur-xl rounded-full z-0"
                                    />
                                )}
                            </AnimatePresence>

                            <Star
                                size={40}
                                strokeWidth={isActive ? 1.5 : 2}
                                className={`relative z-10 transition-all duration-300 ${
                                    isActive
                                        ? "fill-current text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                                        : "fill-transparent text-white/20"
                                }`}
                            />
                            
                            {/* Inner Shine Detail */}
                            {isActive && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-1.5 h-1.5 bg-white rounded-full blur-[2px] opacity-60 translate-x-[-6px] translate-y-[-6px]" />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
