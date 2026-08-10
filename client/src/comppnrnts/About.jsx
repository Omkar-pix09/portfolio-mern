import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { GraduationCap, Award, Code2, Sparkles } from "lucide-react";

function TypewriterText({ text, className }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [inView, text]);

  return (
    <p ref={ref} className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-purple-300 ml-0.5 animate-pulse align-middle" />
    </p>
  );
}

export default function About() {
  const stats = [
    { label: "Projects Shipped", value: 3, suffix: "+" },
    { label: "Certifications", value: 5, suffix: "" },
    { label: "Hackathons", value: 1, suffix: "" },
    { label: "CGPA", value: 8.5, suffix: "", decimals: 1 },
  ];

  const focusAreas = [
    { icon: <Code2 size={18} />, label: "Full-Stack Dev", pct: 90 },
    { icon: <Sparkles size={18} />, label: "Machine Learning", pct: 75 },
    { icon: <GraduationCap size={18} />, label: "System Design", pct: 65 },
    { icon: <Award size={18} />, label: "DSA", pct: 80 },
  ];

  const tags = ["React", "Node.js", "MongoDB", "Python", "XGBoost", "AWS", "Docker", "Java", "Kotlin"];

  return (
    <section id="about" className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-indigo-600 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-pink-600 pointer-events-none" />

      {/* scanning grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#c2a4ff 1px, transparent 1px), linear-gradient(90deg, #c2a4ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-wider mb-3">// IDENTITY.exe</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display gradient-text">Who I Am</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Terminal-style bio panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 px-5 py-3 bg-white/5 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-white/40 font-mono">about_me.log</span>
            </div>
            <div className="p-6 md:p-8 font-mono">
              <TypewriterText
                text="> Final-year CSE student, based in Kolhapur, Maharashtra."
                className="text-purple-300 text-sm md:text-base mb-3"
              />
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                Passionate about building practical software and exploring machine learning. I've worked on projects ranging from AI-powered coding assistants to placement-readiness platforms. Currently preparing for campus placements while continuing to ship and learn.
              </p>
              <p className="text-white/40 leading-relaxed text-sm md:text-base mt-4 italic">
                "Code is craft, and every project is a chance to build something that actually matters."
              </p>

              <div className="flex flex-wrap gap-2 mt-8">
                {tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-400/20 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: stats + focus meters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors" />
                  <p className="text-2xl md:text-3xl font-bold gradient-text font-display">
                    <CountUp end={s.value} duration={2} decimals={s.decimals || 0} enableScrollSpy scrollSpyOnce />
                    {s.suffix}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Focus meters */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-4 font-mono">Focus Areas</p>
              <div className="space-y-4">
                {focusAreas.map((f, i) => (
                  <div key={f.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-2 text-sm text-white/70">
                        <span className="text-indigo-400">{f.icon}</span>
                        {f.label}
                      </span>
                      <span className="text-xs text-white/40 font-mono">{f.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}