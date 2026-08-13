import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import ProfileImage from "./ProfileImage";
import SocialIcon from "./SocialIcon";
import ParticleField from "./ParticleField";

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
      className="relative text-5xl md:text-6xl font-bold font-display text-white mb-2 leading-tight cursor-default select-none"
    >
      <span className="relative z-10">Omkar Patil</span>
      {hover && (
        <>
          <motion.span
            className="absolute top-0 left-0 z-0 text-cyan-400 opacity-70"
            animate={{ x: [-2, 2, -2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            aria-hidden
          >
            Omkar Patil
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 z-0 text-pink-400 opacity-70"
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
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden bg-[#0b080c]">
      <ParticleField />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 bg-purple-600 pointer-events-none" />
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 bg-indigo-600 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-24 md:pt-0">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p variants={item} className="text-indigo-400 font-medium mb-3 font-mono text-sm tracking-wider">Hello, I'm</motion.p>
          <motion.div variants={item}>
            <GlitchName />
          </motion.div>

          <div className="relative mb-6 mt-4">
            <motion.h2 variants={item} className="absolute top-0 text-3xl md:text-4xl font-bold font-display text-white/10 select-none">ML ENTHUSIAST</motion.h2>
            <motion.h2 variants={item} className="relative text-3xl md:text-4xl font-bold font-display gradient-text pt-6">FULL-STACK DEV</motion.h2>
          </div>

          <motion.p variants={item} className="text-white/50 mb-8 max-w-md leading-relaxed">Final-year CSE student building clean, functional web applications and exploring machine learning, currently shipping EduVerse, CodeSphere AI, and RepoGPT while preparing for placements.</motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
            <MagneticButton href="/resume.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-purple-500/30">
              <Download size={18} /> Resume
            </MagneticButton>
            <MagneticButton href="#contact" className="flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-full font-medium hover:border-white/40 hover:bg-white/5 transition-all">
              <Mail size={18} /> Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="flex gap-3">
            <SocialIcon href="https://github.com/Omkar-pix09" icon={Github} color="#c2a4ff" />
            <SocialIcon href="https://www.linkedin.com/in/omkar-patil-op/" icon={Linkedin} color="#38bdf8" />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative flex justify-center md:justify-end">
          <ProfileImage shape="circle" />
        </motion.div>
      </div>
    </section>
  );
}