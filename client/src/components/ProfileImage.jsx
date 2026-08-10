import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ProfileImage({ shape = "circle", size = "w-72 h-72 md:w-96 md:h-96" }) {
  const [scanned, setScanned] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setScanned(true), 2000);
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (360 / 14) * i,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      }))
    );
    return () => clearTimeout(timer);
  }, []);

  const radius = shape === "circle" ? "rounded-full" : "rounded-3xl";

  return (
    <div className={`relative ${size} flex items-center justify-center`}>
      {/* orbiting particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-300"
          style={{ boxShadow: "0 0 8px 2px rgba(194,164,255,0.8)" }}
          animate={{
            rotate: [p.angle, p.angle + 360],
          }}
          transition={{ duration: p.duration * 4, repeat: Infinity, ease: "linear", delay: p.delay }}
        >
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-purple-300"
            style={{
              transform: `translateX(${shape === "circle" ? 145 : 160}px)`,
              boxShadow: "0 0 8px 2px rgba(194,164,255,0.8)",
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        </motion.div>
      ))}

      {/* pulsing outer glow ring */}
      <motion.div
        className={`absolute inset-0 ${radius} bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl`}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rotating dashed ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="47" fill="none" stroke="#c2a4ff" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.5" />
      </motion.svg>

      {/* gradient ring + photo */}
      <div className={`absolute inset-6 ${radius} p-[3px] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400`}>
        <div className={`relative w-full h-full ${radius} overflow-hidden bg-[#0b080c]`}>
          <motion.img
            src="/profile.jpg"
            alt="Omkar Patil"
            initial={{ opacity: 0, scale: 1.2, filter: "hue-rotate(120deg) saturate(4) brightness(1.5)" }}
            animate={{ opacity: 1, scale: 1, filter: "hue-rotate(0deg) saturate(1) brightness(1)" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(8%) contrast(1.08)" }}
          />

          {/* scanning grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(194,164,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(194,164,255,0.4) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* one-time reveal sweep */}
          {!scanned && (
            <motion.div
              initial={{ top: "-15%" }}
              animate={{ top: "115%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-purple-200 to-transparent shadow-[0_0_25px_6px_rgba(194,164,255,0.9)]"
            />
          )}

          {/* continuous loop scan */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-purple-300/50"
          />

          {/* glitch flicker overlay, occasional */}
          <motion.div
            className="absolute inset-0 bg-purple-400/10 mix-blend-overlay"
            animate={{ opacity: [0, 0, 0.4, 0, 0, 0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* corner brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M6 16 V6 H16"
              stroke="#c2a4ff" strokeWidth="1" fill="none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M84 6 H94 V16"
              stroke="#c2a4ff" strokeWidth="1" fill="none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M94 84 V94 H84"
              stroke="#c2a4ff" strokeWidth="1" fill="none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.path
              d="M16 94 H6 V84"
              stroke="#c2a4ff" strokeWidth="1" fill="none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </svg>

          {/* status chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: scanned ? 1 : 0, y: scanned ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-purple-400/30 flex items-center gap-1.5"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono text-purple-300 tracking-wider">SYSTEM ONLINE</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}