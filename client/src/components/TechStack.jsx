import { motion } from "framer-motion";

const techs = [
  { name: "Python", slug: "python" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Java", slug: "openjdk" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "C++", slug: "cplusplus" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css3" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express", slug: "express" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Vite", slug: "vite" },
  { name: "Flask", slug: "flask" },
  { name: "Django", slug: "django" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Scikit-learn", slug: "scikitlearn" },
  { name: "Pandas", slug: "pandas" },
  { name: "NumPy", slug: "numpy" },
  { name: "MySQL", slug: "mysql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Firebase", slug: "firebase" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Vercel", slug: "vercel" },
  { name: "Postman", slug: "postman" },
  { name: "VS Code", slug: "visualstudiocode" },
];

export default function TechStack() {
  return (
    <section className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 bg-purple-600 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold font-display gradient-text mb-16"
        >
          TECH STACK
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 14) * 0.03 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-400/50 hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/white`}
                alt={tech.name}
                className="w-7 h-7 opacity-80"
                loading="lazy"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="text-xs text-white/60 font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}