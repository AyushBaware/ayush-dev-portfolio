import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const TECH_STACK = [
  "React",
  "Node.js",
  "Three.js",
  "MongoDB",
  "Tailwind",
  "Express",
];

const About = () => {
  return (
    <section className="pointer-events-auto mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8 backdrop-blur-xl shadow-2xl md:p-16 transition-colors duration-500"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/10 blur-[60px]" />

        {/* Header */}
        <motion.div variants={itemVariants} className="relative z-10">
          <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-500 dark:text-cyan-400 uppercase">
            Discovery
          </h2>
          <h3 className="mt-2 text-5xl font-black text-slate-900 dark:text-white md:text-7xl">
            About{" "}
            <span className="text-slate-400 dark:text-slate-500">Me.</span>
          </h3>
        </motion.div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 relative z-10">
          {/* Left column — bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              I am an{" "}
              <span className="font-bold text-slate-900 dark:text-white underline decoration-cyan-500/50">
                MCA student
              </span>{" "}
              passionate about bridging backend logic with immersive 3D visuals.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              My expertise spans the full{" "}
              <span className="text-slate-900 dark:text-white font-medium">
                MERN Stack
              </span>
              . I believe great websites should be <em>experiences</em> — not
              just pages. Currently deepening my knowledge of{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                React Three Fiber
              </span>{" "}
              and real-time 3D on the web.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to internships & collaborations
            </div>
          </motion.div>

          {/* Right column — links, stack, resume */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-8 border-l border-black/10 dark:border-white/10 pl-0 md:pl-12"
          >
            {/* Core philosophy */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">
                Core Philosophy
              </h4>
              <p className="text-slate-500 dark:text-slate-400 italic">
                "Write code that is as beautiful to read as it is to
                experience."
              </p>
            </div>

            {/* Tech stack badges */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Primary Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1 text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* --- PROFESSIONAL PREVIEW LINK --- */}
            <motion.a
              href="/Ayush-Baware-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#06b6d4",
                color: "#fff",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-fit inline-flex justify-center items-center rounded-xl bg-slate-900 dark:bg-white px-8 py-3 font-bold text-white dark:text-black transition-all cursor-pointer"
            >
              View Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
