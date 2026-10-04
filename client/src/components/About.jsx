import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  Code2,
  GraduationCap,
  Award,
  Zap,
  Flame,
  FileCode2,
  Workflow,
  Cpu,
  Copy,
  Check,
  SlidersHorizontal,
  Activity,
  Radar,
  Sparkles,
} from "lucide-react";

/* ----------------------------------------------------------------
   1. Magic UI Number Ticker (Smooth easeOutExpo)
---------------------------------------------------------------- */
function AnimatedNumber({ value, decimals = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now();
    let frame;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(value * ease);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
}

/* ----------------------------------------------------------------
   2. Dynamic Multi-Band Audio Equalizer (Uiverse AI Audio)
---------------------------------------------------------------- */
function AudioEqualizer({ active }) {
  const bars = [0.35, 0.75, 1, 0.55, 0.9, 0.45, 0.85, 0.6, 0.95, 0.4, 0.7];

  return (
    <div className="flex items-center gap-[2.5px] h-5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.2)]">
      {bars.map((scale, i) => (
        <motion.span
          key={i}
          animate={
            active
              ? {
                  scaleY: [0.2, scale * 1.5, 0.35, scale * 0.9, 0.2],
                  backgroundColor: [
                    "rgb(34, 211, 238)",
                    "rgb(168, 85, 247)",
                    "rgb(244, 63, 94)",
                    "rgb(34, 211, 238)",
                  ],
                }
              : { scaleY: 0.25, backgroundColor: "rgba(34, 211, 238, 0.45)" }
          }
          transition={{
            repeat: Infinity,
            duration: 0.75 + (i % 4) * 0.12,
            ease: "easeInOut",
          }}
          className="w-[2px] h-3.5 rounded-full origin-bottom"
        />
      ))}
      <span className="text-[9px] font-mono text-cyan-300 ml-1 font-semibold uppercase tracking-wider hidden sm:inline">
        {active ? "PROCESSING" : "READY"}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------
   3. Magic UI 3D Spotlight Card with Parallax Tilt & Specular Glare
---------------------------------------------------------------- */
function SpotlightStatCard({ stat, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, opacity: 1 });
    setTilt({
      rx: (y / rect.height - 0.5) * -16,
      ry: (x / rect.width - 0.5) * 16,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative group rounded-2xl p-5 border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
      >
        {/* HUD Corner Accents */}
        <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-white/20 select-none">┌</span>
        <span className="absolute top-1.5 right-1.5 text-[8px] font-mono text-white/20 select-none">┐</span>
        <span className="absolute bottom-1.5 left-1.5 text-[8px] font-mono text-white/20 select-none">└</span>
        <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono text-white/20 select-none">┘</span>

        {/* Specular Spotlight Light Flare */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${stat.spotlightColor}, transparent 75%)`,
          }}
        />

        {/* Ambient Corner Plasma Glow */}
        <div
          className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none ${stat.glowColor}`}
        />

        <div className="relative z-10 flex items-start justify-between mb-3.5" style={{ transform: "translateZ(30px)" }}>
          <div
            className={`p-2.5 rounded-xl bg-white/[0.05] border border-white/10 ${stat.iconColor} group-hover:scale-110 group-hover:shadow-[0_0_15px_currentColor] transition-all duration-300`}
          >
            {stat.icon}
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/50 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-colors">
            {stat.tag}
          </span>
        </div>

        <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-300">
              <AnimatedNumber value={stat.value} decimals={stat.decimals || 0} />
            </span>
            <span className={`text-2xl font-bold ${stat.iconColor}`}>{stat.suffix}</span>
          </div>
          <h4 className="text-sm font-semibold text-white/95 mt-1 tracking-wide">{stat.label}</h4>
          <p className="text-xs text-white/45 mt-0.5 leading-snug font-mono">{stat.sublabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   4. Interactive Neural Architecture Graph (SVG Synaptic Nodes)
---------------------------------------------------------------- */
function NeuralArchitectureGraph() {
  const nodes = [
    { id: "fe", label: "Client Frontend", sub: "React 19 / Tailwind", x: 60, y: 55, color: "#22d3ee" },
    { id: "be", label: "Micro-API Engine", sub: "Node / Express REST", x: 190, y: 55, color: "#a855f7" },
    { id: "db", label: "Distributed Store", sub: "MongoDB Persistence", x: 320, y: 55, color: "#10b981" },
    { id: "ml", label: "ML Scoring Core", sub: "XGBoost / Python", x: 190, y: 145, color: "#f43f5e" },
    { id: "ops", label: "Cloud Container", sub: "Docker / AWS Cluster", x: 320, y: 145, color: "#f59e0b" },
  ];

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-black/50 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
          <Workflow size={13} />
          Synaptic Architecture Flow
        </span>
        <span className="text-[10px] font-mono text-white/40">5 Active Microservices</span>
      </div>

      <div className="relative w-full overflow-x-auto no-scrollbar">
        <svg viewBox="0 0 380 200" className="w-full min-w-[340px] h-auto">
          <defs>
            <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="beam2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="beam3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="beam4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          <line x1="100" y1="55" x2="150" y2="55" stroke="url(#beam1)" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="230" y1="55" x2="280" y2="55" stroke="url(#beam2)" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="190" y1="80" x2="190" y2="120" stroke="url(#beam3)" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="230" y1="145" x2="280" y2="145" stroke="url(#beam4)" strokeWidth="2" strokeDasharray="4 2" />

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="22"
                fill={`${node.color}15`}
                stroke={node.color}
                strokeWidth="1.5"
              />
              <circle cx={node.x} cy={node.y} r="8" fill={node.color} />
              <text
                x={node.x}
                y={node.y - 28}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 34}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="7.5"
                fontFamily="monospace"
              >
                {node.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          End-to-End Latency: &lt; 22ms
        </span>
        <span className="text-purple-300">Throughput: 10,000 req/min</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   5. Raw JSON Payload Mode (Developer Telemetry Insight)
---------------------------------------------------------------- */
function RawJsonView() {
  const [copied, setCopied] = useState(false);

  const rawJson = `{
  "developer": "Omkar Patil",
  "status": "Available For Hire / SDE Roles",
  "classification": "Full-Stack Software Engineer & AI Builder",
  "education": {
    "degree": "B.E. Computer Science Engineering",
    "location": "Kolhapur, Maharashtra, India",
    "cgpa": 8.5,
    "gradYear": 2027
  },
  "core_competencies": {
    "frontend": ["React 19", "Tailwind CSS", "Vite", "Framer Motion"],
    "backend": ["Node.js", "Express", "RESTful APIs", "JWT", "Microservices"],
    "machine_learning": ["Python", "XGBoost", "Data Pipelines", "Model Serving"],
    "cloud_devops": ["Docker", "AWS", "Git / GitHub", "Vercel"],
    "mobile": ["Android Studio", "Kotlin", "Java"]
  },
  "flagship_creations": [
    {
      "name": "EduVerse",
      "type": "Career Intelligence Platform",
      "core": "Predicts campus placement readiness with ML scoring models"
    },
    {
      "name": "RepoGPT",
      "type": "AI Developer Tooling",
      "core": "Contextual code exploration with AST syntax parsing"
    }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative p-5 rounded-2xl bg-[#07050b] border border-white/10 font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
        <span className="text-cyan-300 flex items-center gap-1.5">
          <FileCode2 size={13} />
          omkar_patil_profile.json
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy JSON"}</span>
        </button>
      </div>

      <pre className="text-purple-200/90 overflow-x-auto max-h-[380px] leading-relaxed no-scrollbar select-all">
        {rawJson}
      </pre>
    </div>
  );
}

/* ----------------------------------------------------------------
   6. Comprehensive AI Copilot Knowledge Base
---------------------------------------------------------------- */
const KNOWLEDGE_BASE = [
  {
    keywords: ["stack", "tech", "technology", "skills", "tools", "languages"],
    title: "Full-Stack & AI Stack",
    answer:
      "Omkar's primary architectural stack is MERN (React 19, Node.js, Express, MongoDB), augmented with Python for AI/ML modeling (XGBoost, Scikit-learn, Pandas) and native Android engineering with Kotlin and Java. He builds cloud-ready services using Docker containers and AWS deployment pipelines.",
  },
  {
    keywords: ["eduverse", "project", "projects", "work", "built", "build"],
    title: "Flagship Architectures",
    answer:
      "• EduVerse: An end-to-end placement readiness intelligence suite that uses trained XGBoost machine learning models to analyze student profiles, forecast career placement probability, and pinpoint curriculum gaps.\n• RepoGPT: Context-aware coding assistant combining semantic context parsing with AST validation.\n• Distributed MERN Platforms: High-concurrency systems featuring secure JWT authentication, state management, and optimized database indexing.",
  },
  {
    keywords: ["ml", "machine learning", "ai", "xgboost", "model", "data science"],
    title: "Machine Learning Proficiency",
    answer:
      "Omkar bridges traditional software engineering with applied AI: designing robust data pipelines, feature engineering, training gradient-boosted decision trees (XGBoost), model serialization, and serving predictions through ultra-low latency REST endpoints.",
  },
  {
    keywords: ["education", "college", "degree", "cgpa", "study", "university", "kolhapur"],
    title: "Academic Background",
    answer:
      "Currently in his final year of B.E. in Computer Science & Engineering in Kolhapur, Maharashtra (Class of 2027) with a stellar 8.5 CGPA. His coursework emphasizes Algorithms, System Design, Operating Systems, and Distributed Computing.",
  },
  {
    keywords: ["hire", "available", "contact", "email", "reach", "job", "internship", "collaborate"],
    title: "Recruiting & Contact",
    answer:
      "Omkar is actively seeking Full-Stack Software Engineering (SDE) and AI/ML roles and internships. You can reach out immediately via the Contact section below, LinkedIn, GitHub, or his direct email!",
  },
  {
    keywords: ["who", "about", "bio", "omkar", "person"],
    title: "Profile Genesis",
    answer:
      "Omkar Patil is an engineer driven by high-impact problem solving. From writing scalable backends to training machine learning models and engineering intuitive interfaces, he treats code as high-precision craft.",
  },
];

function queryEngine(query, persona) {
  const q = query.toLowerCase();
  const match = KNOWLEDGE_BASE.find((entry) => entry.keywords.some((k) => q.includes(k)));
  let answer = match
    ? match.answer
    : "I catalog Omkar's full stack engineering, ML models, and project telemetry. Try asking about his 'tech stack', 'EduVerse', 'machine learning', or 'recruiting availability'!";

  if (persona === "recruiter") {
    answer = `⚡ [RECRUITER TL;DR]\n${answer}\n\n👉 Summary: Final-year CSE (8.5 CGPA), Production MERN + AI/ML (XGBoost), 5+ shipped projects, immediate availability.`;
  } else if (persona === "architect") {
    answer = `🏗️ [SYSTEM ARCHITECT VIEW]\n${answer}\n\n⚙️ Architecture Specs: Monorepo & Microservices architecture, stateless JWT auth, MongoDB indexing, Dockerized deployment on AWS.`;
  }

  return {
    title: match ? match.title : "Neural Response",
    answer,
  };
}

/* ----------------------------------------------------------------
   7. The Multi-Mode AI Command Station (Magic UI Border Beam)
---------------------------------------------------------------- */
function AICommandStation() {
  const [activeTab, setActiveTab] = useState("terminal");
  const [persona, setPersona] = useState("standard");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Neural Copilot v5.2 initialized. Query Omkar's production engineering, ML pipelines, or hiring readiness.",
      time: "12:00:00",
      title: "Kernel Synapse Active",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [tokenSpeed, setTokenSpeed] = useState(94);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, streamingText]);

  const handleSend = useCallback(
    (promptText) => {
      const q = (promptText || input).trim();
      if (!q || isTyping) return;

      const userMsg = {
        role: "user",
        text: q,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setStreamingText("");

      const responseObj = queryEngine(q, persona);
      const fullReply = responseObj.answer;

      const randomSpeed = Math.floor(88 + Math.random() * 20);
      setTokenSpeed(randomSpeed);

      setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          index += 2;
          setStreamingText(fullReply.slice(0, index));

          if (index >= fullReply.length) {
            clearInterval(interval);
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                role: "ai",
                text: fullReply,
                title: responseObj.title,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              },
            ]);
            setStreamingText("");
          }
        }, 16);
      }, 350);
    },
    [input, isTyping, persona]
  );

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const quickPills = [
    "⚡ Full Tech Stack?",
    "🚀 EduVerse Architecture?",
    "🧠 Machine Learning & XGBoost?",
    "🎓 Education & CGPA?",
    "💼 Availability for Roles?",
  ];

  return (
    <div className="relative rounded-3xl p-px overflow-hidden group shadow-2xl">
      {/* Magic UI Multi-Color Chromatic Border Beam */}
      <div
        className="absolute -inset-[180%] opacity-80 animate-beam-rotate pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #22d3ee 30deg, #a855f7 65deg, #f43f5e 100deg, transparent 150deg, transparent 360deg)",
        }}
      />

      <div className="relative rounded-3xl bg-[#09060f]/95 backdrop-blur-2xl border border-white/10 flex flex-col h-[610px] overflow-hidden">
        {/* Terminal HUD Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/10 gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span className="h-4 w-px bg-white/15 mx-1" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Cpu size={14} className="text-cyan-400" />
              <span>AI_OMKAR // CO-PILOT</span>
            </span>
          </div>

          {/* View Mode Switcher (shadcn style segmented pill) */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "terminal"
                  ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white border border-cyan-400/40 shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Terminal
            </button>
            <button
              onClick={() => setActiveTab("graph")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "graph"
                  ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white border border-cyan-400/40 shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Synapse Graph
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "json"
                  ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white border border-cyan-400/40 shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Raw JSON
            </button>
          </div>

          <AudioEqualizer active={isTyping} />
        </div>

        {/* Telemetry Sub-Ribbon */}
        <div className="px-5 py-1.5 bg-black/50 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-cyan-400">
              <Activity size={12} />
              <span>Model: Quantum-Omkar-v5.2</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-purple-300">Tokens/sec: {tokenSpeed}</span>
          </div>

          {/* Persona Selector */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal size={11} className="text-white/40" />
            <span className="text-white/30 text-[10px]">Filter:</span>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="bg-transparent text-cyan-300 text-[10px] outline-none cursor-pointer border-b border-cyan-400/30 font-mono"
            >
              <option value="standard" className="bg-[#0b080f] text-white">
                Standard
              </option>
              <option value="recruiter" className="bg-[#0b080f] text-white">
                Recruiter TL;DR
              </option>
              <option value="architect" className="bg-[#0b080f] text-white">
                System Architect
              </option>
            </select>
          </div>
        </div>

        {/* Main Content Area based on Tab */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === "graph" && (
            <div className="p-4 md:p-6 flex-1 overflow-y-auto ai-scroll">
              <NeuralArchitectureGraph />
            </div>
          )}

          {activeTab === "json" && (
            <div className="p-4 md:p-6 flex-1 overflow-y-auto ai-scroll">
              <RawJsonView />
            </div>
          )}

          {activeTab === "terminal" && (
            <>
              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4 font-mono ai-scroll">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      {m.role === "ai" ? (
                        <>
                          <span className="w-5 h-5 rounded-md bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                            <Cpu size={12} />
                          </span>
                          <span className="text-xs font-semibold text-cyan-300">{m.title || "Neural Copilot"}</span>
                        </>
                      ) : (
                        <span className="text-xs text-white/50">Recruiter / Guest</span>
                      )}
                      <span className="text-[10px] text-white/30">{m.time}</span>
                    </div>

                    <div
                      className={`relative group max-w-[90%] md:max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed whitespace-pre-line shadow-xl ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-purple-600/35 to-cyan-600/35 text-white border border-purple-400/40 rounded-tr-xs"
                          : "bg-white/[0.04] text-white/95 border border-white/10 backdrop-blur-md rounded-tl-xs"
                      }`}
                    >
                      {m.text}

                      {m.role === "ai" && (
                        <button
                          onClick={() => copyText(m.text, idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
                          title="Copy response"
                        >
                          {copiedIdx === idx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Streaming Response Animation */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                        <Cpu size={12} />
                      </span>
                      <span className="text-xs font-semibold text-purple-300">Generating Synaptic Response...</span>
                    </div>

                    <div className="max-w-[90%] md:max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed bg-white/[0.04] text-white/90 border border-purple-500/30 backdrop-blur-md rounded-tl-xs shadow-xl">
                      {streamingText ? (
                        <>
                          <span className="whitespace-pre-line">{streamingText}</span>
                          <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-cyan-300/80">
                          <span className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                          </span>
                          <span className="text-xs italic">Parsing candidate knowledge vector...</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Prompt Pills Bar */}
              <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-widest shrink-0 flex items-center gap-1 font-semibold">
                  <Sparkles size={11} />
                  Prompts:
                </span>
                {quickPills.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt.replace(/^[^\w]+/, ""))}
                    disabled={isTyping}
                    className="text-xs font-mono whitespace-nowrap px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/75 hover:text-cyan-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Terminal Query Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3.5 bg-black/70 border-t border-white/10 flex items-center gap-3 shrink-0"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shrink-0">
                  <Terminal size={14} />
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Query Omkar's AI twin (e.g. 'EduVerse architecture' or 'ML models')..."
                    disabled={isTyping}
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 font-mono transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-cyan-500/40 transition-all cursor-pointer shrink-0"
                >
                  <Send size={15} />
                </motion.button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   8. Interactive Tech Deep-Scan Hologram (Click any pill)
---------------------------------------------------------------- */
function TechDeepScanMatrix() {
  const [selectedTech, setSelectedTech] = useState({
    name: "React 19",
    category: "Frontend Core",
    proficiency: 95,
    role: "State orchestration, reactive hooks, concurrent rendering & high-speed SPA architectures.",
    flagship: "EduVerse Platform & Interactive Portfolio",
  });

  const techList = [
    {
      name: "React 19",
      category: "Frontend Core",
      proficiency: 95,
      role: "State orchestration, reactive hooks, concurrent rendering & high-speed SPA architectures.",
      flagship: "EduVerse Platform",
      color: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-400/40",
      textColor: "text-cyan-300",
    },
    {
      name: "Node.js",
      category: "Backend Engine",
      proficiency: 90,
      role: "Event-driven asynchronous microservices, REST APIs, and high-throughput network handling.",
      flagship: "Distributed Auth & API Gateways",
      color: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-400/40",
      textColor: "text-emerald-300",
    },
    {
      name: "MongoDB",
      category: "Data Storage",
      proficiency: 88,
      role: "Schema design, aggregation pipelines, document indexing, and distributed persistence.",
      flagship: "Student Profile Store & Career Analytics",
      color: "from-green-500/20 to-teal-500/20",
      border: "border-green-400/40",
      textColor: "text-green-300",
    },
    {
      name: "Express.js",
      category: "API Framework",
      proficiency: 88,
      role: "Middleware routing, rate-limiting, CORS, and stateless JWT authorization pipelines.",
      flagship: "EduVerse Micro-Services",
      color: "from-zinc-500/20 to-neutral-500/20",
      border: "border-zinc-400/40",
      textColor: "text-zinc-300",
    },
    {
      name: "Python",
      category: "AI & ML Modeling",
      proficiency: 92,
      role: "Model training, data preprocessing with Pandas/NumPy, algorithmic evaluation.",
      flagship: "Predictive Career Fit Engine",
      color: "from-amber-500/20 to-yellow-500/20",
      border: "border-amber-400/40",
      textColor: "text-amber-300",
    },
    {
      name: "XGBoost",
      category: "Machine Learning",
      proficiency: 90,
      role: "Gradient boosting classification, hyperparameter tuning, and decision tree ensembles.",
      flagship: "Placement Prediction Model",
      color: "from-orange-500/20 to-red-500/20",
      border: "border-orange-400/40",
      textColor: "text-orange-300",
    },
    {
      name: "Docker",
      category: "DevOps & Containers",
      proficiency: 84,
      role: "Multi-stage builds, container isolation, environment parity, and image orchestration.",
      flagship: "Containerized Web Services",
      color: "from-sky-500/20 to-blue-500/20",
      border: "border-sky-400/40",
      textColor: "text-sky-300",
    },
    {
      name: "AWS",
      category: "Cloud Infrastructure",
      proficiency: 80,
      role: "EC2 provisioning, S3 static assets storage, and cloud networking architectures.",
      flagship: "Cloud Deployment Pipeline",
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-400/40",
      textColor: "text-amber-300",
    },
    {
      name: "Kotlin",
      category: "Mobile Architecture",
      proficiency: 82,
      role: "Native Android development, Jetpack components, Coroutines, and MVVM design patterns.",
      flagship: "Android Utility & Campus Apps",
      color: "from-purple-500/20 to-violet-500/20",
      border: "border-purple-400/40",
      textColor: "text-purple-300",
    },
    {
      name: "Java",
      category: "OOP & Systems",
      proficiency: 86,
      role: "Robust Object-Oriented software architectures, threading, and DSA problem solving.",
      flagship: "DSA & Android Core Services",
      color: "from-rose-500/20 to-red-500/20",
      border: "border-rose-400/40",
      textColor: "text-rose-300",
    },
    {
      name: "TailwindCSS",
      category: "Design System",
      proficiency: 95,
      role: "Precision dark mode, micro-interactions, responsive grids, and design tokens.",
      flagship: "Ultra-Modern UI Design Systems",
      color: "from-teal-500/20 to-cyan-500/20",
      border: "border-teal-400/40",
      textColor: "text-teal-300",
    },
  ];

  return (
    <div className="rounded-3xl p-6 border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 font-bold">
          <Radar size={14} className="text-cyan-400" />
          Interactive Deep-Scan Matrix
        </span>
        <span className="text-[11px] font-mono text-white/40">Click any pill to inspect</span>
      </div>

      {/* Badges Grid */}
      <div className="flex flex-wrap gap-2 mb-5">
        {techList.map((t) => {
          const isSelected = selectedTech.name === t.name;
          return (
            <button
              key={t.name}
              onClick={() => setSelectedTech(t)}
              className={`text-xs font-mono px-3 py-1.5 rounded-xl border bg-gradient-to-r ${t.color} ${
                isSelected
                  ? `${t.border} ${t.textColor} ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105`
                  : "border-white/10 text-white/70 hover:border-white/20 hover:text-white"
              } transition-all duration-200 cursor-pointer select-none`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Holographic Deep-Scan Inspector Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTech.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-2xl bg-black/60 border border-cyan-500/25 relative overflow-hidden shadow-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                // {selectedTech.category}
              </span>
              <h4 className="text-base font-bold text-white tracking-wide">{selectedTech.name}</h4>
            </div>

            <div className="text-right font-mono">
              <span className="text-xs text-white/40 block">Proficiency</span>
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {selectedTech.proficiency}%
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed font-mono mb-3">{selectedTech.role}</p>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] font-mono">
            <span className="text-white/40">Primary Deployment:</span>
            <span className="text-purple-300 font-semibold">{selectedTech.flagship}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------------------------------
   9. Main About Component
---------------------------------------------------------------- */
export default function About() {
  const stats = [
    {
      label: "Projects Shipped",
      sublabel: "MERN, ML & Android",
      value: 5,
      suffix: "+",
      icon: <Code2 size={20} />,
      tag: "Codebase",
      iconColor: "text-purple-400",
      glowColor: "bg-purple-600",
      spotlightColor: "rgba(168, 85, 247, 0.22)",
    },
    {
      label: "Academic CGPA",
      sublabel: "B.E. Computer Science",
      value: 8.5,
      suffix: "/10",
      decimals: 1,
      icon: <GraduationCap size={20} />,
      tag: "Excellence",
      iconColor: "text-emerald-400",
      glowColor: "bg-emerald-600",
      spotlightColor: "rgba(16, 185, 129, 0.22)",
    },
    {
      label: "Certifications",
      sublabel: "Cloud, AI & Full-Stack",
      value: 5,
      suffix: "+",
      icon: <Award size={20} />,
      tag: "Credentials",
      iconColor: "text-cyan-400",
      glowColor: "bg-cyan-600",
      spotlightColor: "rgba(6, 182, 212, 0.22)",
    },
    {
      label: "Hackathons Won",
      sublabel: "Sprint Innovation & MVP",
      value: 2,
      suffix: "+",
      icon: <Flame size={20} />,
      tag: "Competitive",
      iconColor: "text-rose-400",
      glowColor: "bg-rose-600",
      spotlightColor: "rgba(244, 63, 94, 0.22)",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes beamRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-beam-rotate {
          animation: beamRotate 5s linear infinite;
        }

        .ai-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .ai-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .ai-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 9999px;
        }
        .ai-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section
        id="about"
        className="relative py-28 md:py-36 px-5 sm:px-8 md:px-16 bg-[#06040a] text-white overflow-hidden"
      >
        {/* Magic UI Dot Matrix Grid Background with Radial Fade */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(rgba(34, 211, 238, 0.9) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* Ambient Multi-Spectrum AI Glow Orbs */}
        <div className="absolute top-10 left-10 w-[550px] h-[550px] rounded-full blur-[160px] opacity-20 bg-purple-600 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 bg-cyan-600 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-10 bg-pink-600 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top HUD Telemetry Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Top Cybernetic Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-xs font-mono tracking-widest text-cyan-200 uppercase font-semibold">
                  SYSTEM KERNEL // PROFILE_DECRYPT.EXE
                </span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-mono text-purple-300">OMKAR PATIL</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight leading-tight">
                Architecting Autonomous Systems &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400">
                  Neural Web Experiences
                </span>
              </h2>
            </motion.div>

            {/* Live Telemetry Chips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2.5 font-mono text-xs text-white/50"
            >
              <div className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-white/80">Available For Hire</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 backdrop-blur-sm">
                <Cpu size={13} className="text-cyan-400" />
                <span className="text-white/80">B.E. CSE · Class of 2027</span>
              </div>
            </motion.div>
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Multi-Mode AI Command Station */}
            <div className="lg:col-span-7">
              <AICommandStation />

              {/* Mission Statement Strip under Terminal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-cyan-500/[0.02] to-transparent backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 shrink-0">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white/95">Engineering Without Compromise</h5>
                    <p className="text-xs text-white/45 font-mono">
                      Specialized in full-stack reactive applications, predictive ML models, and high-throughput systems.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-cyan-200 border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-500/25 hover:border-cyan-400/60 transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  Initialize Contact →
                </a>
              </motion.div>
            </div>

            {/* Right 5 Columns: 3D Hologram Stats & Deep-Scan Matrix */}
            <div className="lg:col-span-5 space-y-6">
              {/* 3D Holographic Stat Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <SpotlightStatCard key={stat.label} stat={stat} index={idx} />
                ))}
              </div>

              {/* Interactive Deep-Scan Tech Matrix */}
              <TechDeepScanMatrix />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
