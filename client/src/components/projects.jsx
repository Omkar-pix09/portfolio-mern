import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { Terminal, BrainCircuit, Layers, Cpu, Activity, Zap, Network } from "lucide-react";

/* ----------------------------------------------------------------
   Animated flowing neural network header for Projects section
   Ultra AI / Deep Learning aesthetic
---------------------------------------------------------------- */
function AIBrainHeader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Neural layer nodes
    const layers = [
      { x: 0.12, nodes: [0.25, 0.5, 0.75] },
      { x: 0.3,  nodes: [0.18, 0.38, 0.58, 0.78] },
      { x: 0.5,  nodes: [0.22, 0.42, 0.62, 0.82] },
      { x: 0.7,  nodes: [0.18, 0.38, 0.58, 0.78] },
      { x: 0.88, nodes: [0.25, 0.5, 0.75] },
    ];

    const layerColors = ["#c2a4ff", "#a855f7", "#ec4899", "#a855f7", "#c2a4ff"];
    let clock = 0;
    let raf;

    const draw = () => {
      clock += 0.018;
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let li = 0; li < layers.length - 1; li++) {
        const la = layers[li];
        const lb = layers[li + 1];
        la.nodes.forEach((ya, ni) => {
          lb.nodes.forEach((yb, nj) => {
            const ax = la.x * W, ay = ya * H;
            const bx = lb.x * W, by = yb * H;
            const pulse = Math.sin(clock * 2 + ni * 0.7 + nj * 1.3) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(168,85,247,${0.06 + pulse * 0.1})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Traveling signal dot
            const t = (clock * 0.5 + ni * 0.2 + nj * 0.15) % 1;
            const px = ax + (bx - ax) * t;
            const py = ay + (by - ay) * t;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(194,164,255,${0.4 * pulse})`;
            ctx.fill();
          });
        });
      }

      // Draw nodes
      layers.forEach((layer, li) => {
        layer.nodes.forEach((yn, ni) => {
          const x = layer.x * W;
          const y = yn * H;
          const pulse = Math.sin(clock * 1.5 + ni * 0.9 + li * 0.5) * 0.5 + 0.5;
          const r = 5 + pulse * 2;

          // Glow
          ctx.beginPath();
          ctx.arc(x, y, r + 5, 0, Math.PI * 2);
          ctx.fillStyle = `${layerColors[li]}10`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `${layerColors[li]}${Math.round(30 + pulse * 60).toString(16).padStart(2, "0")}`;
          ctx.strokeStyle = `${layerColors[li]}`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.fill();
        });
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* Animated metric counter */
function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.round(start));
        }, 16);
        observer.disconnect();
        return () => clearInterval(timer);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all",     label: "All Systems",    icon: Network },
    { key: "ai",      label: "AI / ML",        icon: BrainCircuit },
    { key: "android", label: "Mobile",         icon: Cpu },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => {
        if (activeFilter === "ai") return p.category.toLowerCase().includes("ai") || p.category.toLowerCase().includes("ml");
        if (activeFilter === "android") return p.category.toLowerCase().includes("android") || p.category.toLowerCase().includes("mobile");
        return true;
      });

  const stats = [
    { value: 94, suffix: "%",   label: "Peak Accuracy" },
    { value: 3,  suffix: "+",   label: "Live Systems" },
    { value: 18, suffix: "ms",  label: "Min Latency" },
  ];

  return (
    <section id="projects" className="relative py-28 md:py-36 px-5 sm:px-8 md:px-16 bg-[#0b080c] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[180px] opacity-12 bg-[#8b5cf6] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[450px] h-[450px] rounded-full blur-[160px] opacity-12 bg-[#ec4899] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Ultra AI/DL Header Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl mb-14 overflow-hidden border border-white/10 bg-[#05020d]"
          style={{ minHeight: 220 }}
        >
          {/* Live neural-net canvas background */}
          <AIBrainHeader />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194,164,255,0.5) 2px, rgba(194,164,255,0.5) 3px)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-10">
            {/* Left text */}
            <div className="flex-1">
              {/* Animated badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ec4899]/40 bg-[#ec4899]/10 mb-4 backdrop-blur-md"
                animate={{ borderColor: ["rgba(236,72,153,0.4)", "rgba(168,85,247,0.6)", "rgba(236,72,153,0.4)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <BrainCircuit size={13} className="text-[#ec4899]" />
                </motion.div>
                <span className="text-[11px] font-mono tracking-widest text-[#ec4899] uppercase font-semibold">
                  EVALUATION REPORT // VALIDATED DEPLOYMENTS // LIVE
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Activity size={11} className="text-[#ec4899]" />
                </motion.span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a4ff] via-[#ec4899] to-[#8b5cf6]">
                  Systems & Models
                </span>
              </h2>

              <p className="text-xs sm:text-sm font-mono text-white/50 max-w-lg leading-relaxed">
                Live architectures with benchmarked validation scores, inference profiles, and real production metrics.
              </p>
            </div>

            {/* Right stats panel */}
            <div className="flex-shrink-0 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative text-center px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden"
                >
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-12 h-12 rounded-full blur-2xl opacity-30 bg-[#c2a4ff] pointer-events-none" />
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#c2a4ff] font-mono">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Corner HUD brackets */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <div key={pos} className={`absolute ${pos} w-8 h-8 pointer-events-none`}>
              <svg viewBox="0 0 32 32" className="w-full h-full opacity-40">
                <path
                  d={i === 0 ? "M2 14 L2 2 L14 2" : i === 1 ? "M30 14 L30 2 L18 2" : i === 2 ? "M2 18 L2 30 L14 30" : "M30 18 L30 30 L18 30"}
                  stroke="#c2a4ff" strokeWidth="1.5" fill="none"
                />
              </svg>
            </div>
          ))}
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {filters.map(({ key, label, icon: Icon }) => {
            const isActive = activeFilter === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveFilter(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#c2a4ff]/20 text-white border border-[#c2a4ff]/50 shadow-[0_0_16px_rgba(194,164,255,0.2)]"
                    : "text-white/40 border border-white/10 hover:text-white hover:border-white/25"
                }`}
              >
                <Icon size={12} className={isActive ? "text-[#c2a4ff]" : "text-white/40"} />
                {label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Project cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}