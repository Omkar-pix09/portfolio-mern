import { motion } from "framer-motion";

export default function Skills() {
  const skillGroups = [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "Kotlin", "C/C++"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Express", "Django", "Flask"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "SQLite", "Firebase"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git/GitHub", "Docker", "AWS", "Vercel", "VS Code"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-10">
            Technologies I work with
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}