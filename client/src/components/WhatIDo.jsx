import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

function CircuitCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let nodes = [];
    let pulses = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    function buildGrid() {
      nodes = [];
      const cols = 10, rows = 6;
      for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) nodes.push({ x: (canvas.width / cols) * i, y: (canvas.height / rows) * j });
      pulses = Array.from({ length: 12 }, spawnPulse);
    }
    function spawnPulse() {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      const colors = ["#34d399", "#22d3ee", "#a78bfa"];
      return { a, b, t: 0, speed: 0.005 + Math.random() * 0.012, color: colors[Math.floor(Math.random() * colors.length)] };
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(167,139,250,0.06)";
      ctx.lineWidth = 1;
      const cols = 10, rows = 6;
      for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo((canvas.width / cols) * i, 0); ctx.lineTo((canvas.width / cols) * i, canvas.height); ctx.stroke(); }
      for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, (canvas.height / rows) * j); ctx.lineTo(canvas.width, (canvas.height / rows) * j); ctx.stroke(); }
      pulses.forEach((p, idx) => {
        p.t += p.speed;
        if (p.t >= 1) { pulses[idx] = spawnPulse(); return; }
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animId = requestAnimationFrame(draw);
    }
    resize(); buildGrid(); draw();
    window.addEventListener("resize", () => { resize(); buildGrid(); });
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

// A palette that mixes across all cards so bursts feel varied and rich
const SPARK_PALETTE = ["#34d399", "#22d3ee", "#a78bfa", "#ec4899", "#fbbf24", "#f472b6", "#60a5fa"];

function BurstBlock({ children, fire, seed = 0, distance = 40 }) {
  const angle = ((seed * 137.5) % 360); // golden-angle spread for even but varied directions
  const dist = distance + (seed % 3) * 12;
  const color = SPARK_PALETTE[seed % SPARK_PALETTE.length];

  return (
    <motion.div
      animate={
        fire
          ? {
              x: [0, Math.cos((angle * Math.PI) / 180) * dist, 0],
              y: [0, Math.sin((angle * Math.PI) / 180) * dist, 0],
              rotate: [0, seed % 2 === 0 ? 12 : -12, 0],
              scale: [1, 1.08, 1],
              filter: ["brightness(1)", `brightness(1.3) drop-shadow(0 0 14px ${color})`, "brightness(1)"],
            }
          : { x: 0, y: 0, rotate: 0, scale: 1, filter: "brightness(1)" }
      }
      transition={{ duration: 0.9, ease: ["easeOut", "easeIn"], times: [0, 0.45, 1], delay: fire ? seed * 0.035 : 0 }}
    >
      {children}
    </motion.div>
  );
}

function FirecrackerText({ text, fire }) {
  const letters = text.split("");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {letters.map((ch, i) => {
        const angle = (i * 47) % 360;
        const dist = 26 + ((i * 13) % 40);
        const color = SPARK_PALETTE[i % SPARK_PALETTE.length];
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            animate={
              fire
                ? {
                    x: [0, Math.cos((angle * Math.PI) / 180) * dist, 0],
                    y: [0, Math.sin((angle * Math.PI) / 180) * dist, 0],
                    color: [undefined, color, undefined],
                    textShadow: ["none", `0 0 12px ${color}`, "none"],
                    scale: [1, 1.3, 1],
                  }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.9, ease: ["easeOut", "easeIn"], times: [0, 0.45, 1], delay: fire ? i * 0.02 : 0 }}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}

function DoCard({ card, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [fired, setFired] = useState(false);
  const Icon = card.icon;

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  const handleEnter = () => {
    setHover(true);
    setFired(true);
    setTimeout(() => setFired(false), 1000);
  };
  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: fired ? [1, 1.06, 1] : 1 }}
        transition={
          fired
            ? { scale: { type: "spring", stiffness: 300, damping: 10 }, rotateX: { type: "spring", stiffness: 60, damping: 25 }, rotateY: { type: "spring", stiffness: 60, damping: 25 } }
            : { type: "spring", stiffness: 60, damping: 25, mass: 1.2 }
        }
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl p-[1.5px] overflow-hidden cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: `conic-gradient(from 0deg, ${card.colors[0]}, ${card.colors[1]}, ${card.colors[2]}, transparent, ${card.colors[0]})` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative rounded-2xl bg-[#0b080c]/95 backdrop-blur-sm p-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: hover ? 0.6 : 0, background: `radial-gradient(circle at 50% 20%, ${card.colors[0]}22, transparent 70%)` }}
          />

          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center gap-3 mb-4">
              <BurstBlock fire={fired} seed={0} distance={34}>
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.colors[0]}20`, boxShadow: hover ? `0 0 24px -4px ${card.colors[0]}` : "none" }}
                  animate={hover ? { scale: 1.1, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={20} style={{ color: card.colors[0] }} />
                </motion.div>
              </BurstBlock>

              <h3
                className="text-2xl font-bold font-display"
                style={
                  fired
                    ? {}
                    : { backgroundImage: `linear-gradient(90deg, ${card.colors[0]}, ${card.colors[1]}, ${card.colors[2]})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
                }
              >
                <FirecrackerText text={card.title} fire={fired} />
              </h3>
            </div>

            <BurstBlock fire={fired} seed={2} distance={30}>
              <p className="text-white/40 text-sm mb-4">{card.subtitle}</p>
            </BurstBlock>

            <BurstBlock fire={fired} seed={4} distance={36}>
              <p className="text-white/60 leading-relaxed mb-6">{card.desc}</p>
            </BurstBlock>

            <BurstBlock fire={fired} seed={6} distance={24}>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-mono">Skillset & tools</p>
            </BurstBlock>

            <div className="flex flex-wrap gap-2">
              {card.skills.map((s, i) => (
                <BurstBlock key={s} fire={fired} seed={8 + i} distance={38}>
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border transition-colors duration-300 inline-block"
                    style={{ borderColor: hover ? `${card.colors[0]}60` : "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                  >
                    {s}
                  </span>
                </BurstBlock>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhatIDo() {
  const cards = [
    {
      title: "FULL-STACK DEV",
      subtitle: "Modern web development & scalable applications",
      desc: "Building responsive and performant web applications using React, Node.js, and MongoDB. Creating seamless user experiences with modern UI/UX principles.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      icon: Code2,
      colors: ["#34d399", "#22d3ee", "#a78bfa"],
    },
    {
      title: "ML ENTHUSIAST",
      subtitle: "Exploring intelligent systems & data-driven solutions",
      desc: "Working with machine learning pipelines, model training, and data analysis using Python. Building predictive systems like EduVerse's placement readiness engine.",
      skills: ["Python", "XGBoost", "Pandas", "Scikit-learn"],
      icon: Sparkles,
      colors: ["#a78bfa", "#ec4899", "#22d3ee"],
    },
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 bg-emerald-500 pointer-events-none animate-aurora" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] opacity-20 bg-violet-500 pointer-events-none animate-aurora-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[140px] opacity-15 bg-cyan-400 pointer-events-none" />
      <CircuitCanvas />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative mb-16">
          <h2 className="text-6xl md:text-8xl font-bold font-display text-white/5 select-none leading-none">
            WHAT I DO
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 -mt-16 md:-mt-24">
          {cards.map((card, i) => (
            <DoCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}