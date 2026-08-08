import { motion } from "framer-motion";
import { GraduationCap, Award, Code2 } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <GraduationCap size={22} />,
      title: "Education",
      desc: "Final-year B.Tech in Computer Science Engineering",
    },
    {
      icon: <Award size={22} />,
      title: "Certifications",
      desc: "AWS, Google, and Coursera certified",
    },
    {
      icon: <Code2 size={22} />,
      title: "Focus",
      desc: "Full-stack development, ML pipelines, and system design",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            A bit about my journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-2xl">
            I'm a final-year Computer Science student based in Kolhapur,
            Maharashtra, passionate about building practical software and
            exploring machine learning. I've worked on projects ranging from
            AI-powered coding assistants to placement-readiness platforms,
            and I'm currently preparing for campus placements while
            continuing to ship and learn.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}