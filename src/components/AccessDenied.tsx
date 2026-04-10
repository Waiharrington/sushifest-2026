"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Info } from "lucide-react";
import Image from "next/image";

export function AccessDenied() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/95 selection:bg-red-500/30">
      {/* Background with Blur and Texture */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/modal-bg.png" 
          alt="Pattern Background" 
          fill 
          className="object-cover opacity-20 grayscale"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 backdrop-blur-[20px]" />
      </div>

      {/* Animated Red Pulse Aura */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Main Content Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-md p-8 text-center"
      >
        {/* Shield Icon with Animation */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-40 animate-pulse" />
            <ShieldAlert size={80} className="text-red-500 relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="font-lilita text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none italic drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            SERVICIO <br />
            <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">SUSPENDIDO</span>
          </h1>

          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-red-500/50 to-transparent mx-auto" />

          <p className="text-white/60 text-sm md:text-base font-black uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
            Contactar con el desarrollador para restaurar el acceso al sistema.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-10 flex items-center justify-center gap-3 text-red-500/40 text-[10px] uppercase font-black tracking-[0.4em]"
          >
            <Info size={12} />
            <span>ID de Sesión: RESTRICTED-403</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Branding (Subtle) */}
      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-white/10 text-[8px] font-black uppercase tracking-[0.5em] select-none">
          SYSTEM ERROR • SECURE PROTOCOL v2.0
        </p>
      </div>
    </div>
  );
}
