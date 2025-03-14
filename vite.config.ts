import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from "vite-plugin-top-level-await"

// https://vite.dev/config/
export default defineConfig({
  base: '/tfjs_model_tester',
  plugins: [vue(), topLevelAwait()],
  resolve: {
    alias: {
      '@': '/src',
    },
  }
})
