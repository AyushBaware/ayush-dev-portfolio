import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // Split large bundles for better caching & faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, long-lived cache
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Three.js ecosystem is large — isolate it so a UI-only change
          // doesn't bust the 3D bundle cache
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],

          // Animation & UI utilities
          'vendor-ui': ['framer-motion', 'react-icons', 'react-hot-toast'],

          // Email
          'vendor-email': ['@emailjs/browser'],
        },
      },
    },

    // Raise the inline-asset limit slightly (default 4 kB) to reduce
    // extra HTTP requests for small SVGs / fonts
    assetsInlineLimit: 8192,

    // Emit source maps only in CI / staging — comment out for prod if not needed
    // sourcemap: true,

    // Minify with esbuild (Vite default) — explicit for clarity
    minify: 'esbuild',

    // Target modern browsers; Three.js r128+ drops IE11 support anyway
    target: 'es2020',
  },

  // Improve HMR reliability in monorepos / symlinked projects
  server: {
    watch: {
      usePolling: false,
    },
  },
})