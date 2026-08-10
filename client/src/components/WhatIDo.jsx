import { motion } from "framer-motion";

export default function WhatIDo() {
  const cards = [
    {
      title: "FULL-STACK DEV",
      subtitle: "Modern web development & scalable applications",
      desc: "Building responsive and performant web applications using React, Node.js, and MongoDB. Creating seamless user experiences with modern UI/UX principles.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "ML ENTHUSIAST",
      subtitle: "Exploring intelligent systems & data-driven solutions",
      desc: "Working with machine learning pipelines, model training, and data analysis using Python. Building predictive systems like EduVerse's placement readiness engine.",
      skills: ["Python", "XGBoost", "Pandas", "Scikit-learn"],
    },
  ];

  return (
    <section className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 bg-purple-600 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative mb-16">
          <h2 className="text-6xl md:text-8xl font-bold font-display text-white/5 select-none leading-none">
            WHAT I DO
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 -mt-16 md:-mt-24">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
            >
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1.5" strokeDasharray="6,6" opacity="0.3" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" strokeDasharray="6,6" opacity="0.3" />
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1.5" strokeDasharray="6,6" opacity="0.3" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" strokeDasharray="6,6" opacity="0.3" />
              </svg>

              <h3 className="text-2xl font-bold font-display text-white mb-2">{card.title}</h3>
              <p className="text-white/40 text-sm mb-4">{card.subtitle}</p>
              <p className="text-white/60 leading-relaxed mb-6">{card.desc}</p>

              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Skillset & tools</p>
              <div className="flex flex-wrap gap-2">
                {card.skills.map((s) => (
                  <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10">
                    {s}
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