"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
            <div className="flex gap-2.5">
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
                            className={`text-4xl transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.3)] ${
                                isActive ? "text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" : "text-white/5 opacity-50"
                            }`}
                        >
                            {isActive ? "★" : "☆"}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
