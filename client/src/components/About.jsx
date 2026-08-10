import { motion } from "framer-motion";
import { GraduationCap, Award, Code2 } from "lucide-react";

export default function About() {
  const highlights = [
    { icon: <GraduationCap size={20} />, title: "Education", desc: "Final-year B.Tech in Computer Science Engineering" },
    { icon: <Award size={20} />, title: "Certifications", desc: "AWS, Google, and Coursera certified" },
    { icon: <Code2 size={20} />, title: "Focus", desc: "Full-stack development, ML pipelines, and system design" },
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-16 bg-[#0a0a12] overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full blur-[130px] opacity-25 bg-indigo-600 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="md:sticky md:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-30" />
            <div className="relative w-full h-full rounded-3xl p-[3px] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-[#0a0a12]">
                <img src="/profile.jpg" alt="Omkar Patil" className="w-full h-full object-cover" style={{ filter: "grayscale(15%) contrast(1.05)" }} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 font-mono text-sm tracking-wider mb-2">A B O U T &nbsp; M E</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">Who I am</h2>
          <p className="text-white/60 leading-relaxed mb-10 text-lg">
            I'm a final-year Computer Science student based in Kolhapur, Maharashtra, passionate about building practical software and exploring machine learning. I've worked on projects ranging from AI-powered coding assistants to placement-readiness platforms, and I'm currently preparing for campus placements while continuing to ship and learn. Code is craft, and every project is a chance to build something that actually matters.
          </p>

          <div className="space-y-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="text-indigo-400 mt-0.5">{h.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{h.title}</h3>
                  <p className="text-sm text-white/50">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}