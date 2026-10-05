import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Layers, BrainCircuit, Cpu, Zap, Activity } from "lucide-react";

/* ----------------------------------------------------------------
   Ultra-Realistic AI Neural Graph — Skills as Connected Graph
   Features: Data-flow particles, pulse waves, holographic HUD,
   neural synapse animations, multi-color gradient edges,
   living breathing topology with AI aesthetic
---------------------------------------------------------------- */
const PALETTE = {
  accent: "#c2a4ff",
  purple: "#a855f7",
  pink: "#ec4899",
  indigo: "#8b5cf6",
  cyan: "#22d3ee",
  emerald: "#10b981",
  amber: "#f59e0b",
  bg: "#0b080c",
};

const SKILL_NODES = [
  // MERN Stack Cluster
  { id: "react",    label: "React 19",      cluster: "mern", level: 93, cx: 300, cy: 170, color: PALETTE.accent,  icon: "⚛" },
  { id: "node",     label: "Node.js",       cluster: "mern", level: 88, cx: 200, cy: 115, color: PALETTE.purple,  icon: "⬡" },
  { id: "express",  label: "Express",       cluster: "mern", level: 85, cx: 170, cy: 225, color: PALETTE.indigo,  icon: "⚡" },
  { id: "mongodb",  label: "MongoDB",       cluster: "mern", level: 87, cx: 310, cy: 285, color: PALETTE.purple,  icon: "🌿" },
  { id: "js",       label: "JavaScript",   cluster: "mern", level: 90, cx: 405, cy: 185, color: PALETTE.amber,   icon: "JS" },

  // Machine Learning Cluster
  { id: "python",   label: "Python",        cluster: "ml",   level: 92, cx: 645, cy: 145, color: PALETTE.pink,    icon: "🐍" },
  { id: "xgboost",  label: "XGBoost",       cluster: "ml",   level: 90, cx: 560, cy: 228, color: PALETTE.pink,    icon: "📈" },
  { id: "pipeline", label: "Pipelines",     cluster: "ml",   level: 85, cx: 728, cy: 225, color: PALETTE.purple,  icon: "⟳" },
  { id: "data",     label: "Feature Eng.", cluster: "ml",   level: 84, cx: 612, cy: 76,  color: PALETTE.indigo,  icon: "∑" },
  { id: "flask",    label: "Flask",         cluster: "ml",   level: 68, cx: 758, cy: 118, color: PALETTE.cyan,    icon: "🧪" },

  // Systems & Cloud Cluster
  { id: "docker",   label: "Docker",        cluster: "sys",  level: 75, cx: 458, cy: 352, color: PALETTE.cyan,    icon: "🐳" },
  { id: "aws",      label: "AWS Cloud",     cluster: "sys",  level: 70, cx: 558, cy: 382, color: PALETTE.amber,   icon: "☁" },
  { id: "git",      label: "Git/VCS",       cluster: "sys",  level: 90, cx: 355, cy: 380, color: PALETTE.emerald, icon: "⑂" },
  { id: "java",     label: "Java",          cluster: "sys",  level: 80, cx: 248, cy: 372, color: PALETTE.pink,    icon: "☕" },
  { id: "kotlin",   label: "Kotlin",        cluster: "sys",  level: 82, cx: 662, cy: 342, color: PALETTE.accent,  icon: "◆" },
];

const SKILL_EDGES = [
  { from: "react",    to: "node",     weight: 0.95 },
  { from: "react",    to: "js",       weight: 0.98 },
  { from: "node",     to: "express",  weight: 0.96 },
  { from: "express",  to: "mongodb",  weight: 0.92 },
  { from: "react",    to: "mongodb",  weight: 0.85 },
  { from: "python",   to: "xgboost",  weight: 0.95 },
  { from: "python",   to: "pipeline", weight: 0.90 },
  { from: "python",   to: "data",     weight: 0.92 },
  { from: "python",   to: "flask",    weight: 0.82 },
  { from: "xgboost",  to: "pipeline", weight: 0.88 },
  { from: "docker",   to: "aws",      weight: 0.85 },
  { from: "docker",   to: "git",      weight: 0.88 },
  { from: "java",     to: "kotlin",   weight: 0.84 },
  { from: "node",     to: "docker",   weight: 0.78 },
  { from: "xgboost",  to: "docker",   weight: 0.75 },
  { from: "express",  to: "flask",    weight: 0.65 },
  { from: "mongodb",  to: "pipeline", weight: 0.72 },
];

