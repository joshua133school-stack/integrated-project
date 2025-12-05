import { defineConfig } from 'vite';

export default defineConfig({
  // Use current directory as root
  root: '.',

  // Public assets directory
  publicDir: 'public',

  // Build output
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging
    sourcemap: true,
  },

  // Dev server options
  server: {
    port: 3000,
    open: true,
  },

  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@experiences': '/src/experiences',
      '@core': '/src/core',
    },
  },
});
