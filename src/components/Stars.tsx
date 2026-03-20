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
            <div className="flex gap-2.5 items-center justify-center">
                {[1, 2, 3, 4, 5].map((star, index) => {
                    const isActuallyActive = star <= value;
                    const isHovered = !readOnly && star <= hover;
                    const isActive = isHovered || isActuallyActive;
                    
                    return (
                        <motion.button
                            key={star}
                            type="button"
                            // MOBILE-FIRST INTERACTION: Stronger spring on tap
                            whileTap={readOnly ? {} : { 
                                scale: 0.7,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            // DESKTOP HOVER: Kept but secondary
                            whileHover={readOnly ? {} : { scale: 1.15 }}
                            onClick={() => !readOnly && onChange(star)}
                            onMouseEnter={() => !readOnly && setHover(star)}
                            onMouseLeave={() => !readOnly && setHover(0)}
                            className="relative group focus:outline-none touch-none"
                            aria-label={`Calificar con ${star} estrellas`}
                        >
                            {/* Staggered Glow Layer */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                        animate={{ 
                                            opacity: 0.5, 
                                            scale: 1.6, 
                                            rotate: 0,
                                            transition: { 
                                                delay: isHovered ? 0 : index * 0.04,
                                                type: "spring",
                                                stiffness: 200
                                            }
                                        }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full z-0"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Main Star Icon with Animation */}
                            <motion.div
                                animate={isActive ? { 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, 0]
                                } : { scale: 1, rotate: 0 }}
                                transition={{ 
                                    delay: isHovered ? 0 : index * 0.04,
                                    duration: 0.3 
                                }}
                            >
                                <Star
                                    size={42}
                                    strokeWidth={isActive ? 1.5 : 2}
                                    className={`relative z-10 transition-colors duration-200 ${
                                        isActive
                                            ? "fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                                            : "fill-transparent text-white/10"
                                    }`}
                                />
                            </motion.div>
                            
                            {/* Premium Shine Reflection */}
                            {isActive && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: -6 }}
                                    transition={{ delay: (index * 0.04) + 0.1 }}
                                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-2 h-2 bg-white rounded-full blur-[2px] opacity-70 -translate-y-2" />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
