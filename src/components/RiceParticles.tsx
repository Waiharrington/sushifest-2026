"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface RiceGrain {
  id: number;
  initialX: number;
  initialRotate: number;
  targetRotate: number;
  duration: number;
  delay: number;
  scale: number;
  blur: number;
  layer: 'foreground' | 'midground' | 'background';
  type: 'rice' | 'roll';
  swingRange: number; 
  spawnTop: string; 
  randomDelay: number; // ADDED
}

export function RiceParticles() {
  const [grains, setGrains] = useState<RiceGrain[]>([]);

  useEffect(() => {
    // Generate 20 particles (PERFECT BALANCE: More Rice, Rare Sushi)
    const newGrains = Array.from({ length: 20 }).map((_, i) => {
      const layerRand = Math.random();
      let layer: 'foreground' | 'midground' | 'background' = 'midground';
      let scale = 0.8;
      let blur = 0;
      let duration = 12;

      if (layerRand > 0.85) {
        layer = 'foreground';
        scale = 1.4 + Math.random() * 0.4;
        blur = 2.5;
        duration = 8 + Math.random() * 4;
      } else if (layerRand < 0.25) {
        layer = 'background';
        scale = 0.4 + Math.random() * 0.2;
        blur = 0;
        duration = 16 + Math.random() * 6;
      } else {
        layer = 'midground';
        scale = 0.8 + Math.random() * 0.4;
        blur = 0;
        duration = 11 + Math.random() * 5;
      }

      return {
        id: i,
        initialX: Math.random() * 100,
        spawnTop: `${Math.random() * 120 - 20}%`, 
        initialRotate: Math.random() * 360,
        targetRotate: Math.random() * 1080 + 720,
        duration,
        delay: 0,
        scale,
        blur,
        layer,
        // Proportions: 90% rice, 10% rolls
        type: Math.random() > 0.9 ? 'roll' as const : 'rice' as const,
        swingRange: 20 + Math.random() * 30,
        randomDelay: -duration * Math.random(), // CALCULATED HERE
      };
    });
    setGrains(newGrains);
  }, []);

  if (grains.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {grains.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 0, 
            top: p.spawnTop, 
            left: `${p.initialX}%`,
            rotate: p.initialRotate,
          }}
          animate={{ 
            opacity: [0, 0.6, 0.6, 0], 
            top: ["-20%", "120%"],
            x: [0, p.swingRange, -p.swingRange, 0], 
            rotate: [p.initialRotate, p.targetRotate],
            scale: [p.scale, p.scale * 1.05, p.scale]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: p.randomDelay, // USED HERE
          }}
          className="absolute will-change-transform"
          style={{ 
            width: p.type === 'roll' ? '32px' : '4px', 
            height: p.type === 'roll' ? '32px' : '10px',
            filter: p.blur > 0 ? `blur(${p.blur}px)` : 'none',
            zIndex: p.layer === 'foreground' ? 50 : p.layer === 'midground' ? 30 : 10
          }}
        >
          {p.type === 'roll' ? (
            <div 
              className="relative w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] rounded-full overflow-hidden"
              style={{ clipPath: 'circle(48%)' }}
            >
               <Image 
                 src="/sushi-roll.png" 
                 alt="Sushi" 
                 fill 
                 className="object-cover scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-white/40 rounded-full blur-[0.5px]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
