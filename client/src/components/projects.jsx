import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

function StatusLine() {
  const messages = ["INDEXING REPOSITORIES...", `${projects.length} PROJECTS COMPILED`, "BUILD STATUS: PASSING", "HOVER TO DECRYPT"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 font-mono text-xs text-cyan-300/70">
      <motion.span className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
      <motion.span key={index} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {messages[index]}
      </motion.span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-cyan-500 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-orange-500 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-wider mb-3">// PROJECTS.deploy()</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 bg-clip-text text-transparent mb-4">
            Things I've Built
          </h2>
          <StatusLine />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}