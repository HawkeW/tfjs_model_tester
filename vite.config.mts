import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [wasm(), vue(), topLevelAwait()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'tfjs': [
            '@tensorflow/tfjs', 
            '@tensorflow/tfjs-backend-webgpu', 
            '@tensorflow/tfjs-backend-wasm',
            '@tensorflow/tfjs-backend-webgl',
          ],
        }
      }
    } 
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
})
