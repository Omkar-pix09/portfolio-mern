import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import ProfileImage from "./ProfileImage";

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
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 bg-purple-600" />
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 bg-indigo-600" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-24 md:pt-0">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p variants={item} className="text-indigo-400 font-medium mb-3 font-mono text-sm tracking-wider">Hello, I'm</motion.p>
          <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold font-display text-white mb-2 leading-tight">Omkar Patil</motion.h1>

          <div className="relative mb-6 mt-4">
            <motion.h2 variants={item} className="absolute top-0 text-3xl md:text-4xl font-bold font-display text-white/10 select-none">ML ENTHUSIAST</motion.h2>
            <motion.h2 variants={item} className="relative text-3xl md:text-4xl font-bold font-display gradient-text pt-6">FULL-STACK DEV</motion.h2>
          </div>

          <motion.p variants={item} className="text-white/50 mb-8 max-w-md leading-relaxed">Final-year CSE student building clean, functional web applications and exploring machine learning, currently shipping EduVerse, CodeSphere AI, and RepoGPT while preparing for placements.</motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
            <a href="/resume.pdf" download className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
              <Download size={18} /> Resume
            </a>
            <a href="#contact" className="flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-full font-medium hover:border-white/40 hover:bg-white/5 transition-all">
              <Mail size={18} /> Hire Me
            </a>
          </motion.div>

          <motion.div variants={item} className="flex gap-6">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Linkedin size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative flex justify-center md:justify-end">
          <ProfileImage shape="circle" />
        </motion.div>
      </div>
    </section>
  );
}