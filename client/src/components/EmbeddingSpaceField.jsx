import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

/* ----------------------------------------------------------------
   Color Tokens (Strictly adhering to project palette)
   --color-aurora-1: #c2a4ff
   --color-aurora-2: #a855f7
   --color-aurora-3: #ec4899
   --color-aurora-4: #8b5cf6
   --color-ink: #0b080c
---------------------------------------------------------------- */
const PALETTE = {
  accent: "#c2a4ff",
  purple: "#a855f7",
  pink: "#ec4899",
  indigo: "#8b5cf6",
  bg: "#0b080c",
};

/* ----------------------------------------------------------------
   Embedding Space Vector Dataset
   High-dimensional vectors with precomputed 2D projection positions
   for 3 distinct algorithms:
   1. 'semantic' (t-SNE / UMAP clustering by domain)
   2. 'gradient' (Descent trajectory toward convergence)
   3. 'pipeline' (End-to-end ML & full-stack forward pass)
---------------------------------------------------------------- */
const RAW_VECTORS = [
  // Centroid (Anchor)
  {
    id: "omkar",
    label: "Omkar Patil",
    tag: "Centroid [0, 0]",
    cluster: "core",
    isCentroid: true,
    coords: {
      semantic: { x: 0.5, y: 0.5 },
      gradient: { x: 0.5, y: 0.5 },
      pipeline: { x: 0.5, y: 0.5 },
    },
    weight: 1.0,
    color: PALETTE.accent,
  },
  // Machine Learning & Data Cluster
  {
    id: "xgboost",
    label: "XGBoost",
    tag: "Gradient Boost Tree",
    cluster: "ml",
    coords: {
      semantic: { x: 0.28, y: 0.32 },
      gradient: { x: 0.38, y: 0.42 },
      pipeline: { x: 0.45, y: 0.30 },
    },
    weight: 0.92,
    color: PALETTE.pink,
  },
  {
    id: "python",
    label: "Python",
    tag: "Data & Modeling",
    cluster: "ml",
    coords: {
      semantic: { x: 0.22, y: 0.45 },
      gradient: { x: 0.32, y: 0.48 },
      pipeline: { x: 0.32, y: 0.35 },
    },
    weight: 0.95,
    color: PALETTE.pink,
  },
  {
    id: "eduverse",
    label: "EduVerse ML",
    tag: "Placement Predictor",
    cluster: "ml",
    coords: {
      semantic: { x: 0.35, y: 0.24 },
      gradient: { x: 0.44, y: 0.40 },
      pipeline: { x: 0.48, y: 0.22 },
    },
    weight: 0.90,
    color: PALETTE.pink,
  },
  {
    id: "pipeline",
    label: "Feature Pipeline",
    tag: "Data Ingestion",
    cluster: "ml",
    coords: {
      semantic: { x: 0.18, y: 0.28 },
      gradient: { x: 0.26, y: 0.38 },
      pipeline: { x: 0.20, y: 0.32 },
    },
    weight: 0.85,
    color: PALETTE.purple,
  },

  // Full-Stack Reactive Cluster
  {
    id: "react",
    label: "React 19",
    tag: "Concurrent Client",
    cluster: "web",
    coords: {
      semantic: { x: 0.74, y: 0.32 },
      gradient: { x: 0.62, y: 0.44 },
      pipeline: { x: 0.78, y: 0.50 },
    },
    weight: 0.95,
    color: PALETTE.accent,
  },
  {
    id: "nodejs",
    label: "Node.js",
    tag: "Async Runtime",
    cluster: "web",
    coords: {
      semantic: { x: 0.78, y: 0.46 },
      gradient: { x: 0.58, y: 0.52 },
      pipeline: { x: 0.65, y: 0.50 },
    },
    weight: 0.90,
    color: PALETTE.indigo,
  },
  {
    id: "express",
    label: "Express",
    tag: "REST API Microservice",
    cluster: "web",
    coords: {
      semantic: { x: 0.84, y: 0.36 },
      gradient: { x: 0.64, y: 0.56 },
      pipeline: { x: 0.62, y: 0.62 },
    },
    weight: 0.88,
    color: PALETTE.indigo,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    tag: "Document Store",
    cluster: "web",
    coords: {
      semantic: { x: 0.70, y: 0.56 },
      gradient: { x: 0.54, y: 0.58 },
      pipeline: { x: 0.18, y: 0.58 },
    },
    weight: 0.86,
    color: PALETTE.purple,
  },

  // Cloud & DevOps Cluster
  {
    id: "docker",
    label: "Docker",
    tag: "Container Engine",
    cluster: "infra",
    coords: {
      semantic: { x: 0.32, y: 0.76 },
      gradient: { x: 0.40, y: 0.62 },
      pipeline: { x: 0.80, y: 0.75 },
    },
    weight: 0.82,
    color: PALETTE.indigo,
  },
  {
    id: "aws",
    label: "AWS Cloud",
    tag: "Infrastructure",
    cluster: "infra",
    coords: {
      semantic: { x: 0.44, y: 0.82 },
      gradient: { x: 0.46, y: 0.66 },
      pipeline: { x: 0.88, y: 0.75 },
    },
    weight: 0.80,
    color: PALETTE.purple,
  },

  // Foundations & Systems
  {
    id: "dsa",
    label: "Algorithms / DSA",
    tag: "Discrete Optimization",
    cluster: "sys",
    coords: {
      semantic: { x: 0.60, y: 0.74 },
      gradient: { x: 0.52, y: 0.46 },
      pipeline: { x: 0.34, y: 0.68 },
    },
    weight: 0.85,
    color: PALETTE.accent,
  },
  {
    id: "kotlin",
    label: "Kotlin",
    tag: "Android Coroutines",
    cluster: "sys",
    coords: {
      semantic: { x: 0.72, y: 0.72 },
      gradient: { x: 0.56, y: 0.60 },
      pipeline: { x: 0.82, y: 0.35 },
    },
    weight: 0.82,
    color: PALETTE.pink,
  },
  {
    id: "cse",
    label: "B.E. CSE '27",
    tag: "8.5 CGPA Foundation",
    cluster: "sys",
    coords: {
      semantic: { x: 0.50, y: 0.85 },
      gradient: { x: 0.50, y: 0.72 },
      pipeline: { x: 0.50, y: 0.85 },
    },
    weight: 0.88,
    color: PALETTE.accent,
  },
];

