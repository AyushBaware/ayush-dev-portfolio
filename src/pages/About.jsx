import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0, 
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.15, 
        ease: [0.16, 1, 0.3, 1] // Custom smooth ease
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="pointer-events-auto mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-20">
    {/* <section className="mx-auto flex min-h-[80vh] w-full flex-col justify-start px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-12"> */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8 backdrop-blur-xl shadow-2xl md:p-16 transition-colors duration-500"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        
        <motion.div variants={itemVariants} className="relative z-10">
          <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-500 dark:text-cyan-400 uppercase">
            Discovery
          </h2>
          <h3 className="mt-2 text-5xl font-black text-slate-900 dark:text-white md:text-7xl">
            About <span className="text-slate-400 dark:text-slate-500">Me.</span>
          </h3>
        </motion.div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 relative z-10">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
              I am an <span className="font-bold text-slate-900 dark:text-white underline decoration-cyan-500/50">MCA student</span> driven by bridging the gap between backend logic and 3D visuals.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              My expertise lies in the <span className="text-slate-900 dark:text-white font-medium">MERN Stack</span>. I believe websites should be experiences. Currently exploring <span className="text-cyan-600 dark:text-cyan-400 font-medium">React Three Fiber</span>.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-8 border-l border-black/10 dark:border-white/10 pl-0 md:pl-12">
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">Core Philosophy</h4>
              <p className="text-slate-500 dark:text-slate-400 italic">"Write code that is as beautiful to read as it is to experience."</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "Three.js", "Tailwind"].map((tech) => (
                <span key={tech} className="rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#06b6d4", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="w-fit rounded-xl bg-slate-900 dark:bg-white px-8 py-3 font-bold text-white dark:text-black transition-all"
            >
              Download CV
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;