import { useState, useRef } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Languages",
    color: "#f59e0b",
    items: [
      { name: "Python", slug: "python", brand: "3776AB" },
      { name: "JavaScript", slug: "javascript", brand: "F7DF1E" },
      { name: "Java", slug: "openjdk", brand: "437291" },
      { name: "Kotlin", slug: "kotlin", brand: "7F52FF" },
      { name: "C++", slug: "cplusplus", brand: "00599C" },
      { name: "TypeScript", slug: "typescript", brand: "3178C6" },
    ],
  },
  {
    label: "Frontend",
    color: "#ec4899",
    items: [
      { name: "React", slug: "react", brand: "61DAFB" },
      { name: "HTML5", slug: "html5", brand: "E34F26" },
      { name: "CSS3", slug: "css3", brand: "1572B6" },
      { name: "Tailwind", slug: "tailwindcss", brand: "06B6D4" },
      { name: "Vite", slug: "vite", brand: "646CFF" },
      { name: "Framer", slug: "framer", brand: "0055FF" },
    ],
  },
  {
    label: "Backend",
    color: "#22c55e",
    items: [
      { name: "Node.js", slug: "nodedotjs", brand: "339933" },
      { name: "Express", slug: "express", brand: "ffffff" },
      { name: "Flask", slug: "flask", brand: "ffffff" },
      { name: "Django", slug: "django", brand: "092E20" },
    ],
  },
  {
    label: "AI / ML",
    color: "#a855f7",
    items: [
      { name: "TensorFlow", slug: "tensorflow", brand: "FF6F00" },
      { name: "Scikit-learn", slug: "scikitlearn", brand: "F7931E" },
      { name: "Pandas", slug: "pandas", brand: "150458" },
      { name: "NumPy", slug: "numpy", brand: "013243" },
    ],
  },
  {
    label: "Database & Cloud",
    color: "#06b6d4",
    items: [
      { name: "MongoDB", slug: "mongodb", brand: "47A248" },
      { name: "MySQL", slug: "mysql", brand: "4479A1" },
      { name: "Firebase", slug: "firebase", brand: "FFCA28" },
      { name: "Docker", slug: "docker", brand: "2496ED" },
      { name: "AWS", slug: "amazonaws", brand: "FF9900" },
      { name: "Vercel", slug: "vercel", brand: "ffffff" },
    ],
  },
  {
    label: "Tools",
    color: "#6366f1",
    items: [
      { name: "Git", slug: "git", brand: "F05032" },
      { name: "GitHub", slug: "github", brand: "ffffff" },
      { name: "Postman", slug: "postman", brand: "FF6C37" },
      { name: "VS Code", slug: "visualstudiocode", brand: "007ACC" },
    ],
  },
];

function TechCard({ tech, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -18, y: px * 18 });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      animate={{ y: [0, -6, 0] }}
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      className="relative group"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hover ? 1.12 : 1,
          y: hover ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{ background: `radial-gradient(circle at center, #${tech.brand}55, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ boxShadow: `0 0 30px 2px #${tech.brand}88, inset 0 0 20px #${tech.brand}22` }}
        />

        <img
          src={`https://cdn.simpleicons.org/${tech.slug}/${tech.brand}`}
          alt={tech.name}
          className="relative z-10 w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          style={{ filter: `drop-shadow(0 0 8px #${tech.brand}aa)` }}
        />
        <span className="relative z-10 text-xs text-white/70 font-medium group-hover:text-white transition-colors">
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-purple-600 pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-pink-600 pointer-events-none animate-aurora-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-wider mb-3">// TOOLBOX</p>
          <h2 className="text-5xl md:text-6xl font-bold font-display gradient-text">Tech Stack</h2>
        </motion.div>

        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <div key={cat.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}` }} />
                <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: cat.color }}>
                  {cat.label}
                </h3>
                <div className="flex-1 h-px bg-white/10" />
              </motion.div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {cat.items.map((tech, i) => (
                  <TechCard key={tech.slug} tech={tech} index={ci * 6 + i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}