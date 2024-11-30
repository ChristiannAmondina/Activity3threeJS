import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['three', 'cannon-es'] // Add dependencies to optimize resolution
  }
});
