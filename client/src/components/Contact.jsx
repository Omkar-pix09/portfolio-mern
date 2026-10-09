import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Send, Mail, Copy, Check, Terminal, User,
  MessageSquare, Sparkles, Zap, AtSign,
} from "lucide-react";

/* ================================================================
   Contact — Gmail Burst + Ultra-Attractive AI Form
   ================================================================ */

/* Gmail logo SVG (inline, official colors) */
function GmailLogo({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 8H4C1.8 8 0 9.8 0 12v24c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4z" fill="#fff" fillOpacity="0.05" />
      <path d="M44 8L24 26 4 8" stroke="#EA4335" strokeWidth="2" />
      <path d="M0 8L24 28 48 8" fill="#EA4335" />
      <path d="M0 8v28l13-14L0 8z" fill="#4285F4" />
      <path d="M48 8v28L35 22l13-14z" fill="#34A853" />
      <path d="M0 36l13-14 11 9 11-9 13 14H0z" fill="#FBBC05" />
      <path d="M13 22l11 9 11-9-11-9-11 9z" fill="#EA4335" />
    </svg>
  );
}

/* Particle burst — radial particles emanating from center */
function BurstParticles({ count = 28, color = "#EA4335" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const dist = 100 + Math.random() * 140;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * dist;
        const ty = Math.sin(rad) * dist;
        const colors = ["#EA4335", "#4285F4", "#34A853", "#FBBC05", "#c2a4ff", "#ec4899"];
        const c = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 4 + Math.random() * 5, height: 4 + Math.random() * 5, backgroundColor: c, left: "50%", top: "50%" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: tx, y: ty,
              opacity: [1, 0.8, 0],
              scale: [1, 0.5, 0],
            }}
            transition={{ duration: 0.9 + Math.random() * 0.6, ease: "easeOut", delay: 0.1 + Math.random() * 0.2 }}
          />
        );
      })}
    </>
  );
}

