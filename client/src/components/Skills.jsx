import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Layers, BrainCircuit, Cpu } from "lucide-react";

/* ----------------------------------------------------------------
   Color Tokens (Strict palette)
---------------------------------------------------------------- */
const PALETTE = {
  accent: "#c2a4ff",
  purple: "#a855f7",
  pink: "#ec4899",
  indigo: "#8b5cf6",
  bg: "#0b080c",
};

/* ----------------------------------------------------------------
   Skill Nodes Dataset: Sized by Proficiency, Grouped by Synergy
---------------------------------------------------------------- */
const SKILL_NODES = [
  // Cluster: MERN Stack (Centroid: React)
  { id: "react", label: "React 19", cluster: "mern", level: 93, cx: 300, cy: 170, color: PALETTE.accent },
  { id: "node", label: "Node.js", cluster: "mern", level: 88, cx: 220, cy: 120, color: PALETTE.purple },
  { id: "express", label: "Express", cluster: "mern", level: 85, cx: 180, cy: 220, color: PALETTE.indigo },
  { id: "mongodb", label: "MongoDB", cluster: "mern", level: 87, cx: 320, cy: 280, color: PALETTE.purple },
  { id: "js", label: "JavaScript", cluster: "mern", level: 90, cx: 400, cy: 190, color: PALETTE.accent },

  // Cluster: Machine Learning & Python (Centroid: Python)
  { id: "python", label: "Python", cluster: "ml", level: 92, cx: 640, cy: 150, color: PALETTE.pink },
  { id: "xgboost", label: "XGBoost", cluster: "ml", level: 90, cx: 560, cy: 230, color: PALETTE.pink },
  { id: "pipeline", label: "Pipelines", cluster: "ml", level: 85, cx: 720, cy: 220, color: PALETTE.purple },
  { id: "data", label: "Feature Eng.", cluster: "ml", level: 84, cx: 610, cy: 80, color: PALETTE.indigo },
  { id: "flask", label: "Flask", cluster: "ml", level: 68, cx: 750, cy: 120, color: PALETTE.purple },

  // Cluster: Systems & Cloud Infrastructure
  { id: "docker", label: "Docker", cluster: "sys", level: 75, cx: 460, cy: 350, color: PALETTE.indigo },
  { id: "aws", label: "AWS", cluster: "sys", level: 70, cx: 560, cy: 380, color: PALETTE.purple },
  { id: "git", label: "Git", cluster: "sys", level: 90, cx: 360, cy: 380, color: PALETTE.accent },
  { id: "java", label: "Java", cluster: "sys", level: 80, cx: 250, cy: 370, color: PALETTE.pink },
  { id: "kotlin", label: "Kotlin", cluster: "sys", level: 82, cx: 660, cy: 340, color: PALETTE.pink },
];

/* Weighted Architectural Edges (Real Stack Co-occurrence) */
const SKILL_EDGES = [
  // MERN Internal
  { from: "react", to: "node", weight: 0.95 },
  { from: "react", to: "js", weight: 0.98 },
  { from: "node", to: "express", weight: 0.96 },
  { from: "express", to: "mongodb", weight: 0.92 },
  { from: "react", to: "mongodb", weight: 0.85 },

  // ML Internal
  { from: "python", to: "xgboost", weight: 0.95 },
  { from: "python", to: "pipeline", weight: 0.90 },
  { from: "python", to: "data", weight: 0.92 },
  { from: "python", to: "flask", weight: 0.82 },
  { from: "xgboost", to: "pipeline", weight: 0.88 },

  // Systems Internal
  { from: "docker", to: "aws", weight: 0.85 },
  { from: "docker", to: "git", weight: 0.88 },
  { from: "java", to: "kotlin", weight: 0.84 },

  // Inter-Cluster Bridges (Full-Stack + ML integration)
  { from: "node", to: "docker", weight: 0.78 },
  { from: "xgboost", to: "docker", weight: 0.75 },
  { from: "express", to: "flask", weight: 0.65 },
  { from: "mongodb", to: "pipeline", weight: 0.72 },
];

