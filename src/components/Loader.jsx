import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const CUBE_FACES = [
  { name: "front", transform: "translateZ(36px)" },
  { name: "back", transform: "rotateY(180deg) translateZ(36px)" },
  { name: "right", transform: "rotateY(90deg) translateZ(36px)" },
  { name: "left", transform: "rotateY(-90deg) translateZ(36px)" },
  { name: "top", transform: "rotateX(90deg) translateZ(36px)" },
  { name: "bottom", transform: "rotateX(-90deg) translateZ(36px)" },
];

const ORBIT_DOTS = [0, 60, 120, 180, 240, 300];

// Same cinematic ease used across the site (About.jsx, MainLayout page transitions)
const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  exit: {
    opacity: 0,
    scale: 1.15,
    filter: "blur(16px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// Roughly how long a good-network load should take to visually feel "done"
// before real progress catches it. Tune alongside MIN_LOADER_TIME in MainLayout.
const CURVE_DURATION_MS = 2000;
// The time-based curve alone never claims full completion — only real
// progress hitting 100 is allowed to finish the bar.
const CURVE_CEILING = 96;

export default function Loader({ progress = 0 }) {
  const smoothProgress = useMotionValue(0);
  const width = useTransform(smoothProgress, (v) => `${v}%`);
  const label = useTransform(smoothProgress, (v) => `${Math.round(v)}`);
  const status = useTransform(smoothProgress, (v) => {
    if (v < 25) return "Initializing Environment";
    if (v < 60) return "Loading 3D Assets";
    if (v < 90) return "Calibrating Scene";
    if (v < 100) return "Finalizing";
    return "Ready";
  });

  // Real progress is read from a ref inside the loop so the loop itself
  // never restarts when `progress` jumps — that restart-per-jump was what
  // caused the "rapid then frozen then rapid" feel. One continuous RAF
  // loop runs for the loader's entire lifetime and just reads the latest
  // real value each frame, blending it with a steady time-based curve so
  // motion never stalls even between sparse real progress events.
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const start = performance.now();
    let frameId;

    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / CURVE_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out — quick start, gentle crawl near ceiling
      const timeTarget = eased * CURVE_CEILING;

      const real = progressRef.current;
      const target = real >= 100 ? 100 : Math.max(timeTarget, real);

      const current = smoothProgress.get();
      const next = current + (target - current) * 0.12;
      smoothProgress.set(next);

      if (real >= 100 && target - next < 0.15) {
        smoothProgress.set(100);
        return;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [smoothProgress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Faint sci-fi grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow — mirrors the site's accent palette */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Orbit + cube stage */}
      <div style={{ perspective: "900px" }} className="relative flex h-64 w-64 items-center justify-center">
        {/* Radar sweep */}
        <motion.div
          className="absolute h-60 w-60 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.25) 25deg, transparent 60deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute h-60 w-60 rounded-full border border-cyan-400/20"
          animate={{ rotateX: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-48 w-48 rounded-full border border-purple-400/25"
          animate={{ rotateY: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-36 w-36 rounded-full border border-dashed border-cyan-400/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting particles */}
        <motion.div
          className="absolute h-60 w-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT_DOTS.map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]"
              style={{ transform: `rotate(${deg}deg) translateX(120px)` }}
            />
          ))}
        </motion.div>

        {/* Pulsing glow behind cube */}
        <motion.div
          className="absolute h-20 w-20 rounded-lg bg-cyan-400/40 blur-2xl"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.3, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating 3D cube */}
        <motion.div
          className="relative h-[72px] w-[72px] drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          {CUBE_FACES.map((face) => (
            <div
              key={face.name}
              className="absolute inset-0 flex items-center justify-center border border-cyan-400/50 bg-gradient-to-br from-cyan-500/25 via-blue-500/15 to-purple-600/25 backdrop-blur-sm"
              style={{ transform: face.transform }}
            />
          ))}
        </motion.div>
      </div>

      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-3xl font-black tracking-tighter text-white"
      >
        AYUSH<span className="text-cyan-400">.DEV</span>
      </motion.h1>

      {/* Glass status panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-8 flex w-72 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl"
      >
        <div className="flex w-full items-baseline justify-between">
          <motion.span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            {status}
          </motion.span>
          <span className="flex items-baseline font-mono text-cyan-400">
            <motion.span className="text-xl font-bold">{label}</motion.span>
            <span className="text-xs font-bold">%</span>
          </span>
        </div>

        {/* Progress bar with shimmer */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            style={{ width }}
          >
            <motion.div
              className="absolute inset-y-0 right-0 w-6 bg-white/40 blur-sm"
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}