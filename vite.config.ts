/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// Custom plugin to inject CSP meta tag with stricter rules
const cspPlugin = (): Plugin => ({
  name: 'html-transform',
  transformIndexHtml(html) {
    return html.replace(
      /<head>/,
      `<head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'self' http://localhost:8080 https://artistlink-api-0a798e794bf4.herokuapp.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' https: data:;" />`
    )
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // Enable all possible optimizations for production
        plugins: process.env.NODE_ENV === 'production' ? [
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-react-inline-elements',
          'babel-plugin-transform-react-remove-prop-types'
        ] : []
      }
    }), 
    cspPlugin(),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  base: '/',
  server: {
    port: 5173,
    strictPort: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
    }
  },
  build: {
    target: 'esnext', // Modern browsers for better optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'query-vendor': ['@tanstack/react-query'],
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
      },
    },
    sourcemap: false, // Disable sourcemaps in production
    // Enable more aggressive optimizations
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets
    modulePreload: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
    exclude: ['@tanstack/react-query'], // Exclude packages that don't need optimization
  },
})
