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
            <div className="flex gap-2.5 items-center justify-center overflow-visible py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isActuallyActive = star <= value;
                    const isHovered = !readOnly && star <= hover;
                    const isActive = isHovered || isActuallyActive;
                    
                    return (
                        <motion.button
                            key={star}
                            type="button"
                            // SNAPPY INTERACTION: Immediate response
                            whileTap={readOnly ? {} : { 
                                scale: 0.8,
                                transition: { type: "spring", stiffness: 500, damping: 20 }
                            }}
                            whileHover={readOnly ? {} : { scale: 1.1 }}
                            onClick={() => !readOnly && onChange(star)}
                            onMouseEnter={() => !readOnly && setHover(star)}
                            onMouseLeave={() => !readOnly && setHover(0)}
                            className="relative group focus:outline-none touch-none overflow-visible"
                            aria-label={`Calificar con ${star} estrellas`}
                        >
                            {/* Subtle Glow Layer - Reduced for clarity and performance */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ 
                                            opacity: 0.25, 
                                            scale: 1.25, 
                                            transition: { 
                                                duration: 0.2,
                                                ease: "easeOut"
                                            }
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-[-50%] bg-yellow-400/10 blur-xl rounded-full z-0 pointer-events-none"
                                        style={{ willChange: 'transform, opacity' }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Main Star Icon - Snappy and clean */}
                            <motion.div
                                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                                transition={{ duration: 0.15 }}
                                style={{ willChange: 'transform' }}
                            >
                                <Star
                                    size={40}
                                    strokeWidth={isActive ? 1.5 : 2}
                                    className={`relative z-10 transition-colors duration-200 ${
                                        isActive
                                            ? "fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                                            : "fill-transparent text-white/10"
                                    }`}
                                />
                            </motion.div>
                            
                            {/* Micro Shine Reflection - Sharper */}
                            {isActive && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-1.5 h-1.5 bg-white rounded-full blur-[1px] opacity-60 -translate-x-1.5 -translate-y-2" />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
