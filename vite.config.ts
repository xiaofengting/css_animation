import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 增加路径解析
  resolve: {
    alias: {
      "@style": "/src/styles",
      "@assets": "/src/assets",
    }
  },
})