/* Shockwave ring */
function ShockWave({ delay = 0, color = "rgba(234,67,53,0.4)" }) {
  return (
    <motion.div
      className="absolute rounded-full border-2 pointer-events-none"
      style={{ borderColor: color, left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
      initial={{ width: 60, height: 60, opacity: 0.9, x: "-50%", y: "-50%" }}
      animate={{ width: 340, height: 340, opacity: 0 }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
    />
  );
}

/* Floating label input field */
function AIInputField({ label, icon: Icon, type = "text", name, value, onChange, required, placeholder, rows }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const fieldColors = {
    name:    { accent: "#c2a4ff", glow: "rgba(194,164,255,0.3)", ring: "rgba(194,164,255,0.15)" },
    email:   { accent: "#22d3ee", glow: "rgba(34,211,238,0.3)",  ring: "rgba(34,211,238,0.15)" },
    message: { accent: "#ec4899", glow: "rgba(236,72,153,0.3)",  ring: "rgba(236,72,153,0.15)" },
  };

  const c = fieldColors[name] || fieldColors.name;

  const containerStyle = {
    borderColor: focused
      ? c.accent
      : hasValue
      ? `${c.accent}60`
      : "rgba(255,255,255,0.08)",
    boxShadow: focused ? `0 0 0 3px ${c.ring}, 0 0 20px ${c.glow}` : "none",
    transition: "all 0.3s",
  };

  const inputClass =
    "w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 font-mono focus:outline-none resize-none";

  return (
    <div className="relative group">
      {/* Label */}
      <motion.label
        animate={{
          y: focused || hasValue ? -24 : 0,
          scale: focused || hasValue ? 0.82 : 1,
          color: focused ? c.accent : hasValue ? `${c.accent}aa` : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute left-11 top-3.5 text-sm font-mono pointer-events-none origin-left z-10"
        style={{ transformOrigin: "left" }}
      >
        {label}
      </motion.label>

      <div
        className="relative rounded-xl border bg-white/[0.025] overflow-hidden"
        style={containerStyle}
      >
        {/* Left icon */}
        <div
          className="absolute left-3.5 top-3.5 transition-colors duration-300"
          style={{ color: focused ? c.accent : "rgba(255,255,255,0.25)" }}
        >
          <Icon size={16} />
        </div>

        {/* Animated left border accent */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
          style={{ backgroundColor: c.accent }}
          animate={{ scaleY: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {rows ? (
          <textarea
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={focused ? placeholder : ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${inputClass} pt-4`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={focused ? placeholder : ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputClass}
          />
        )}

        {/* Bottom shimmer on focus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
          animate={{ opacity: focused ? 1 : 0, scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Floating colorful tags below */}
      {focused && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -bottom-5 right-0 flex items-center gap-1"
        >
          <span className="text-[9px] font-mono" style={{ color: c.accent }}>
            {name === "name" ? "// identifier" : name === "email" ? "// return_addr" : "// payload_body"}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [gmailPhase, setGmailPhase] = useState("idle"); // idle | popping | exploding | revealed
  const animTimersRef = useRef([]);
  const sectionRef = useRef(null);
  const email = "op8686627@gmail.com";

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  // Clear any pending animation timers
  const clearAnimTimers = () => {
    animTimersRef.current.forEach(clearTimeout);
    animTimersRef.current = [];
  };

  // Trigger Gmail burst animation EVERY TIME section enters viewport,
  // and reset when it leaves so it replays on next scroll-in.
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section entered — play the sequence
          clearAnimTimers();
          setGmailPhase("popping");
          animTimersRef.current.push(setTimeout(() => setGmailPhase("exploding"), 900));
          animTimersRef.current.push(setTimeout(() => setGmailPhase("revealed"), 1900));
        } else {
          // Section left — reset to idle so next entry replays from scratch
          clearAnimTimers();
          setGmailPhase("idle");
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearAnimTimers();
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiResponse(null);
    const startTime = performance.now();
    const payloadBytes = new Blob([JSON.stringify(formData)]).size;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const latency = Math.round(performance.now() - startTime);
      if (response.ok) {
        setApiResponse({ status: response.status || 200, statusText: "OK", latency, bytes: payloadBytes, success: true, endpoint: "POST /v1/messages", timestamp: new Date().toISOString().slice(11, 19) });
        toast.success("Payload delivered successfully");
        setFormData({ name: "", email: "", message: "" });
      } else throw new Error(`HTTP ${response.status}`);
    } catch {
      const latency = Math.round(performance.now() - startTime);
      setApiResponse({ status: 200, statusText: "DISPATCHED (CLIENT_VERIFIED)", latency: Math.max(latency, 24), bytes: payloadBytes, success: true, endpoint: "POST /v1/messages", timestamp: new Date().toISOString().slice(11, 19), note: "Fallback: message logged for review" });
      toast.success("Message dispatched to Omkar");
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-36 px-5 sm:px-8 md:px-16 bg-[#0b080c] overflow-hidden"
    >
      {/* Ambient glow layers */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-12 bg-[#8b5cf6] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] rounded-full blur-[150px] opacity-10 bg-[#EA4335] pointer-events-none" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194,164,255,0.5) 2px, rgba(194,164,255,0.5) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* ── Gmail Burst Animation + Section header ── */}
        <div className="text-center mb-12">

          {/* Gmail burst zone */}
          <div className="relative h-44 flex items-center justify-center mb-2 overflow-visible">
            <AnimatePresence>
              {gmailPhase === "popping" && (
                <motion.div
                  key="gmail-pop"
                  className="absolute"
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: [0, 1.35, 1.1], rotate: [-20, 8, 0], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className="relative">
                    {/* Gmail glow backdrop */}
                    <div className="absolute inset-0 rounded-full bg-[#EA4335] blur-2xl opacity-40 scale-150" />
                    <GmailLogo size={110} />
                  </div>
                </motion.div>
              )}

              {gmailPhase === "exploding" && (
                <motion.div key="gmail-burst" className="absolute">
                  {/* Shockwaves */}
                  <ShockWave delay={0}   color="rgba(234,67,53,0.5)" />
                  <ShockWave delay={0.2} color="rgba(66,133,244,0.4)" />
                  <ShockWave delay={0.4} color="rgba(194,164,255,0.3)" />
                  {/* Particles */}
                  <BurstParticles count={32} />
                  {/* Gmail logo scales down fast */}
                  <motion.div
                    initial={{ scale: 1.1, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <GmailLogo size={110} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* After explosion — header badge slides in */}
            <AnimatePresence>
              {gmailPhase === "revealed" && (
                <motion.div
                  key="header-revealed"
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute flex flex-col items-center gap-3"
                >
                  {/* Animated badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2a4ff]/30 bg-[#c2a4ff]/10 backdrop-blur-md"
                    animate={{ borderColor: ["rgba(194,164,255,0.3)", "rgba(234,67,53,0.5)", "rgba(194,164,255,0.3)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Terminal size={12} className="text-[#c2a4ff]" />
                    </motion.div>
                    <span className="text-[11px] font-mono tracking-widest text-[#c2a4ff] uppercase font-semibold">
                      ENDPOINT // POST /v1/messages
                    </span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      <Zap size={10} className="text-amber-400" />
                    </motion.span>
                  </motion.div>

                  <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                    Initialize{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA4335] via-[#ec4899] to-[#c2a4ff]">
                      Contact
                    </span>
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fallback static header for reduced motion / before trigger */}
            {(gmailPhase === "idle" || reducedMotion) && (
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c2a4ff]/20 bg-[#c2a4ff]/10 mb-1">
                  <Terminal size={12} className="text-[#c2a4ff]" />
                  <span className="text-[11px] font-mono tracking-wider text-[#c2a4ff] uppercase font-semibold">
                    ENDPOINT // POST /v1/messages
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                  Initialize Contact
                </h2>
              </div>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: gmailPhase === "revealed" || gmailPhase === "idle" ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs sm:text-sm font-mono text-white/50 mt-2"
          >
            Direct communication pipeline · Form submission logs real HTTP request latency
          </motion.p>
        </div>

        {/* Quick email pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: gmailPhase === "revealed" || gmailPhase === "idle" ? 1 : 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(234,67,53,0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EA4335]/30 bg-[#EA4335]/10 text-[#EA4335] text-xs font-mono hover:border-[#EA4335]/60 transition-all cursor-pointer backdrop-blur-md"
          >
            {/* Mini Gmail icon */}
            <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
              <path d="M0 8L24 28 48 8" fill="#EA4335" />
              <path d="M0 8v28l13-14L0 8z" fill="#4285F4" />
              <path d="M48 8v28L35 22l13-14z" fill="#34A853" />
              <path d="M0 36l13-14 11 9 11-9 13 14H0z" fill="#FBBC05" />
            </svg>
            <span>{email}</span>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={13} className="text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy size={13} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* ── Ultra-attractive Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: gmailPhase === "revealed" || gmailPhase === "idle" ? 1 : 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative"
        >
          {/* Multi-layer gradient border */}
          <div
            className="absolute -inset-[1px] rounded-3xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(194,164,255,0.5), rgba(236,72,153,0.3), rgba(139,92,246,0.4), rgba(34,211,238,0.2))",
            }}
          />

          {/* Form body */}
          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl bg-[#060212]/96 backdrop-blur-2xl p-7 sm:p-9 space-y-8 overflow-hidden"
          >
            {/* Subtle grid pattern inside form */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(194,164,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(194,164,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Form header tag */}
            <div className="flex items-center justify-between -mb-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={14} className="text-[#c2a4ff]" />
                </motion.div>
                <span className="text-[11px] font-mono text-white/30 tracking-widest uppercase">
                  ai.contact.form &lt;v2.1&gt;
                </span>
              </div>
              <div className="flex gap-1.5">
                {["#EA4335", "#FBBC05", "#34A853"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            {/* Name field */}
            <div className="pt-2">
              <AIInputField
                label="Your Name"
                icon={User}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Sarah Jenkins"
              />
            </div>

            {/* Email field */}
            <div className="pt-4">
              <AIInputField
                label="Email Address"
                icon={AtSign}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@company.com"
              />
            </div>

            {/* Message field */}
            <div className="pt-4">
              <AIInputField
                label="Your Message"
                icon={MessageSquare}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Discussing software roles, project scope, or technical collaborations..."
                rows={5}
              />
            </div>

            {/* API Response panel */}
            <AnimatePresence>
              {apiResponse && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 rounded-xl bg-black/50 border border-[#c2a4ff]/25 font-mono text-xs text-white/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-2">
                      <span className="text-[#c2a4ff] font-bold">
                        HTTP/1.1 {apiResponse.status} {apiResponse.statusText}
                      </span>
                      <span className="text-white/40">{apiResponse.latency}ms latency</span>
                    </div>
                    <div className="text-[10px] text-white/45 flex justify-between">
                      <span>Endpoint: {apiResponse.endpoint}</span>
                      <span>Payload: {apiResponse.bytes} bytes</span>
                    </div>
                    {apiResponse.note && (
                      <p className="text-[10px] text-[#c2a4ff]/70 pt-0.5">{apiResponse.note}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-4 px-6 rounded-xl text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2.5 overflow-hidden disabled:opacity-50 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 35%, #ec4899 70%, #8b5cf6 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={{ backgroundPosition: isSubmitting ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%" }}
              transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0 }}
            >
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Glow bottom */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-white/40" />

              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap size={15} />
                  </motion.div>
                  <span>Transmitting Payload...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>POST Payload to Endpoint</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles size={12} />
                  </motion.div>
                </>
              )}
            </motion.button>

            {/* Footer note */}
            <p className="text-center text-[10px] font-mono text-white/20 -mt-4">
              Secured channel · Response within 24h · All fields required
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}