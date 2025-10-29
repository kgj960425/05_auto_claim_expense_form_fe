import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
console.log('VITE_EXPENSE_CLAIM_FORM_URL:', process.env.VITE_EXPENSE_CLAIM_FORM_URL);
const apiTarget = process.env.VITE_EXPENSE_CLAIM_FORM_URL

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      views: path.resolve(__dirname, './src/views'),
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    proxy: {
      '/ocr': {
        target: apiTarget,
        changeOrigin: true,
      },
      '/serverCheck': {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
})