/* ----------------------------------------------------------------
   Mathematical Utility: Euclidean Distance & Cosine Similarity
---------------------------------------------------------------- */
function getCosineSimilarity(v1, v2) {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y) || 1;
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y) || 1;
  return Math.max(0, Math.min(1, dot / (mag1 * mag2)));
}

export default function EmbeddingSpaceField() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // State
  const [projectionMode, setProjectionMode] = useState("semantic"); // 'semantic' | 'gradient' | 'pipeline'
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Physics positions for animated interpolation
  const currentPositionsRef = useRef({});

  // Check prefers-reduced-motion & mobile breakpoint
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Filter vectors responsively to guarantee peak 60fps on mobile
  const activeVectors = useMemo(() => {
    if (isMobile) {
      // Mobile: select essential 8 vectors
      return RAW_VECTORS.filter((v) =>
        ["omkar", "xgboost", "python", "react", "nodejs", "mongodb", "docker", "cse"].includes(v.id)
      );
    }
    return RAW_VECTORS;
  }, [isMobile]);

  // Handle Resize of Canvas container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, []);

  // Initialize positions
  useEffect(() => {
    activeVectors.forEach((v) => {
      if (!currentPositionsRef.current[v.id]) {
        const target = v.coords[projectionMode];
        currentPositionsRef.current[v.id] = {
          x: target.x * dimensions.width,
          y: target.y * dimensions.height,
          vx: 0,
          vy: 0,
        };
      }
    });
  }, [activeVectors, dimensions, projectionMode]);

  // Mouse Move listener
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Main Canvas Render Loop (Loss Contours + Force-Directed Relaxation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Support High-DPI Displays (Retina)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId;
    let clock = 0;

    const render = () => {
      clock += 0.015;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      /* -------------------------------------------------------------
         1. Draw Subtle Topographic Loss Contours (The Motif Isolines)
      ------------------------------------------------------------- */
      ctx.lineWidth = 0.75;
      const contourCount = isMobile ? 3 : 5;
      for (let i = 1; i <= contourCount; i++) {
        const radius = (dimensions.width * 0.12 * i) + (prefersReducedMotion ? 0 : Math.sin(clock * 0.5 + i) * 3);
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.35, radius * 0.85, 0.1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(194, 164, 255, ${0.035 + (contourCount - i) * 0.01})`;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Discrete Descent Vector Line (Gradient Mode)
      if (projectionMode === "gradient") {
        ctx.beginPath();
        ctx.moveTo(dimensions.width * 0.15, dimensions.height * 0.2);
        ctx.bezierCurveTo(
          dimensions.width * 0.35,
          dimensions.height * 0.25,
          dimensions.width * 0.45,
          dimensions.height * 0.4,
          cx,
          cy
        );
        ctx.strokeStyle = "rgba(236, 72, 153, 0.3)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      /* -------------------------------------------------------------
         2. Update Node Positions with Spring Relaxation Physics
      ------------------------------------------------------------- */
      const nodes = activeVectors.map((v) => {
        const target = v.coords[projectionMode];
        const tx = target.x * dimensions.width;
        const ty = target.y * dimensions.height;

        const current = currentPositionsRef.current[v.id] || { x: tx, y: ty, vx: 0, vy: 0 };

        if (!prefersReducedMotion) {
          // Spring physics toward target coordinate
          const spring = 0.08;
          const friction = 0.78;

          const dx = tx - current.x;
          const dy = ty - current.y;
          current.vx = (current.vx + dx * spring) * friction;
          current.vy = (current.vy + dy * spring) * friction;

          // Subtle cursor repulsion / gravitational displacement
          if (isHovering) {
            const mdx = current.x - mousePos.x;
            const mdy = current.y - mousePos.y;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);
            const maxDist = 110;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 3.5;
              current.vx += (mdx / dist) * force;
              current.vy += (mdy / dist) * force;
            }
          }

          // Gentle ambient float (confined to center)
          if (v.isCentroid) {
            current.vy += Math.sin(clock * 0.8) * 0.2;
          }

          current.x += current.vx;
          current.y += current.vy;
        } else {
          // Reduced motion: direct target placement
          current.x = tx;
          current.y = ty;
        }

        currentPositionsRef.current[v.id] = current;

        return {
          ...v,
          x: current.x,
          y: current.y,
        };
      });

      /* -------------------------------------------------------------
         3. Dynamic Query Vector (Cursor Cosine Similarity Filaments)
      ------------------------------------------------------------- */
      let nearestNodes = [];

      if (isHovering) {
        // Calculate similarity from cursor normalized coordinate to node normalized coords
        const cursorNorm = {
          x: (mousePos.x - cx) / cx,
          y: (mousePos.y - cy) / cy,
        };

        const scored = nodes
          .filter((n) => !n.isCentroid)
          .map((node) => {
            const nodeNorm = {
              x: (node.x - cx) / cx,
              y: (node.y - cy) / cy,
            };
            const sim = getCosineSimilarity(cursorNorm, nodeNorm);
            const dist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
            return { node, sim, dist };
          })
          .sort((a, b) => b.sim - a.sim);

        nearestNodes = scored.slice(0, 2);

        // Draw connective filaments to nearest vectors
        nearestNodes.forEach(({ node, sim }) => {
          ctx.beginPath();
          ctx.moveTo(mousePos.x, mousePos.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(194, 164, 255, ${0.15 + sim * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Midpoint similarity readout badge
          const midX = (mousePos.x + node.x) / 2;
          const midY = (mousePos.y + node.y) / 2;
          ctx.fillStyle = "rgba(11, 8, 12, 0.8)";
          ctx.fillRect(midX - 22, midY - 9, 44, 16);
          ctx.strokeStyle = "rgba(194, 164, 255, 0.3)";
          ctx.strokeRect(midX - 22, midY - 9, 44, 16);
          ctx.fillStyle = "#c2a4ff";
          ctx.font = "9px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`cos:${sim.toFixed(2)}`, midX, midY);
        });

        // Draw cursor query anchor
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#c2a4ff";
        ctx.shadowColor = "#c2a4ff";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      /* -------------------------------------------------------------
         4. Draw Inter-Node Semantic Cluster Edges
      ------------------------------------------------------------- */
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          // Draw edge if same cluster or connected to Centroid
          const sameCluster = a.cluster === b.cluster;
          const connectsCentroid = a.isCentroid || b.isCentroid;

          if (sameCluster || (connectsCentroid && !isMobile)) {
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const threshold = connectsCentroid ? dimensions.width * 0.38 : dimensions.width * 0.22;

            if (dist < threshold) {
              const alpha = (1 - dist / threshold) * (sameCluster ? 0.2 : 0.08);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.stroke();
            }
          }
        }
      }

      /* -------------------------------------------------------------
         5. Render Vector Embedding Points & Monospace Callouts
      ------------------------------------------------------------- */
      nodes.forEach((node) => {
        const isHovered = selectedNode?.id === node.id;
        const isConnected = nearestNodes.some((n) => n.node.id === node.id);
        const radius = node.isCentroid ? 7 : isHovered || isConnected ? 5.5 : 4;

        // Outer glow on highlight
        if (isHovered || isConnected || node.isCentroid) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}20`;
          ctx.fill();
        }

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered || node.isCentroid ? 12 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Vector Coordinate Label
        ctx.fillStyle = node.isCentroid ? "#ffffff" : isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.75)";
        ctx.font = `${node.isCentroid ? "bold 11px" : "10px"} Geist, sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x + radius + 6, node.y - 2);

        // Technical Sub-tag
        if (!isMobile || node.isCentroid) {
          ctx.fillStyle = "rgba(194, 164, 255, 0.4)";
          ctx.font = "8px monospace";
          ctx.fillText(node.tag, node.x + radius + 6, node.y + 9);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeVectors, dimensions, isHovering, mousePos, prefersReducedMotion, projectionMode, selectedNode, isMobile]);

  // Click on Canvas to select node
  const handleCanvasClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clicked = activeVectors.find((v) => {
      const pos = currentPositionsRef.current[v.id];
      if (!pos) return false;
      return Math.hypot(pos.x - clickX, pos.y - clickY) < 22;
    });

    setSelectedNode(clicked || null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      onClick={handleCanvasClick}
      className="relative w-full h-[520px] md:h-[600px] rounded-3xl bg-[#0b080c] border border-white/10 overflow-hidden select-none"
    >
      {/* HTML5 Canvas for 60fps Line & Force Computations */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a4ff]" />
          <span className="text-[10px] font-mono tracking-widest text-[#c2a4ff] uppercase font-semibold">
            LATENT SPACE // DIM: ℝ⁷⁶⁸ → ℝ²
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
          <Compass size={11} className="text-[#c2a4ff]" />
          <span>Metric: Cosine Distance</span>
        </div>
      </div>

      {/* Bottom Interactive Projection Mode Switcher */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        {/* Mode Selector Pill Buttons */}
        <div className="flex items-center p-1 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setProjectionMode("semantic");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              projectionMode === "semantic"
                ? "bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-white border border-[#c2a4ff]/50 shadow-sm"
                : "text-white/45 hover:text-white"
            }`}
          >
            t-SNE Clusters
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setProjectionMode("gradient");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              projectionMode === "gradient"
                ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border border-[#ec4899]/50 shadow-sm"
                : "text-white/45 hover:text-white"
            }`}
          >
            Loss Gradient
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setProjectionMode("pipeline");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              projectionMode === "pipeline"
                ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-[#8b5cf6]/50 shadow-sm"
                : "text-white/45 hover:text-white"
            }`}
          >
            Inference Pass
          </button>
        </div>

        {/* Selected Node Inspector Flyout */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-2xl bg-black/85 border border-[#c2a4ff]/40 backdrop-blur-xl flex items-center gap-3 shadow-2xl z-30"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 10px ${selectedNode.color}` }}
              />
              <div className="font-mono text-xs">
                <span className="text-white font-bold block">{selectedNode.label}</span>
                <span className="text-white/50 text-[10px]">{selectedNode.tag}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(null);
                }}
                className="text-white/40 hover:text-white text-xs px-1.5 py-0.5 ml-2 cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <span className="text-[10px] font-mono text-white/30 hidden lg:inline">
          Move cursor to project query vector q →
        </span>
      </div>

      {/* Cyberpunk HUD Corner Marks */}
      <span className="absolute top-2 left-2 text-[9px] font-mono text-white/20 select-none">┌</span>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-white/20 select-none">┐</span>
      <span className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20 select-none">└</span>
      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20 select-none">┘</span>
    </div>
  );
}
