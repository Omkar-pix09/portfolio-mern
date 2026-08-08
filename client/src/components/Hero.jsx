import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Hi, I'm</p>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">Omkar Patil</h1>
        <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">CSE Undergrad - Full-Stack Developer - ML Enthusiast</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">I build clean, functional web applications and explore machine learning to solve real-world problems, currently preparing for placements while shipping projects like EduVerse, CodeSphere AI, and RepoGPT.</p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="/resume.pdf" download className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
            <Download size={18} /> Download Resume
          </a>
          <a href="#contact" className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Mail size={18} /> Contact Me
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            <Linkedin size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}