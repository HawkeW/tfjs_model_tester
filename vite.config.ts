import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  base: '/tfjs_model_tester',
  plugins: [wasm(), vue(), topLevelAwait()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.includes('tfjs-backend-wasm')) {
            return '[name][extname]';
          }
          if (assetInfo.name.endsWith('.wasm')) {
            return 'assets/wasm/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  worker: {
    plugins: [
      wasm(),
      topLevelAwait(),
    ],
    rollupOptions: {
      output: {
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name && chunkInfo.name.includes('tfjs-backend-wasm')) {
            return '[name].js';
          }
          return 'assets/[name]-[hash].js';
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name && chunkInfo.name.includes('tfjs-backend-wasm')) {
            return '[name].js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('tfjs-backend-wasm')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src',
    },
  }
})
