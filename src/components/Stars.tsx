"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StarsProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
}

export function Stars({ value, onChange, label }: StarsProps) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-primary/70 uppercase tracking-widest">{label}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`text-3xl transition-colors ${
                            star <= (hover || value) ? "text-primary" : "text-white/10"
                        }`}
                    >
                        ★
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
