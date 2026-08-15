import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Send, Mail, Copy, Check, Radio, Shield, Lock, Zap, CheckCircle2, User, MessageSquare } from "lucide-react";

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
      const cols = 9, rows = 6;
      for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) nodes.push({ x: (canvas.width / cols) * i, y: (canvas.height / rows) * j });
      pulses = Array.from({ length: 10 }, spawnPulse);
    }
    function spawnPulse() {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      const colors = ["#34d399", "#22d3ee", "#a78bfa"];
      return { a, b, t: 0, speed: 0.005 + Math.random() * 0.012, color: colors[Math.floor(Math.random() * colors.length)] };
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(52,211,153,0.07)";
      ctx.lineWidth = 1;
      const cols = 9, rows = 6;
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />;
}

function ParticleBurst({ trigger }) {
  const particles = useRef(Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (360 / 24) * i,
    dist: 80 + Math.random() * 60,
    color: ["#34d399", "#22d3ee", "#a78bfa", "#fbbf24"][i % 4],
  }))).current;

  if (!trigger) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: p.color, boxShadow: `0 0 8px 2px ${p.color}` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function analyzeTone(text) {
  if (!text || text.length < 3) return null;
  const excited = /[!]{1,}/.test(text);
  const question = /\?/.test(text);
  if (excited) return { label: "Enthusiastic", color: "#fbbf24" };
  if (question) return { label: "Inquisitive", color: "#22d3ee" };
  if (text.length > 120) return { label: "Detailed", color: "#a78bfa" };
  return { label: "Clear & Direct", color: "#34d399" };
}

function FloatingField({ label, name, value, onChange, type = "text", textarea = false, focusColor, showTone, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const Tag = textarea ? "textarea" : "input";
  const tone = showTone ? analyzeTone(value) : null;

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" style={{ opacity: textarea ? 0 : 1 }}>
        <Icon size={16} style={{ color: focused ? focusColor : "rgba(255,255,255,0.3)" }} />
      </div>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className={`peer w-full ${textarea ? "px-4" : "pl-11 pr-4"} pt-6 pb-2 rounded-xl bg-white/[0.04] border text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none`}
        style={{
          borderColor: focused ? focusColor : "rgba(255,255,255,0.1)",
          boxShadow: focused ? `0 0 25px -8px ${focusColor}, inset 0 0 20px -12px ${focusColor}` : "none",
        }}
        placeholder={label}
      />
      <motion.label
        animate={{
          top: focused || hasValue ? 8 : textarea ? 20 : "50%",
          left: focused || hasValue ? 16 : textarea ? 16 : 44,
          fontSize: focused || hasValue ? "0.7rem" : "0.9rem",
          y: focused || hasValue ? 0 : textarea ? 0 : "-50%",
          color: focused ? focusColor : "rgba(255,255,255,0.35)",
        }}
        transition={{ duration: 0.2 }}
        className="absolute pointer-events-none font-medium"
      >
        {label}
      </motion.label>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${focusColor}, transparent)` }}
        initial={{ width: 0 }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35 }}
      />
      <AnimatePresence>
        {tone && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-6 right-0 flex items-center gap-1.5 text-[10px] font-mono"
            style={{ color: tone.color }}
          >
            <Zap size={10} />
            AI tone: {tone.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TransmissionStatus() {
  const messages = ["CHANNEL OPEN", "AWAITING TRANSMISSION", "ENCRYPTED · SECURE"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2400);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center gap-2 font-mono text-xs text-emerald-300/70">
      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <Radio size={12} />
      </motion.span>
      <motion.span key={index} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {messages[index]}
      </motion.span>
    </div>
  );
}

const DEPLOY_STEPS = [
  { label: "Validating input", icon: Shield },
  { label: "Encrypting payload", icon: Lock },
  { label: "Transmitting", icon: Zap },
  { label: "Delivered", icon: CheckCircle2 },
];

function DeploySequence({ step }) {
  return (
    <div className="space-y-2.5 font-mono text-xs">
      {DEPLOY_STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = i < step;
        const active = i === step;
        return (
          <motion.div key={s.label} initial={{ opacity: 0.3 }} animate={{ opacity: done || active ? 1 : 0.3 }} className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full"
              style={{ background: done ? "#34d39930" : active ? "#22d3ee20" : "transparent", border: `1px solid ${done ? "#34d399" : active ? "#22d3ee" : "rgba(255,255,255,0.15)"}` }}
            >
              {active && !done ? (
                <motion.span className="w-2 h-2 rounded-full bg-cyan-300" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.0, repeat: Infinity }} />
              ) : (
                <Icon size={11} color={done ? "#34d399" : "rgba(255,255,255,0.4)"} />
              )}
            </span>
            <span style={{ color: done ? "#34d399" : active ? "#22d3ee" : "rgba(255,255,255,0.4)" }}>{s.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [deployStep, setDeployStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(false);
  const email = "op8686627@gmail.com";

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -4, y: px * 4 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setDeployStep(0);
    const stepTimer = setInterval(() => setDeployStep((s) => (s < 2 ? s + 1 : s)), 500);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      clearInterval(stepTimer);
      setDeployStep(3);
      setTimeout(() => {
        setStatus("success");
        setBurst(true);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setBurst(false), 1000);
      }, 500);
    } catch (err) {
      clearInterval(stepTimer);
      setStatus("error");
      toast.error("Transmission failed. Try again.");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-emerald-500 pointer-events-none animate-aurora" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 bg-violet-500 pointer-events-none animate-aurora-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15 bg-cyan-400 pointer-events-none" />
      <CircuitCanvas />

      <div className="relative z-10 max-w-xl mx-auto" style={{ perspective: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-emerald-400 font-mono text-sm tracking-wider mb-3">// CONTACT.connect()</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h2>
          <TransmissionStatus />
        </motion.div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 mx-auto mt-8 mb-8 px-4 py-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 text-emerald-300 text-sm font-mono shadow-[0_0_20px_-8px_rgba(52,211,153,0.6)]"
        >
          <Mail size={14} />
          {email}
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={14} /></motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={14} /></motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={resetTilt}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 60, damping: 25, mass: 1.2 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-3xl p-[1.5px] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "conic-gradient(from 0deg, #34d399, #22d3ee, #a78bfa, transparent, #34d399)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative space-y-6 p-8 rounded-3xl bg-[#0b080c]/95 backdrop-blur-xl overflow-hidden"
          >
            <ParticleBurst trigger={burst} />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, #34d399, #34d399 1px, transparent 1px, transparent 3px)" }}
            />

            <FloatingField label="Your Name" name="name" value={formData.name} onChange={handleChange} focusColor="#34d399" icon={User} />
            <FloatingField label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} focusColor="#22d3ee" icon={Mail} />
            <FloatingField label="Your Message" name="message" value={formData.message} onChange={handleChange} textarea focusColor="#a78bfa" showTone icon={MessageSquare} />

            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div key="deploy" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-2">
                    <DeploySequence step={deployStep} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white py-3.5 rounded-xl font-medium overflow-hidden disabled:opacity-70 shadow-[0_0_30px_-8px_rgba(52,211,153,0.5)]"
            >
              {status === "loading" && (
                <motion.div className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Send size={18} />
                {status === "loading" ? "Processing..." : "Send Message"}
              </span>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}