// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  server: {
    port: 8000, // You can specify the port here
    proxy: {
      '/api': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Separate chunk for lodash (_) and three.js
        manualChunks: {
          vendor: ['underscore', 'three'],
        }
      },
      input: {
        voiceReactiveParticles: 'views/cgi-tools/voice_reactive_particles.html',
      },
    },
    target: 'esnext', // Add this line to target the latest ECMAScript version
  },
  resolve: {
    alias: {
      views: '/views',
    }
  }
})
