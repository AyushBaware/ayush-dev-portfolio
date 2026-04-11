import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // <section className="mx-auto flex min-h-[70vh] items-start justify-center px-6 py-10 lg:items-center">
    <section className="mx-auto flex min-h-[80vh] w-full flex-col justify-start px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-12">
      {/* Left Content - Glass Box */}
      <div className="pointer-events-auto relative z-10 max-w-2xl rounded-2xl border border-black/5 dark:border-white/5 bg-white/10 dark:bg-white/5 p-8 backdrop-blur-md shadow-xl dark:shadow-2xl transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium tracking-wider text-cyan-500 dark:text-cyan-400 uppercase">
            MERN Stack Specialist
          </span>
          
          <h1 className="text-6xl font-black tracking-tight sm:text-8xl text-slate-900 dark:text-white">
            Hi, I’m <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ayush
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            I craft immersive, high-performance web applications where 
            <span className="text-slate-900 dark:text-white font-semibold"> code meets 3D artistry.</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link to="/projects">
              <button className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 font-bold text-white dark:text-slate-950 transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">EXPLORE WORK</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </Link>

            <Link to="/contact">
              <button className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 px-8 py-4 font-bold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-800">
                CONTACT ME
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right side placeholder */}
      <div className="hidden h-[500px] w-1/3 lg:block" />
    </section>
  );
}