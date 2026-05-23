import { projects } from "../data/Projects";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <section className="pointer-events-auto mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-start px-6 pt-12 pb-20 md:pt-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="mb-16 text-center lg:text-left"
      >
        <h2 className="text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase">
          Portfolio
        </h2>
        <h3 className="mt-2 text-5xl font-black text-white md:text-7xl">
          Featured <span className="text-slate-500">Work.</span>
        </h3>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Image Placeholder / Project Preview */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute -inset-2 bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/40 transition-colors" />

              <div className="relative z-20 flex h-full items-end p-6">
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  {project.category || "Full Stack"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-tighter border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center gap-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  LIVE DEMO <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}