export default function Skills() {
  const [activeCluster, setActiveCluster] = useState("all");
  const [hoveredNode, setHoveredNode] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  const clusterMeta = {
    all: { label: "Unified Graph", count: SKILL_NODES.length, icon: Network },
    mern: { label: "MERN Stack Cluster", count: 5, icon: Layers },
    ml: { label: "Machine Learning Cluster", count: 5, icon: BrainCircuit },
    sys: { label: "Systems & Cloud Cluster", count: 5, icon: Cpu },
  };

  // Filter nodes & edges
  const visibleNodes = useMemo(() => {
    if (activeCluster === "all") return SKILL_NODES;
    return SKILL_NODES.filter((n) => n.cluster === activeCluster);
  }, [activeCluster]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return SKILL_EDGES.filter((e) => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to));
  }, [visibleNodeIds]);

  // Find connected node IDs when hovering
  const connectedIds = useMemo(() => {
    if (!hoveredNode) return null;
    const ids = new Set([hoveredNode.id]);
    SKILL_EDGES.forEach((e) => {
      if (e.from === hoveredNode.id) ids.add(e.to);
      if (e.to === hoveredNode.id) ids.add(e.from);
    });
    return ids;
  }, [hoveredNode]);

  return (
    <section id="skills" className="relative py-28 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0b080c] overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 bg-[#8b5cf6] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c2a4ff]/20 bg-[#c2a4ff]/10 mb-3">
              <Network size={12} className="text-[#c2a4ff]" />
              <span className="text-[11px] font-mono tracking-wider text-[#c2a4ff] uppercase font-semibold">
                NEURAL TOPOLOGY // SYNERGY MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
              Skills as a Connected Graph
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/40 mt-1">
              Nodes sized by proficiency score · Weighted edges reflect actual architectural integration
            </p>
          </motion.div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
            {Object.entries(clusterMeta).map(([key, meta]) => {
              const Icon = meta.icon;
              const isActive = activeCluster === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCluster(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#c2a4ff]/20 text-white border border-[#c2a4ff]/40 shadow-sm"
                      : "text-white/45 hover:text-white"
                  }`}
                >
                  <Icon size={12} className={isActive ? "text-[#c2a4ff]" : "text-white/40"} />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Graph Canvas Container */}
        <div className="relative rounded-3xl border border-white/10 bg-[#09060e]/80 backdrop-blur-xl p-4 sm:p-6 overflow-hidden shadow-2xl">
          {/* Top Readout Tag */}
          <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-white/40">
            <span>Graph Coordinates: Proximity = Semantic Closeness</span>
            <AnimatePresence mode="wait">
              {hoveredNode ? (
                <motion.span
                  key={hoveredNode.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="text-[#c2a4ff] font-semibold"
                >
                  {hoveredNode.label} · Proficiency: {hoveredNode.level}% · Cluster: {hoveredNode.cluster.toUpperCase()}
                </motion.span>
              ) : (
                <span className="text-white/25">Hover any node to inspect weight & connections</span>
              )}
            </AnimatePresence>
          </div>

          {/* SVG Graph View */}
          <div className="relative w-full overflow-x-auto no-scrollbar">
            <svg
              viewBox="0 0 920 460"
              className="w-full min-w-[700px] h-[380px] md:h-[460px] select-none"
              style={{ overflow: "visible" }}
            >
              {/* Edges */}
              {visibleEdges.map((edge) => {
                const source = SKILL_NODES.find((n) => n.id === edge.from);
                const target = SKILL_NODES.find((n) => n.id === edge.to);
                if (!source || !target) return null;

                const isConnectedToHover = connectedIds && connectedIds.has(source.id) && connectedIds.has(target.id);
                const isDimmed = connectedIds && !isConnectedToHover;

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={source.cx}
                    y1={source.cy}
                    x2={target.cx}
                    y2={target.cy}
                    stroke={isConnectedToHover ? PALETTE.accent : "#c2a4ff"}
                    strokeWidth={isConnectedToHover ? 2 : 1}
                    strokeOpacity={isDimmed ? 0.05 : isConnectedToHover ? 0.75 : 0.18}
                    strokeDasharray={isConnectedToHover ? undefined : "3,3"}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Nodes */}
              {visibleNodes.map((node) => {
                // Radius strictly mapped to proficiency level (level 68 -> radius 18; level 95 -> radius 28)
                const radius = 17 + ((node.level - 65) / 35) * 11;
                const isHovered = hoveredNode?.id === node.id;
                const isConnected = connectedIds && connectedIds.has(node.id);
                const isDimmed = connectedIds && !isConnected;

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer transition-opacity duration-300"
                    opacity={isDimmed ? 0.25 : 1}
                  >
                    {/* Outer glow ring on hover/connected */}
                    {(isHovered || isConnected) && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={radius + 8}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        className={reducedMotion ? "" : "animate-pulse"}
                      />
                    )}

                    {/* Node Body */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={radius}
                      fill="#0d0814"
                      stroke={node.color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeOpacity={isHovered ? 1 : 0.7}
                      style={{ filter: isHovered ? `drop-shadow(0 0 10px ${node.color})` : "none" }}
                    />

                    {/* Node Core Indicator */}
                    <circle cx={node.cx} cy={node.cy - 6} r={3} fill={node.color} opacity={0.9} />

                    {/* Node Label Text */}
                    <text
                      x={node.cx}
                      y={node.cy + 5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="Geist, sans-serif"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {node.label}
                    </text>

                    {/* Proficiency Metric Subtext */}
                    <text
                      x={node.cx}
                      y={node.cy + 17}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="8.5"
                      fontFamily="monospace"
                      opacity="0.8"
                      className="pointer-events-none select-none"
                    >
                      {node.level}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Legend */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-white/40">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-[#c2a4ff] bg-[#c2a4ff]/20" />
                MERN Stack
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-[#ec4899] bg-[#ec4899]/20" />
                Machine Learning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-[#8b5cf6] bg-[#8b5cf6]/20" />
                Systems & Cloud
              </span>
            </div>
            <span className="text-white/30 text-[10px]">Node Size = Exact Proficiency Weight (68% - 95%)</span>
          </div>
        </div>
      </div>
    </section>
  );
}