import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Scene from "../components/3d/Scene";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#030712] transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. THE 3D CANVAS */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
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