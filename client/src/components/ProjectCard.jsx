import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu } from "lucide-react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function DecryptText({ text, active, className }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const totalFrames = 18;
    const interval = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealCount) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span className={className}>{display}</span>;
}

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePct, setMousePct] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);
  const color = project.color || "#22d3ee";

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
    setMousePct({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };
  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hover ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl p-[1.5px] overflow-hidden cursor-pointer"
      >
        {/* rotating conic-gradient holographic border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from 0deg, ${color}, transparent 30%, transparent 70%, ${color})`,
            opacity: hover ? 1 : 0.35,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative rounded-2xl bg-[#0b080c]/95 backdrop-blur-sm p-6 overflow-hidden h-full">
          {/* holographic sheen following cursor */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hover ? 0.5 : 0,
              background: `radial-gradient(300px circle at ${mousePct.x}% ${mousePct.y}%, ${color}25, transparent 60%)`,
            }}
          />
          {/* scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: `repeating-linear-gradient(0deg, ${color}, ${color} 1px, transparent 1px, transparent 3px)` }}
          />

          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            {/* HUD header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1.5"
                style={{ backgroundColor: `${color}18`, color }}
              >
                <Cpu size={11} />
                {project.category}
              </span>
              <motion.span
                className="text-[10px] font-mono text-white/25"
                animate={hover ? { opacity: [0.25, 0.6, 0.25] } : { opacity: 0.25 }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ID:0{project.id}
              </motion.span>
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-2 min-h-[28px]">
              <DecryptText text={project.title} active={hover} />
            </h3>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/60">
                  {t}
                </span>
              ))}
            </div>

            {/* fake system readout, appears on hover */}
            <div className="mb-5 h-4 overflow-hidden">
              <motion.p
                className="text-[10px] font-mono"
                style={{ color }}
                initial={{ y: 16, opacity: 0 }}
                animate={hover ? { y: 0, opacity: 0.8 } : { y: 16, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {`> status: deployed · latency: ${12 + project.id * 3}ms · uptime: 99.${90 + project.id}%`}
              </motion.p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                <Github size={16} /> Code
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}