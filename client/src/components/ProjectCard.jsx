import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Activity, Gauge } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const color = project.color || "#c2a4ff";

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  const handleMove = (e) => {
    if (reducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        animate={{
          rotateX: reducedMotion ? 0 : tilt.x,
          rotateY: reducedMotion ? 0 : tilt.y,
          scale: hover && !reducedMotion ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl p-[1px] overflow-hidden group h-full flex flex-col"
      >
        {/* Subtle border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}50, transparent 60%)`,
            opacity: hover ? 1 : 0.25,
          }}
        />

        <div className="relative rounded-2xl bg-[#0b080c]/95 border border-white/10 p-6 flex-1 flex flex-col justify-between overflow-hidden">
          <div>
            {/* Top Metric Header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wider font-medium flex items-center gap-1.5"
                style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}
              >
                <Activity size={11} />
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-white/40">
                {project.releaseStatus}
              </span>
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-2 tracking-tight group-hover:text-[#c2a4ff] transition-colors">
              {project.title}
            </h3>

            <p className="text-white/60 text-xs md:text-sm mb-5 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg border border-white/10 bg-white/[0.02] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            {/* Single Deliberate Detail: Model Evaluation Report */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono mb-5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/40 text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Gauge size={11} className="text-[#c2a4ff]" />
                  Validation Score
                </span>
                <span className="font-semibold text-white/90" style={{ color }}>
                  {project.evalMetric}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">
                  Inference Latency
                </span>
                <span className="text-white/70 font-medium">
                  {project.latency}
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-xs font-mono">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <Github size={14} /> Repository
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#c2a4ff] hover:text-white transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} /> Live System
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}