import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Scene from "../components/3d/Scene";
import Loader from "../components/Loader";

// Loader stays up at least this long so it never flashes on fast/cached loads
const MIN_LOADER_TIME = 2200;
// Hard ceiling — if loading isn't done by now, stop blocking the user
const MAX_LOADER_TIME = 6000;
// If progress hasn't moved at all for this long, treat it as stalled
const STALL_TIMEOUT = 3000;

export default function MainLayout() {
  const location = useLocation();
  const { progress } = useProgress();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [forceHide, setForceHide] = useState(false);

  // Minimum display time so it never flashes on fast/cached loads
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADER_TIME);
    return () => clearTimeout(timer);
  }, []);

  // Normal path: hide once loading is actually done
  useEffect(() => {
    if (progress === 100 && minTimeElapsed) {
      setShowLoader(false);
    }
  }, [progress, minTimeElapsed]);

  // Safety path 1: stall detection — progress hasn't moved in STALL_TIMEOUT ms
  useEffect(() => {
    if (progress === 100) return; // already done, nothing to detect
    const stallTimer = setTimeout(() => setForceHide(true), STALL_TIMEOUT);
    return () => clearTimeout(stallTimer);
    // resets every time progress changes — so a moving download keeps extending it
  }, [progress]);

  // Safety path 2: absolute hard ceiling regardless of stall detection
  useEffect(() => {
    const hardTimer = setTimeout(() => setForceHide(true), MAX_LOADER_TIME);
    return () => clearTimeout(hardTimer);
  }, []);

  useEffect(() => {
    if (forceHide) setShowLoader(false);
  }, [forceHide]);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#030712] transition-colors duration-500 overflow-x-hidden">

      <AnimatePresence>
        {showLoader && <Loader progress={progress} />}
      </AnimatePresence>

      {/* 1. THE 3D CANVAS */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Canvas shadows="soft" camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. THE UI LAYER */}
      <div className="relative z-20 flex min-h-screen flex-col pointer-events-none">
        <Navbar />
        
          {/* AnimatePresence handles the smooth entrance/exit of pages */}
          <main className="flex-1 pt-16 md:pt-20">
          <AnimatePresence mode="popLayout"> {/* Use popLayout for smoother overlaps */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut" 
              }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {/* 3. Cinematic Vignette */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}