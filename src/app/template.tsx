"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
            className="w-full flex flex-col min-h-screen"
        >
            {/* Top Progress Bar (Simulated on mount) */}
            <motion.div 
                initial={{ width: "0%", opacity: 1 }}
                animate={{ width: "100%", opacity: 0 }}
                transition={{ 
                    width: { duration: 0.8, ease: "easeOut" },
                    opacity: { delay: 0.8, duration: 0.4 }
                }}
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] shadow-[0_0_10px_rgba(0,178,255,0.8)] z-[200]"
            />
            {children}
        </motion.div>
    )
}
