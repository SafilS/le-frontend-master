import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimize build configuration
  build: {
    // Enable minification for better performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true  // Remove debugger statements in production
      }
    },
    
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'react-icons'],
          'vendor-utils': ['axios', 'classnames', 'styled-components']
        }
      }
    },
    
    // Generate source maps for production debugging
    sourcemap: false,
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  
  // Optimize server during development
  server: {
    hmr: {
      overlay: true
    }
  },
  
  // Optimize asset handling
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  
  // Optimize CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Add any CSS preprocessor options here
    }
  }
})
