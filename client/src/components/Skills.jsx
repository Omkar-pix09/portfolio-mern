import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Layers, Database, Wrench } from "lucide-react";

const skillGroups = [
  {
    category: "Languages",
    icon: Code2,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    items: [
      { name: "Java", level: 80 },
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "C/C++", level: 72 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: Layers,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.35)",
    items: [
      { name: "React", level: 93 },
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "Django", level: 60 },
      { name: "Flask", level: 68 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    color: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
    items: [
      { name: "MongoDB", level: 87 },
      { name: "MySQL", level: 82 },
      { name: "SQLite", level: 70 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: Wrench,
    color: "#6366f1",
    glow: "rgba(99,102,241,0.35)",
    items: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 60 },
      { name: "Vercel", level: 78 },
      { name: "VS Code", level: 95 },
    ],
  },
];

function SkillPill({ skill, color }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.06, y: -3 }}
      className="relative px-4 py-2 rounded-full text-sm font-medium border overflow-hidden cursor-default"
      style={{
        borderColor: hover ? `${color}90` : "rgba(255,255,255,0.1)",
        backgroundColor: hover ? `${color}15` : "rgba(255,255,255,0.03)",
        color: hover ? color : "rgba(255,255,255,0.75)",
        transition: "border-color .25s, background-color .25s, color .25s",
      }}
    >
      <span className="relative z-10">{skill.name}</span>
      {hover && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skillGroups[active];

  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <motion.div
        key={active}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        animate={{ backgroundColor: current.glow }}
        transition={{ duration: 0.6 }}
        style={{ opacity: 0.5 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-wider mb-3">// SKILLS.render()</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display gradient-text">What I Work With</h2>
        </motion.div>

        {/* category selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillGroups.map((g, i) => {
            const Icon = g.icon;
            const isActive = i === active;
            return (
              <button
                key={g.category}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300"
                style={{
                  borderColor: isActive ? g.color : "rgba(255,255,255,0.1)",
                  backgroundColor: isActive ? `${g.color}18` : "transparent",
                  color: isActive ? g.color : "rgba(255,255,255,0.5)",
                  boxShadow: isActive ? `0 0 25px -6px ${g.color}` : "none",
                }}
              >
                <Icon size={16} />
                {g.category}
                {isActive && (
                  <motion.span
                    layoutId="skill-dot"
                    className="w-1.5 h-1.5 rounded-full ml-1"
                    style={{ background: g.color, boxShadow: `0 0 8px 2px ${g.color}` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* active category panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
              <line x1="0" y1="0" x2="100%" y2="0" stroke={current.color} strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke={current.color} strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
            </svg>

            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${current.color}20`, boxShadow: `0 0 20px -4px ${current.color}` }}
              >
                <current.icon size={20} style={{ color: current.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">{current.category}</h3>
                <p className="text-xs text-white/40 font-mono">{current.items.length} technologies · hover to see proficiency</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {current.items.map((skill) => (
                <SkillPill key={skill.name} skill={skill} color={current.color} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}