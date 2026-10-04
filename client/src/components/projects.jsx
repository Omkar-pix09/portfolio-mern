import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { Terminal } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0b080c] overflow-hidden">
      {/* Subtle bounded ambient glow */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 bg-[#8b5cf6] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[450px] h-[450px] rounded-full blur-[160px] opacity-15 bg-[#ec4899] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c2a4ff]/20 bg-[#c2a4ff]/10 mb-3">
            <Terminal size={12} className="text-[#c2a4ff]" />
            <span className="text-[11px] font-mono tracking-wider text-[#c2a4ff] uppercase font-semibold">
              EVALUATION REPORT // VALIDATED DEPLOYMENTS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
            Featured Systems & Models
          </h2>

          <p className="text-xs sm:text-sm font-mono text-white/50 max-w-lg mx-auto">
            Live architectures with benchmarked validation scores and inference profiles
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}