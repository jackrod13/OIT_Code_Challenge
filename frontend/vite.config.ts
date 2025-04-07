import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the Vite configuration
export default defineConfig({
  // Use the official React plugin for Vite
  plugins: [react()],

  // Configure dev server settings
  server: {
    // Proxy API requests from frontend to backend during development
    proxy: {
      '/api': {
        // Target backend server where ASP.NET Core is running
        target: 'http://localhost:5000',

        // Allows proxying requests from a different origin
        changeOrigin: true,
      },
    },
  },
});
