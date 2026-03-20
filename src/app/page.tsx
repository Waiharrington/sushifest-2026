"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { RiceParticles } from "@/components/RiceParticles";
import { UserProfile } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleStartVoting = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      router.push("/votar");
    }
  };

  if (!isMounted) return <main className="min-h-screen bg-[#0A021A]" />;

  return (
    <>
      <MobileHome 
        handleStartVoting={handleStartVoting} 
        user={user} 
        logout={logout}
      />
      <DesktopHome 
        handleStartVoting={handleStartVoting} 
        user={user} 
        router={router} 
        logout={logout}
      />
      {isAuthModalOpen && (
        <AuthModal 
          key="global-auth-modal"
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={() => router.push("/votar")}
        />
      )}
    </>
  );
}

interface HomeProps {
  handleStartVoting: () => void;
  user: UserProfile | null;
  router: AppRouterInstance;
}


function MobileHome({ handleStartVoting, user, logout }: Omit<HomeProps, "router"> & { logout: () => void }) {
  return (
    <div className="block md:hidden h-[100svh] relative overflow-hidden bg-[#0A021A]">
      {/* Log Out Button (Mobile - Top) */}
      {user && (
        <motion.button
          onClick={logout}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] uppercase font-bold tracking-widest backdrop-blur-md active:scale-95 transition-all"
        >
          Cerrar Sesión
        </motion.button>
      )}

      {/* Cinematic Vignette Overlay (Sponsor Level Focus) */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_100%)]" />

      {/* Background Layer with subtle movement */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/bg-welcome-premium.png"
            alt="Fondo de Festival"
            fill
            className="object-cover opacity-80"
            priority
            quality={100}
          />
        </motion.div>
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      <RiceParticles />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center h-full px-6 pt-16 pb-12 text-center">
        
        {/* Main Header (Recreated from inspiration) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, type: "spring" }}
           className="relative w-full max-w-[160px] aspect-[4/3] mb-4 flex items-center justify-center"
        >
          {/* Pulsing blue glow behind logo (Intensified Electric Blue) */}
          <motion.div 
            animate={{ opacity: [0.1, 0.25, 0.1], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-[-20%] inset-y-[-20%] bg-[#0066FF]/40 blur-[85px] rounded-full" 
          />
          
          <Image
            src="/logo-fest.png"
            alt="SushiFest 2026 Logo"
            width={200}
            height={150}
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(0,178,255,0.6)] brightness-110 relative z-10"
            priority
          />

          {/* Golden crown below logo (from inspiration) - Independent Parallax */}
          <motion.div
             animate={{ y: [0, -6, 0], x: [0, 2, 0], scale: [1, 1.1, 1], rotate: [0, 2, 0] }}
             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 z-20 w-44 h-auto"
          >
             <Image 
               src="/crown.png" 
               alt="Corona" 
               width={160} 
               height={130} 
               className="w-full drop-shadow-[0_8px_25px_rgba(255,183,0,0.6)]"
             />
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: [0, -3, 0] }}
           transition={{ 
             opacity: { delay: 0.4, duration: 1 },
             y: { delay: 1.4, duration: 3, repeat: Infinity, ease: "easeInOut" }
           }}
           className="mb-auto mt-14 px-4"
        >
          <h1 
            className="text-4xl font-lilita text-white leading-[1.0] mb-6 tracking-tight uppercase"
            style={{ textShadow: '0 8px 16px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,1), 0 0 100px rgba(0,0,0,0.5)' }}
          >
            ¡Vota por el mejor<br />sushi de Panamá!
          </h1>
          <p className="text-[0.95rem] text-white/90 font-medium leading-normal drop-shadow-lg px-2">
            Califica sabor, servicio y presentación. 
            Solo uno será coronado en el <span className="text-[#00B2FF] font-black whitespace-nowrap">Sushifest 🏆</span>
          </p>
        </motion.div>

        {/* Buttons Container */}
        <div className="w-full flex flex-col gap-4 mt-auto max-w-xs relative z-50">
          
          {/* Main Action Button (Inspiration style) */}
          <motion.button
            onClick={handleStartVoting}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative h-16 w-full rounded-full overflow-hidden flex items-center justify-center"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] bg-[length:200%_auto] animate-gradient-x" />
            {/* Glow / Border Effect */}
            <div className="absolute inset-[1px] rounded-full border border-white/30" />
            <div className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(0,178,255,0.5)]" />
            
            <span className="relative z-10 text-white font-black text-xl drop-shadow-md uppercase tracking-tight">
              {user ? "CONTINUAR VOTANDO 🍣" : "EMPIEZA A VOTAR 🔥"}
            </span>
            
            {/* Shimmer Effect (Triple Pass Luxury) */}
            <motion.div 
               animate={{ x: ['150%', '-150%'] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] z-20" 
            />
          </motion.button>

          {/* Secondary Button (Inspiration style) */}
          <motion.button
            onClick={() => window.location.href = '/ranking'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative h-14 w-full rounded-full border border-white/20 bg-[#FF4D00]/10 backdrop-blur-md text-white font-bold text-lg uppercase tracking-wider shadow-[0_4px_15px_rgba(255,77,0,0.15)] overflow-hidden"
          >
            {/* Subtle inner glow for glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <span className="relative z-10 drop-shadow-sm">Ver el ranking</span>
          </motion.button>
        </div>

        {/* Footer (Refined Tracking) */}
        <footer className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium opacity-80">
           © 2026 SUSHIFEST • PANAMÁ
        </footer>
      </div>
    </div>
  );
}

function DesktopHome({ handleStartVoting, user, router, logout }: HomeProps & { logout: () => void }) {
  return (
    <div className="hidden md:block h-screen bg-[#0A021A] text-white relative overflow-hidden selection:bg-[#00B2FF]/30">
      {/* Log Out Button (Desktop - Top) */}
      {user && (
        <motion.button
          onClick={logout}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.1)" }}
          className="absolute top-10 right-10 z-50 px-6 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 text-xs uppercase font-bold tracking-[0.2em] backdrop-blur-md transition-all flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          Cerrar Sesión
        </motion.button>
      )}

      {/* Cinematic Vignette Overlay (Sponsor Level Focus) */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Background Layer with subtle movement */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/bg-welcome-premium.png"
            alt="Fondo de Festival"
            fill
            className="object-cover opacity-80"
            priority
            quality={100}
          />
        </motion.div>
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      <RiceParticles />

      <div className="relative z-10 flex flex-col h-full items-center justify-center text-center max-w-5xl mx-auto w-full">
          
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, type: "spring" }}
             className="relative w-full max-w-[240px] aspect-[4/3] mb-12 flex items-center justify-center"
          >
            {/* Pulsing blue glow (Desktop Version - Wider) */}
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-[-40%] inset-y-[-40%] bg-[#0066FF]/40 blur-[120px] rounded-full" 
            />
            
            <Image
              src="/logo-fest.png"
              alt="SushiFest 2026 Logo"
              width={300}
              height={225}
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(0,178,255,0.7)] brightness-110 relative z-10"
              priority
            />

            {/* Golden crown (Desktop Version - Independent Parallax) */}
            <motion.div
               animate={{ y: [0, -8, 0], x: [0, 3, 0], scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-4 translate-y-full left-1/2 -translate-x-1/2 z-20 w-64 h-auto"
            >
               <Image 
                 src="/crown.png" 
                 alt="Corona" 
                 width={240} 
                 height={180} 
                 className="w-full drop-shadow-[0_12px_35px_rgba(255,183,0,0.6)]"
               />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16"
          >
            <h1
              className="text-7xl text-white uppercase leading-[1.0] mb-8 font-lilita tracking-tight"
              style={{ textShadow: '0 12px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,1)' }}
            >
              ¡Vota por el mejor<br />sushi de Panamá!
            </h1>

            <p className="text-xl text-white/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
              Califica sabor, servicio y presentación. <br /> Solo uno será coronado en el <span className="text-[#00B2FF] font-black">Sushifest 🏆</span>
            </p>
          </motion.div>

          {/* Buttons Container Desktop */}
          <div className="w-full flex flex-col items-center gap-6 max-w-sm">
            <motion.button
              onClick={handleStartVoting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-20 w-full rounded-full overflow-hidden flex items-center justify-center shadow-[0_15px_45px_rgba(0,102,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#00B2FF] to-[#0066FF] bg-[length:200%_auto] animate-gradient-x" />
              <div className="absolute inset-[1px] rounded-full border border-white/30" />
              <span className="relative z-10 text-white font-black text-2xl drop-shadow-md uppercase tracking-tight">
                {user ? "CONTINUAR VOTANDO 🍣" : "EMPIEZA A VOTAR 🔥"}
              </span>
              <motion.div 
                 animate={{ x: ['150%', '-150%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] z-20" 
              />
            </motion.button>

            <motion.button
              onClick={() => router.push("/ranking")}
              whileHover={{ color: "#ffffff", scale: 1.05 }}
              className="text-white/60 font-black tracking-[0.2em] text-sm uppercase transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] shadow-[0_0_8px_#FF4D00]" />
              Ver el ranking de estrellas
            </motion.button>
          </div>

          <footer className="mt-20 text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2026 SUSHIFEST • PANAMÁ
          </footer>
      </div>
    </div>
  );
}
