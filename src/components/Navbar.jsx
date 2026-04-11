import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext"; 

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[100] w-full pointer-events-none px-2 py-4 sm:px-6 sm:py-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/5 dark:border-white/10 bg-white/20 dark:bg-slate-950/20 px-3 py-2 sm:px-8 sm:py-3 backdrop-blur-md shadow-xl dark:shadow-2xl pointer-events-auto transition-colors duration-500">
        
        {/* Logo - Fixed Laptop visibility + Auto-hide .DEV on mobile */}
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-sm sm:text-xl font-black tracking-tighter text-slate-900 dark:text-white shrink-0 mr-2"
        >
          AYUSH<span className="hidden sm:inline text-cyan-500">.DEV</span>
          <span className="inline sm:hidden text-cyan-500">.</span>
        </motion.h1>

        {/* Navigation Links - Centered and Spaced */}
        <div className="flex flex-1 justify-center items-center gap-1.5 min-w-0 sm:gap-6 md:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-[9px] sm:text-xs md:text-sm font-bold tracking-widest uppercase transition-colors hover:text-cyan-500 whitespace-nowrap ${
                  isActive 
                    ? "text-cyan-500" 
                    : "text-slate-600 dark:text-slate-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Theme Toggle Button - Fixed spacing */}
        <div className="flex items-center ml-2 shrink-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="rounded-full bg-black/5 dark:bg-white/5 p-1.5 sm:p-2 text-slate-900 dark:text-white border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
          >
            {theme === "dark" ? <FiSun size={14} className="sm:w-[18px]" /> : <FiMoon size={14} className="sm:w-[18px]" />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}