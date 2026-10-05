import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Github, Linkedin, Mail, User, Network } from "lucide-react";
import ProfileImage from "./ProfileImage";
import SocialIcon from "./SocialIcon";
import EmbeddingSpaceField from "./EmbeddingSpaceField";

function MagneticButton({ children, className, href, download, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function GlitchName() {
  const [hover, setHover] = useState(false);
  return (
    <motion.h1
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-2 leading-tight cursor-default select-none tracking-tight"
    >
      <span className="relative z-10">Omkar Patil</span>
      {hover && (
        <>
          <motion.span
            className="absolute top-0 left-0 z-0 text-[#c2a4ff] opacity-70"
            animate={{ x: [-2, 2, -2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            aria-hidden
          >
            Omkar Patil
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 z-0 text-[#ec4899] opacity-70"
            animate={{ x: [2, -2, 2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 0.22, repeat: Infinity }}
            aria-hidden
          >
            Omkar Patil
          </motion.span>
        </>
      )}
    </motion.h1>
  );
}

export default function Hero() {
  const [visualMode, setVisualMode] = useState("avatar"); // 'avatar' | 'embedding'

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 md:px-16 overflow-hidden bg-[#0b080c] py-28 md:py-20">
      {/* Background Ambient Plasma Lighting (strictly bounded) */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 bg-[#8b5cf6] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-[160px] opacity-20 bg-[#ec4899] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 Cols): Typography & Engineering Profile */}
        <motion.div initial="hidden" animate="visible" variants={container} className="lg:col-span-5 z-20">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2a4ff]/20 bg-[#c2a4ff]/10 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2a4ff]" />
            <span className="text-xs font-mono tracking-wider text-[#c2a4ff] uppercase font-medium">
              INITIALIZING THETA_0 // CONVERGENCE ACTIVE
            </span>
          </motion.div>

          <motion.div variants={item}>
            <GlitchName />
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-[#c2a4ff] via-[#a855f7] to-[#ec4899]">
              AI / Full-Stack Engineer
            </h2>
            <p className="text-xs font-mono text-white/40 mt-1 tracking-wide">
              MERN Stack · Applied Machine Learning · Scalable Distributed Systems
            </p>
          </motion.div>

          <motion.p variants={item} className="text-white/60 mb-8 max-w-lg leading-relaxed text-sm md:text-base">
            Final-year CSE student building high-performance web applications and applied machine learning models. Creator of EduVerse, CodeSphere AI, and predictive career analytics platforms.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-8">
            <MagneticButton
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#ec4899] text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer text-sm"
            >
              <Download size={16} /> Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="flex items-center gap-2 border border-white/20 text-white/90 px-6 py-3 rounded-full font-medium hover:border-[#c2a4ff]/50 hover:bg-[#c2a4ff]/10 transition-all cursor-pointer text-sm"
            >
              <Mail size={16} /> Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            <SocialIcon href="https://github.com/Omkar-pix09" icon={Github} color="#c2a4ff" />
            <SocialIcon href="https://www.linkedin.com/in/omkar-patil-op/" icon={Linkedin} color="#c2a4ff" />
            <div className="h-4 w-px bg-white/10 mx-2" />
            <span className="text-xs font-mono text-white/40">Kolhapur, IN (UTC+5:30)</span>
          </motion.div>
        </motion.div>

        {/* Right Column (7 Cols): Standout Embedding-Space Hero Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7 flex flex-col items-center justify-center relative w-full"
        >
          {/* Top Switcher to toggle between Latent Projection & Bio Avatar */}
          <div className="w-full flex items-center justify-end mb-3">
            <div className="flex items-center p-1 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-mono">
              <button
                onClick={() => setVisualMode("embedding")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  visualMode === "embedding"
                    ? "bg-[#c2a4ff]/20 text-white border border-[#c2a4ff]/40 shadow-sm"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Network size={12} className="text-[#c2a4ff]" />
                <span>Latent Embedding Space</span>
              </button>
              <button
                onClick={() => setVisualMode("avatar")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  visualMode === "avatar"
                    ? "bg-[#c2a4ff]/20 text-white border border-[#c2a4ff]/40 shadow-sm"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <User size={12} className="text-[#c2a4ff]" />
                <span>Bio Avatar</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {visualMode === "embedding" ? (
              <motion.div
                key="embedding-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <EmbeddingSpaceField />
              </motion.div>
            ) : (
              <motion.div
                key="bio-avatar"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="py-12"
              >
                <ProfileImage shape="circle" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}