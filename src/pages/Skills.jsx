import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si'; 

// Container variants for the staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each card follows the other by 0.1s
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SkillCard = ({ icon: Icon, name, color }) => {
  if (!Icon) return null;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        scale: 1.05, 
        rotateX: 10, 
        rotateY: 10 
      }}
      className="pointer-events-auto relative group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] z-10"
    >
      <motion.div
        className="text-6xl mb-4 transition-colors duration-300"
        style={{ color: 'rgba(255,255,255,0.5)' }}
        whileHover={{ scale: 1.2, rotateY: 360, color: color }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Icon />
      </motion.div>
      <span className="text-sm font-bold tracking-widest text-slate-400 group-hover:text-white uppercase">
        {name}
      </span>
      
      <div 
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-20" 
        style={{ backgroundColor: color }} 
      />
    </motion.div>
  );
};

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Express', icon: SiExpress, color: '#808080' },
    { name: 'Database', icon: FaDatabase, color: '#ffa500' },
  ];

  return (
    <section className="pointer-events-auto mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-start px-6 pt-12 pb-20 md:pt-20 lg:justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center lg:text-left"
      >
        <h2 className="text-sm font-bold tracking-[0.5em] text-cyan-500 dark:text-cyan-400 uppercase">Technical Stack</h2>
        <h3 className="mt-2 text-5xl font-black text-slate-900 dark:text-white md:text-7xl">
          My <span className="text-slate-500">Skills.</span>
        </h3>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }} // Starts when 20% of grid is visible
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;