/* Animated data particle traveling along an edge */
function EdgeParticle({ x1, y1, x2, y2, color, delay = 0, duration = 2.5 }) {
  return (
    <motion.circle
      r={2.5}
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={`M${x1},${y1} L${x2},${y2}`}
      />
    </motion.circle>
  );
}

/* Pulse wave ring emitted from a node */
function PulseRing({ cx, cy, color, delay = 0 }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={0}
      fill="none"
      stroke={color}
      strokeWidth={1}
      initial={{ r: 0, opacity: 0.8 }}
      animate={{ r: 55, opacity: 0 }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

export default function Skills() {
  const [activeCluster, setActiveCluster] = useState("all");
  const [hoveredNode, setHoveredNode] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tick, setTick] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  // Heartbeat tick for ambient animations
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const clusterMeta = {
    all:  { label: "Full Neural Graph", count: SKILL_NODES.length, icon: Network,      color: PALETTE.accent },
    mern: { label: "MERN Stack",        count: 5,                  icon: Layers,       color: PALETTE.accent },
    ml:   { label: "AI / ML Core",      count: 5,                  icon: BrainCircuit, color: PALETTE.pink },
    sys:  { label: "Systems & Cloud",   count: 5,                  icon: Cpu,          color: PALETTE.cyan },
  };

  const visibleNodes = useMemo(() => {
    if (activeCluster === "all") return SKILL_NODES;
    return SKILL_NODES.filter((n) => n.cluster === activeCluster);
  }, [activeCluster]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() =>
    SKILL_EDGES.filter((e) => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to)),
    [visibleNodeIds]
  );

  const connectedIds = useMemo(() => {
    if (!hoveredNode) return null;
    const ids = new Set([hoveredNode.id]);
    SKILL_EDGES.forEach((e) => {
      if (e.from === hoveredNode.id) ids.add(e.to);
      if (e.to === hoveredNode.id) ids.add(e.from);
    });
    return ids;
  }, [hoveredNode]);

  // Determine pulse source nodes (one per cluster, rotating by tick)
  const pulseNodeIds = useMemo(() => {
    const clusters = ["mern", "ml", "sys"];
    return clusters.map((cl) => {
      const cNodes = SKILL_NODES.filter((n) => n.cluster === cl);
      return cNodes[tick % cNodes.length]?.id;
    });
  }, [tick]);

  return (
    <section id="skills" className="relative py-28 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0b080c] overflow-hidden">
      {/* AI atmospheric glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-12 bg-[#8b5cf6] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full blur-[160px] opacity-8 bg-[#ec4899] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[150px] opacity-8 bg-[#22d3ee] pointer-events-none" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194,164,255,0.4) 2px, rgba(194,164,255,0.4) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* AI badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2a4ff]/30 bg-[#c2a4ff]/10 mb-4 backdrop-blur-md"
              animate={{ borderColor: ["rgba(194,164,255,0.3)", "rgba(168,85,247,0.6)", "rgba(194,164,255,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[#c2a4ff]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[11px] font-mono tracking-widest text-[#c2a4ff] uppercase font-semibold">
                NEURAL TOPOLOGY // SYNERGY MATRIX // LIVE
              </span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Activity size={11} className="text-[#c2a4ff]" />
              </motion.div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-2">
              Skills as a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2a4ff] via-[#ec4899] to-[#22d3ee]">
                Connected Graph
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/40 mt-1">
              Nodes sized by proficiency · Weighted edges = real architectural integration · Live data-flow pulses
            </p>
          </motion.div>

          {/* Cluster filter buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl">
            {Object.entries(clusterMeta).map(([key, meta]) => {
              const Icon = meta.icon;
              const isActive = activeCluster === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveCluster(key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "text-white border shadow-sm"
                      : "text-white/45 hover:text-white"
                  }`}
                  style={isActive ? {
                    backgroundColor: `${meta.color}22`,
                    borderColor: `${meta.color}60`,
                    boxShadow: `0 0 12px ${meta.color}30`,
                  } : {}}
                >
                  <Icon size={12} style={{ color: isActive ? meta.color : undefined }} />
                  <span>{meta.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Graph Canvas ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-3xl border border-white/10 bg-[#06030d]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.12)]"
        >
          {/* Holographic corner HUD marks */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-10 h-10 pointer-events-none`}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            >
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <path
                  d={i === 0 ? "M2 18 L2 2 L18 2" : i === 1 ? "M38 18 L38 2 L22 2" : i === 2 ? "M2 22 L2 38 L18 38" : "M38 22 L38 38 L22 38"}
                  stroke="#c2a4ff" strokeWidth="1.5" fill="none" opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}

          {/* Top telemetry bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                GRAPH LIVE
              </span>
              <span className="text-white/20">|</span>
              <span>Nodes: {visibleNodes.length} · Edges: {visibleEdges.length}</span>
              <span className="text-white/20">|</span>
              <span>Graph Coordinates: Proximity = Semantic Closeness</span>
            </div>

            <AnimatePresence mode="wait">
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2 text-[10px] font-mono"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                  <span className="text-white font-bold">{hoveredNode.label}</span>
                  <span className="text-white/40">·</span>
                  <span style={{ color: hoveredNode.color }}>{hoveredNode.level}%</span>
                  <span className="text-white/40">· {hoveredNode.cluster.toUpperCase()}</span>
                </motion.div>
              ) : (
                <span className="text-[10px] font-mono text-white/25">
                  Hover any node to inspect weight & connections
                </span>
              )}
            </AnimatePresence>
          </div>

          {/* SVG Graph */}
          <div className="relative w-full overflow-x-auto no-scrollbar px-4 pb-6 pt-2">
            <svg
              ref={svgRef}
              viewBox="0 0 920 460"
              className="w-full min-w-[700px] h-[400px] md:h-[460px] select-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Gradient definitions for edge colors */}
                {visibleEdges.map((edge) => {
                  const src = SKILL_NODES.find((n) => n.id === edge.from);
                  const tgt = SKILL_NODES.find((n) => n.id === edge.to);
                  if (!src || !tgt) return null;
                  return (
                    <linearGradient key={`grad-${edge.from}-${edge.to}`} id={`grad-${edge.from}-${edge.to}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={src.color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={tgt.color} stopOpacity="0.9" />
                    </linearGradient>
                  );
                })}
                {/* Radial glow filter */}
                <filter id="glow-sm">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-lg">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ── Edges ── */}
              {visibleEdges.map((edge) => {
                const source = SKILL_NODES.find((n) => n.id === edge.from);
                const target = SKILL_NODES.find((n) => n.id === edge.to);
                if (!source || !target) return null;

                const isConnectedToHover = connectedIds && connectedIds.has(source.id) && connectedIds.has(target.id);
                const isDimmed = connectedIds && !isConnectedToHover;
                const strokeOpacity = isDimmed ? 0.04 : isConnectedToHover ? 0.85 : 0.22;
                const strokeWidth = isConnectedToHover ? edge.weight * 2.5 : edge.weight * 1;

                return (
                  <g key={`edge-${edge.from}-${edge.to}`}>
                    {/* Edge glow shadow */}
                    {isConnectedToHover && (
                      <line
                        x1={source.cx} y1={source.cy} x2={target.cx} y2={target.cy}
                        stroke={source.color} strokeWidth={strokeWidth + 4}
                        strokeOpacity={0.12}
                        filter="url(#glow-sm)"
                      />
                    )}
                    {/* Main edge */}
                    <line
                      x1={source.cx} y1={source.cy} x2={target.cx} y2={target.cy}
                      stroke={isConnectedToHover
                        ? `url(#grad-${edge.from}-${edge.to})`
                        : `url(#grad-${edge.from}-${edge.to})`}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      strokeDasharray={isConnectedToHover ? undefined : "3,5"}
                      className="transition-all duration-500"
                    />
                    {/* Data flow particles on active or always for visible edges */}
                    {!reducedMotion && !isDimmed && (
                      <>
                        <EdgeParticle
                          x1={source.cx} y1={source.cy}
                          x2={target.cx} y2={target.cy}
                          color={source.color}
                          delay={Math.random() * 2}
                          duration={2 + (1 - edge.weight) * 2}
                        />
                        {isConnectedToHover && (
                          <EdgeParticle
                            x1={target.cx} y1={target.cy}
                            x2={source.cx} y2={source.cy}
                            color={target.color}
                            delay={1}
                            duration={2.5}
                          />
                        )}
                      </>
                    )}
                  </g>
                );
              })}

              {/* ── Nodes ── */}
              {visibleNodes.map((node, idx) => {
                const radius = 17 + ((node.level - 65) / 35) * 12;
                const isHovered = hoveredNode?.id === node.id;
                const isConnected = connectedIds && connectedIds.has(node.id);
                const isDimmed = connectedIds && !isConnected;
                const isPulsing = pulseNodeIds.includes(node.id) && !reducedMotion;

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                    style={{ opacity: isDimmed ? 0.18 : 1, transition: "opacity 0.4s" }}
                  >
                    {/* Ambient pulse ring */}
                    {isPulsing && <PulseRing cx={node.cx} cy={node.cy} color={node.color} delay={0} />}

                    {/* Outer glow halo (hover/connected) */}
                    {(isHovered || isConnected) && (
                      <>
                        <circle
                          cx={node.cx} cy={node.cy} r={radius + 14}
                          fill="none" stroke={node.color} strokeWidth="1"
                          strokeOpacity={0.2}
                          filter="url(#glow-lg)"
                        />
                        <motion.circle
                          cx={node.cx} cy={node.cy} r={radius + 7}
                          fill="none" stroke={node.color} strokeWidth="1.5"
                          strokeOpacity={0}
                          animate={{ r: [radius + 5, radius + 20], strokeOpacity: [0.6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </>
                    )}

                    {/* Node body: dark glass core */}
                    <circle
                      cx={node.cx} cy={node.cy} r={radius}
                      fill={isHovered ? `${node.color}28` : "#0a0614"}
                      stroke={node.color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeOpacity={isHovered ? 1 : 0.75}
                      style={{
                        filter: (isHovered || isConnected) ? `drop-shadow(0 0 10px ${node.color}90)` : `drop-shadow(0 0 3px ${node.color}40)`,
                        transition: "all 0.3s",
                      }}
                    />

                    {/* Inner radial gradient fill */}
                    <circle
                      cx={node.cx} cy={node.cy} r={radius * 0.55}
                      fill={node.color} opacity={isHovered ? 0.35 : 0.15}
                      style={{ transition: "opacity 0.3s" }}
                    />

                    {/* Icon / emoji label inside node */}
                    <text
                      x={node.cx} y={node.cy - 3}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={radius > 22 ? "13" : "10"}
                      className="pointer-events-none select-none"
                      style={{ userSelect: "none" }}
                    >
                      {node.icon}
                    </text>

                    {/* Skill name below icon */}
                    <text
                      x={node.cx} y={node.cy + radius + 13}
                      textAnchor="middle"
                      fill={isHovered ? "#ffffff" : "rgba(255,255,255,0.8)"}
                      fontSize="9.5"
                      fontFamily="Geist, monospace, sans-serif"
                      fontWeight={isHovered ? "700" : "500"}
                      className="pointer-events-none select-none"
                      style={{ transition: "fill 0.3s" }}
                    >
                      {node.label}
                    </text>

                    {/* Proficiency badge */}
                    <text
                      x={node.cx} y={node.cy + radius + 23}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="8"
                      fontFamily="monospace"
                      opacity={isHovered ? 1 : 0.7}
                      className="pointer-events-none select-none"
                    >
                      {node.level}%
                    </text>

                    {/* Small pulsing core dot */}
                    {!reducedMotion && (
                      <motion.circle
                        cx={node.cx} cy={node.cy - radius * 0.3}
                        r={2.5}
                        fill={node.color}
                        animate={{ opacity: [0.4, 1, 0.4], r: [2, 3.2, 2] }}
                        transition={{ duration: 2, delay: idx * 0.15, repeat: Infinity }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom legend + stats */}
          <div className="border-t border-white/[0.06] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/45">
              {[
                { color: PALETTE.accent,  label: "MERN Stack" },
                { color: PALETTE.pink,    label: "AI / ML" },
                { color: PALETTE.cyan,    label: "Systems & Cloud" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-2">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: l.color, boxShadow: `0 0 6px ${l.color}` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {l.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
              <Zap size={10} className="text-amber-400" />
              <span>Live neural pulse · Node size = proficiency weight (68–95%)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}