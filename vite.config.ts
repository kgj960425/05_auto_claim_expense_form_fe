import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { env } from 'process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'views': path.resolve(__dirname, './src/views'),
      'components': path.resolve(__dirname, './src/components'),
      'assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_CLOUDTYPE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
