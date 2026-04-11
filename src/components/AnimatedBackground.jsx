// import { motion } from "framer-motion";

// export default function AnimatedBackground() {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

//       {/* ================= Gradient Orbs ================= */}

//       <motion.div
//         animate={{
//           x: [0, 60, -40, 0],
//           y: [0, -40, 60, 0],
//           scale: [1, 1.1, 1],
//           opacity: [0.25, 0.35, 0.25],
//         }}
//         transition={{
//           duration: 22,
//           ease: "easeInOut",
//           repeat: Infinity,
//         }}
//         className="absolute top-1/4 left-1/4 w-[420px] h-[420px]
//                    rounded-full bg-gradient-to-tr
//                    from-cyan-400/30 to-blue-500/30 blur-3xl"
//       />

//       <motion.div
//         animate={{
//           x: [0, -80, 40, 0],
//           y: [0, 60, -40, 0],
//           scale: [1, 1.15, 1],
//           opacity: [0.2, 0.3, 0.2],
//         }}
//         transition={{
//           duration: 26,
//           ease: "easeInOut",
//           repeat: Infinity,
//         }}
//         className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px]
//                    rounded-full bg-gradient-to-tr
//                    from-purple-500/30 to-pink-500/30 blur-3xl"
//       />

//       {/* ================= Falling Glass Boxes ================= */}

//       {/* Box 1 */}
//       <motion.div
//         initial={{ y: "-30vh", rotate: 0 }}
//         animate={{ y: "130vh", rotate: 14 }}
//         transition={{
//           duration: 22,   // ⬅ faster
//           ease: "linear",
//           repeat: Infinity,
//         }}
//         className="absolute left-[15%] top-0
//                    w-40 h-40 rounded-2xl
//                    bg-white/6 backdrop-blur-xl
//                    border border-white/15
//                    shadow-[0_0_40px_rgba(56,189,248,0.10)]"
//       />

//       {/* Box 2 */}
//       <motion.div
//         initial={{ y: "-40vh", rotate: 0 }}
//         animate={{ y: "140vh", rotate: -12 }}
//         transition={{
//           duration: 26,
//           ease: "linear",
//           repeat: Infinity,
//         }}
//         className="absolute right-[18%] top-0
//                    w-48 h-48 rounded-2xl
//                    bg-white/6 backdrop-blur-xl
//                    border border-white/15
//                    shadow-[0_0_40px_rgba(59,130,246,0.10)]"
//       />

//       {/* Box 3 */}
//       <motion.div
//         initial={{ y: "-50vh", rotate: 0 }}
//         animate={{ y: "150vh", rotate: 10 }}
//         transition={{
//           duration: 30,
//           ease: "linear",
//           repeat: Infinity,
//         }}
//         className="absolute left-[45%] top-0
//                    w-32 h-32 rounded-xl
//                    bg-white/6 backdrop-blur-xl
//                    border border-white/15
//                    shadow-[0_0_30px_rgba(14,165,233,0.10)]"
//       />

//       {/* ================= Ambient Depth ================= */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,
//         rgba(255,255,255,0.035),transparent_70%)]" />
//     </div>
//   );
// }
