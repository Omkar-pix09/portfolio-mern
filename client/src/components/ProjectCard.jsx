import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
          <Github size={16} /> Code
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}