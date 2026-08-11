import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiKotlin, SiHtml5, SiCss, SiGnubash,
  SiReact, SiNextdotjs, SiBootstrap, SiNodedotjs, SiFlask, SiFastapi, SiTensorflow,
  SiPytorch, SiScikitlearn, SiOpencv, SiNumpy, SiPandas, SiMysql, SiPostgresql,
  SiMongodb, SiRedis, SiDocker, SiGit, SiGithub, SiFigma,
} from "react-icons/si";

const techs = [
  { name: "Python", icon: SiPython, color: "#3776AB", level: 92 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 78 },
  { name: "C", icon: SiC, color: "#A8B9CC", level: 75 },
  { name: "C++", icon: SiCplusplus, color: "#00599C", level: 70 },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", level: 65 },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 95 },
  { name: "CSS3", icon: SiCss, color: "#1572B6", level: 88 },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25", level: 60 },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 93 },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 70 },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", level: 85 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 88 },
  { name: "Flask", icon: SiFlask, color: "#ffffff", level: 68 },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", level: 62 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", level: 72 },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", level: 65 },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E", level: 80 },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8", level: 60 },
  { name: "NumPy", icon: SiNumpy, color: "#013243", level: 85 },
  { name: "Pandas", icon: SiPandas, color: "#150458", level: 88 },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 82 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 65 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 87 },
  { name: "Redis", icon: SiRedis, color: "#DC382D", level: 55 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
  { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
  { name: "GitHub", icon: SiGithub, color: "#ffffff", level: 92 },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 60 },
];

function ScanCaption() {
  const messages = ["ANALYZING STACK...", "29 TECHNOLOGIES DETECTED", "PROFICIENCY: OPTIMAL", "READY FOR DEPLOYMENT"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 mb-4 font-mono text-xs text-purple-300/70">
      <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
      <motion.span key={index} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {messages[index]}
      </motion.span>
    </div>
  );
}

function TechTile({ tech, index }) {
  const [hover, setHover] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 14) * 0.03 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.08, y: -8 }}
      className="group relative flex flex-col items-center justify-center gap-2 aspect-square p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-colors duration-300 cursor-pointer overflow-hidden"
      style={{
        borderColor: hover ? `${tech.color}80` : undefined,
        boxShadow: hover ? `0 0 30px -5px ${tech.color}60, inset 0 0 20px -8px ${tech.color}40` : undefined,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 40%, ${tech.color}30, transparent 70%)` }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
        animate={hover ? { top: ["0%", "100%"] } : {}}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 100 100">
        <path d="M8 20 V8 H20" stroke={tech.color} strokeWidth="2" fill="none" />
        <path d="M80 8 H92 V20" stroke={tech.color} strokeWidth="2" fill="none" />
        <path d="M92 80 V92 H80" stroke={tech.color} strokeWidth="2" fill="none" />
        <path d="M20 92 H8 V80" stroke={tech.color} strokeWidth="2" fill="none" />
      </svg>

      <motion.div
        className="relative z-10 w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: tech.color === "#ffffff" ? "rgba(255,255,255,0.12)" : `${tech.color}22`,
          boxShadow: hover ? `0 0 20px -2px ${tech.color}90` : "none",
        }}
        animate={hover ? { scale: 1.1 } : { scale: 1 }}
      >
        <Icon
          className="w-6 h-6 md:w-7 md:h-7"
          style={{ color: tech.color, filter: hover ? `drop-shadow(0 0 6px ${tech.color}aa)` : "none" }}
        />
      </motion.div>
      <span className="relative z-10 text-[10px] md:text-xs text-white/60 group-hover:text-white font-medium transition-colors duration-300 text-center leading-tight">
        {tech.name}
      </span>

      <motion.div className="absolute bottom-1 left-2 right-2 h-1 rounded-full bg-white/10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.div
          className="h-full rounded-full"
          style={{ background: tech.color }}
          initial={{ width: "0%" }}
          animate={hover ? { width: `${tech.level}%` } : { width: "0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25 bg-purple-600 pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" preserveAspectRatio="none">
        {Array.from({ length: 18 }).map((_, i) => {
          const x1 = Math.random() * 100, y1 = Math.random() * 100, x2 = Math.random() * 100, y2 = Math.random() * 100;
          return (
            <motion.line
              key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#c2a4ff" strokeWidth="1"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          );
        })}
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-indigo-400 font-mono text-sm tracking-wider mb-3">// TOOLBOX.scan()</p>
          <h2 className="text-5xl md:text-6xl font-bold font-display gradient-text mb-3 tracking-wide">Tech Stack</h2>
          <ScanCaption />
          <p className="text-white/30 text-xs font-mono mt-2">Hover any node to view proficiency readout</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-10 gap-3 mt-12">
          {techs.map((tech, i) => (
            <TechTile key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}