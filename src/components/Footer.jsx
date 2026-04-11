import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="pointer-events-auto w-full border-t border-white/5 py-8 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 md:flex-row">
        <p className="text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} <span className="text-slate-300">Ayush Baware</span>
        </p>
        
        <div className="mt-4 flex gap-6 text-xs font-bold tracking-widest text-slate-500 uppercase md:mt-0">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Built with React & 3D</span>
          <span className="hidden md:inline text-slate-800">|</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Available for Hire</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;