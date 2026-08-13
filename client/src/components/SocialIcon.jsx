import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function SocialIcon({ href, icon: Icon, color = "#c2a4ff", size = 22 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className="relative flex items-center justify-center w-11 h-11 rounded-full"
    >
      {/* pulsing glow ring on hover */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={hover ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 1.2, repeat: hover ? Infinity : 0 }}
        style={{ border: `1px solid ${color}` }}
      />
      {/* rotating dashed ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 44 44"
        animate={hover ? { rotate: 360 } : {}}
        transition={{ duration: 3, repeat: hover ? Infinity : 0, ease: "linear" }}
      >
        <circle cx="22" cy="22" r="20" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3,4" opacity={hover ? 0.8 : 0} />
      </motion.svg>
      {/* orbiting particle dot */}
      {hover && (
        <motion.span
          className="absolute w-1 h-1 rounded-full"
          style={{ background: color, boxShadow: `0 0 6px 2px ${color}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute w-1 h-1 rounded-full" style={{ background: color, transform: "translateX(20px)" }} />
        </motion.span>
      )}
      {/* icon itself */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-white/5 border border-white/10"
        animate={hover ? { scale: 1.15, borderColor: color, boxShadow: `0 0 20px -2px ${color}` } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Icon size={size} style={{ color: hover ? color : "rgba(255,255,255,0.6)" }} className="transition-colors duration-200" />
      </motion.div>
    </motion.a>
  );
}