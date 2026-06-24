/**
 * Projects data
 *
 * To add a real screenshot/preview image:
 * 1. Drop the image in /public/projects/ (e.g. finsight-preview.png)
 * 2. Set `image: "/projects/finsight-preview.png"` on the relevant entry.
 * The Projects page will render it if provided; otherwise it falls back
 * to the animated gradient placeholder.
 *
 * Fields:
 * title       — Short display name
 * description — 1-2 sentence summary; focus on the problem solved
 * tags        — Tech stack used (kept concise, ≤ 6 tags)
 * github      — Full GitHub URL
 * live        — Deployed URL (set null if not yet deployed)
 * category    — Badge shown on the card (e.g. "AI & Full Stack")
 * image       — (optional) Path to a preview screenshot in /public
 * featured    — (optional) true → renders first / larger treatment
 */
export const projects = [
  {
    title: "FinSight — AI Finance Manager",
    description:
      "AI-powered PWA for personal finance: voice-based expense logging, automatic ML categorisation, and real-time analytics dashboards. Handles offline-first sync via Firebase, so your budget data is always available.",
    tags: ["React", "Firebase", "Tailwind CSS", "PWA", "AI"],
    github: "https://github.com/AyushBaware/finsight-ai-finance-manager",
    live: "https://finsight-ai-finance-manager.vercel.app/",
    category: "AI & Full Stack",
    featured: true,
    image: null, // replace with "/projects/finsight-preview.png" once available
  },
  {
    title: "AI Document Assistant",
    description:
      "An intelligent chat interface built on a RAG (Retrieval-Augmented Generation) architecture. Upload documents and interact with them in natural language; it uses vector search for precise, context-aware answers.",
    tags: ["React", "RAG", "Vector Search", "LLM", "Document Proc."],
    github: "https://github.com/AyushBaware/ai-document-assistant.git",
    live: null,
    category: "AI & Full Stack",
    featured: false,
    image: null, // replace with "/projects/docassistant-preview.png" once available
  },
  {
    title: "Immersive Task Interface",
    description:
      "A 3D dashboard that turns a to-do list into an orbital experience. Built with React Three Fiber and glassmorphism UI; lazy-loads 3D assets to stay at a solid 60 FPS even on mid-range devices.",
    tags: ["React", "Three.js", "Tailwind CSS", "R3F"],
    github: "https://github.com/AyushBaware/Immersive-Task-Interface",
    live: "https://task-orbiter-3d.vercel.app",
    category: "3D Interaction",
    featured: false,
    image: null, // replace with "/projects/taskorbiter-preview.png" once available
  },
];
