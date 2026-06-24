import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/** Cycles through an array of strings with a typewriter effect */
function useTypewriter(words, speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setCharIdx(0);
            setWordIdx((i) => (i + 1) % words.length);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const ROLES = [
  "MERN Stack Developer",
  "3D Web Engineer",
  "React & Three.js Enthusiast",
  "Full Stack Builder",
];

export default function Home() {
  const role = useTypewriter(ROLES);

  return (
    <section className="mx-auto flex min-h-[80vh] w-full flex-col justify-start px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-12">
      {/* ── Left content ── */}
      <div className="pointer-events-auto relative z-10 max-w-2xl rounded-2xl border border-black/5 dark:border-white/5 bg-white/10 dark:bg-white/5 p-8 backdrop-blur-md shadow-xl dark:shadow-2xl transition-colors duration-500">
        {/* Decorative glow that pulses slowly */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-px rounded-2xl bg-cyan-500/10 blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Typewriter role badge */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium tracking-wider text-cyan-500 dark:text-cyan-400 uppercase">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            {role || "\u00A0"}
            <span className="animate-blink">|</span>
          </span>

          <h1 className="text-6xl font-black tracking-tight sm:text-8xl text-slate-900 dark:text-white">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ayush
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            I craft immersive, high-performance web applications where{" "}
            <span className="text-slate-900 dark:text-white font-semibold">
              code meets 3D artistry.
            </span>
          </p>

          {/* CTA buttons */}
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

      {/* Right side — space for the 3D robot */}
      <div className="hidden h-[500px] w-1/3 lg:block" />
    </section>
  );
}